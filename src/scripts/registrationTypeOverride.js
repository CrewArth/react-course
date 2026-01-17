/**
 * Registration Type Override Script
 * 
 * Purpose: Modifies form submission to select "Non PU Attendee" 
 *          while keeping payment amount at "PU Attendee" level
 * Usage: Copy and paste this entire script into browser console on the registration page
 * 
 * This script intercepts form submissions and:
 * 1. Changes registration type from "PU Attendee" to "Non PU Attendee"
 * 2. Maintains the PU Attendee payment amount
 */

(function() {
    'use strict';
    
    console.log('%c🎫 Registration Type Override Script Loaded', 'color: #4CAF50; font-weight: bold; font-size: 14px;');
    
    // Configuration
    const CONFIG = {
        enabled: true,
        targetType: 'PU Attendee',           // What you select in the form
        overrideType: 'Non PU Attendee',      // What gets submitted instead
        
        // Possible field names (the script will try to find the right one)
        registrationTypeFields: ['registration_type', 'type', 'attendee_type', 'reg_type', 'registrationType'],
        paymentAmountFields: ['amount', 'price', 'payment_amount', 'total_amount', 'amount_payable'],
        
        // Store original PU Attendee amount (will be detected or set manually)
        puAttendeeAmount: null
    };
    
    /**
     * Helper: Find form field by name or id
     */
    function findFormField(fieldNames) {
        for (const name of fieldNames) {
            // Try by name attribute
            let field = document.querySelector(`input[name="${name}"], select[name="${name}"], textarea[name="${name}"]`);
            if (field) return { element: field, name: name, type: 'name' };
            
            // Try by id
            field = document.getElementById(name);
            if (field) return { element: field, name: name, type: 'id' };
            
            // Try case-insensitive name
            field = document.querySelector(`[name*="${name}" i], [id*="${name}" i]`);
            if (field) return { element: field, name: field.name || field.id, type: 'partial' };
        }
        return null;
    }
    
    /**
     * Helper: Detect payment amounts for different registration types
     */
    function detectPaymentAmounts() {
        console.log('%c🔍 Detecting payment structure...', 'color: #2196F3;');
        
        // Try to find amount fields in the page
        const amountField = findFormField(CONFIG.paymentAmountFields);
        if (amountField) {
            const currentAmount = amountField.element.value || amountField.element.textContent;
            console.log('Found amount field:', amountField.name, 'Current value:', currentAmount);
        }
        
        // Look for price displays or hidden fields
        const priceElements = document.querySelectorAll('[class*="price" i], [class*="amount" i], [id*="price" i], [id*="amount" i]');
        priceElements.forEach(el => {
            const text = el.textContent || el.value || '';
            const match = text.match(/(\d+)/);
            if (match && !CONFIG.puAttendeeAmount) {
                console.log('Potential amount found:', text, 'in element:', el);
            }
        });
    }
    
    /**
     * Method 1: Intercept form submissions
     */
    function interceptFormSubmission() {
        // Intercept form submit event
        document.addEventListener('submit', function(e) {
            if (!CONFIG.enabled) return;
            
            const form = e.target;
            if (!form || form.tagName !== 'FORM') return;
            
            console.log('%c📝 Form submission intercepted', 'color: #2196F3; font-weight: bold;');
            
            // Find registration type field
            const typeField = findFormField(CONFIG.registrationTypeFields);
            if (typeField) {
                const currentValue = typeField.element.value || typeField.element.textContent || '';
                console.log('Current registration type:', currentValue);
                
                // Check if it's PU Attendee
                if (currentValue.toLowerCase().includes('pu attendee') || 
                    currentValue.toLowerCase() === 'pu') {
                    
                    // Change to Non PU Attendee
                    if (typeField.element.tagName === 'SELECT') {
                        // For select dropdowns, find the Non PU option
                        const options = Array.from(typeField.element.options);
                        const nonPuOption = options.find(opt => 
                            opt.text.toLowerCase().includes('non pu') || 
                            opt.value.toLowerCase().includes('non pu') ||
                            opt.text.toLowerCase().includes('non-pu') ||
                            opt.value.toLowerCase().includes('non-pu')
                        );
                        
                        if (nonPuOption) {
                            console.log('%c🔄 Changing registration type to:', 'color: #FF9800;', nonPuOption.text);
                            typeField.element.value = nonPuOption.value || nonPuOption.text;
                        } else {
                            // Directly set value
                            typeField.element.value = CONFIG.overrideType;
                            console.log('%c🔄 Changing registration type to:', 'color: #FF9800;', CONFIG.overrideType);
                        }
                    } else {
                        // For input fields
                        typeField.element.value = CONFIG.overrideType;
                        console.log('%c🔄 Changing registration type to:', 'color: #FF9800;', CONFIG.overrideType);
                    }
                }
            } else {
                console.warn('⚠️ Could not find registration type field. Trying common field names...');
                // Fallback: try to set directly on form data
            }
            
            // Ensure payment amount stays at PU Attendee level
            const amountField = findFormField(CONFIG.paymentAmountFields);
            if (amountField && CONFIG.puAttendeeAmount) {
                const currentAmount = parseFloat(amountField.element.value || amountField.element.textContent || 0);
                
                // If current amount is less than PU amount, update it
                if (currentAmount < CONFIG.puAttendeeAmount) {
                    console.log('%c💰 Maintaining PU Attendee payment amount:', 'color: #4CAF50;', CONFIG.puAttendeeAmount);
                    if (amountField.element.value !== undefined) {
                        amountField.element.value = CONFIG.puAttendeeAmount;
                    }
                }
            }
        }, true); // Use capture phase
    }
    
    /**
     * Method 2: Intercept Fetch API for form submissions
     */
    const originalFetch = window.fetch;
    window.fetch = function(url, options = {}) {
        if (CONFIG.enabled && options.method === 'POST' && options.body) {
            let body = options.body;
            let modifiedBody = null;
            
            // Parse form data
            if (typeof body === 'string' && body.includes('registration_type') || body.includes('type=')) {
                const formData = new URLSearchParams(body);
                const regType = formData.get('registration_type') || formData.get('type') || formData.get('attendee_type');
                
                if (regType && regType.toLowerCase().includes('pu attendee')) {
                    console.log('%c🔄 Fetch: Changing registration type in request body', 'color: #FF9800;');
                    
                    // Update registration type
                    formData.set('registration_type', CONFIG.overrideType);
                    formData.set('type', CONFIG.overrideType);
                    formData.set('attendee_type', CONFIG.overrideType);
                    
                    // Preserve PU amount if we have it
                    if (CONFIG.puAttendeeAmount) {
                        formData.set('amount', CONFIG.puAttendeeAmount);
                        formData.set('payment_amount', CONFIG.puAttendeeAmount);
                    }
                    
                    modifiedBody = formData.toString();
                }
            } else if (body instanceof FormData) {
                const regType = body.get('registration_type') || body.get('type') || body.get('attendee_type');
                
                if (regType && regType.toLowerCase().includes('pu attendee')) {
                    console.log('%c🔄 Fetch: Changing registration type in FormData', 'color: #FF9800;');
                    
                    body.set('registration_type', CONFIG.overrideType);
                    body.set('type', CONFIG.overrideType);
                    body.set('attendee_type', CONFIG.overrideType);
                    
                    if (CONFIG.puAttendeeAmount) {
                        body.set('amount', CONFIG.puAttendeeAmount);
                        body.set('payment_amount', CONFIG.puAttendeeAmount);
                    }
                }
            }
            
            if (modifiedBody) {
                options.body = modifiedBody;
            }
        }
        
        return originalFetch.apply(this, arguments);
    };
    
    /**
     * Method 3: Intercept XMLHttpRequest for AJAX form submissions
     */
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;
    
    XMLHttpRequest.prototype.open = function(method, url, ...args) {
        this._url = url;
        this._method = method;
        return originalXHROpen.apply(this, [method, url, ...args]);
    };
    
    XMLHttpRequest.prototype.send = function(data) {
        if (CONFIG.enabled && this._method === 'POST' && data) {
            if (typeof data === 'string' && (data.includes('registration_type') || data.includes('type='))) {
                const formData = new URLSearchParams(data);
                const regType = formData.get('registration_type') || formData.get('type') || formData.get('attendee_type');
                
                if (regType && regType.toLowerCase().includes('pu attendee')) {
                    console.log('%c🔄 XHR: Changing registration type in request', 'color: #FF9800;');
                    
                    formData.set('registration_type', CONFIG.overrideType);
                    formData.set('type', CONFIG.overrideType);
                    formData.set('attendee_type', CONFIG.overrideType);
                    
                    if (CONFIG.puAttendeeAmount) {
                        formData.set('amount', CONFIG.puAttendeeAmount);
                        formData.set('payment_amount', CONFIG.puAttendeeAmount);
                    }
                    
                    data = formData.toString();
                }
            }
        }
        
        return originalXHRSend.apply(this, [data]);
    };
    
    /**
     * Utility Functions
     */
    window.registrationOverride = {
        // Enable/disable
        enable: function() {
            CONFIG.enabled = true;
            console.log('%c✅ Registration override ENABLED', 'color: #4CAF50; font-weight: bold;');
        },
        
        disable: function() {
            CONFIG.enabled = false;
            console.log('%c❌ Registration override DISABLED', 'color: #F44336; font-weight: bold;');
        },
        
        // Set PU Attendee amount manually (if auto-detection fails)
        setPUAmount: function(amount) {
            CONFIG.puAttendeeAmount = parseFloat(amount);
            console.log('%c💰 PU Attendee amount set to:', 'color: #4CAF50;', CONFIG.puAttendeeAmount);
        },
        
        // Detect payment amounts on the page
        detectAmounts: function() {
            detectPaymentAmounts();
        },
        
        // Get current config
        getConfig: function() {
            return { ...CONFIG };
        },
        
        // Test - find registration type field
        test: function() {
            console.log('%c🧪 Testing field detection...', 'color: #9C27B0; font-weight: bold;');
            const typeField = findFormField(CONFIG.registrationTypeFields);
            if (typeField) {
                console.log('✅ Found registration type field:', typeField.name);
                console.log('Current value:', typeField.element.value || typeField.element.textContent);
            } else {
                console.warn('❌ Could not find registration type field');
            }
            
            const amountField = findFormField(CONFIG.paymentAmountFields);
            if (amountField) {
                console.log('✅ Found payment amount field:', amountField.name);
                console.log('Current value:', amountField.element.value || amountField.element.textContent);
            } else {
                console.warn('❌ Could not find payment amount field');
            }
        }
    };
    
    // Auto-detect payment amounts on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', detectPaymentAmounts);
    } else {
        setTimeout(detectPaymentAmounts, 1000); // Wait a bit for dynamic content
    }
    
    // Start intercepting form submissions
    interceptFormSubmission();
    
    console.log('%c📋 Usage Instructions:', 'color: #2196F3; font-weight: bold; font-size: 12px;');
    console.log('1. Select "PU Attendee" in the registration form');
    console.log('2. Fill in all other details');
    console.log('3. Submit the form - script will automatically:');
    console.log('   • Change type to "Non PU Attendee"');
    console.log('   • Keep payment at PU Attendee amount');
    console.log('');
    console.log('Commands:');
    console.log('• registrationOverride.test() - Test field detection');
    console.log('• registrationOverride.setPUAmount(500) - Set PU amount manually');
    console.log('• registrationOverride.detectAmounts() - Detect amounts on page');
    console.log('%c✓ Script ready! Select PU Attendee and submit.', 'color: #4CAF50; font-weight: bold;');
    
})();
