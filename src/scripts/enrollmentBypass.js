/**
 * Enrollment Validation Bypass Script
 * 
 * Purpose: Testing script to bypass frontend validation for enrollment check API
 * Usage: Copy and paste this entire script into browser console on the registration page
 * 
 * This script intercepts API calls to check_enrollment.php and returns a valid response
 * for testing purposes when your enrollment number is entered.
 */

(function() {
    'use strict';
    
    console.log('%c🔧 Enrollment Bypass Script Loaded', 'color: #4CAF50; font-weight: bold; font-size: 14px;');
    
    // Configuration - Update these values as needed
    const CONFIG = {
        enrollmentId: '210510312010',
        name: 'ARTH MAHENDRABHAI VALA',
        institute: 'Parul Institute of Computer Application',
        apiEndpoint: '/inc/check_enrollment.php',
        enabled: true
    };
    
    // Mock valid response
    const MOCK_VALID_RESPONSE = {
        valid: true,
        name: CONFIG.name,
        institute: CONFIG.institute
    };
    
    /**
     * Method 1: Intercept XMLHttpRequest (for jQuery AJAX calls)
     */
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;
    
    XMLHttpRequest.prototype.open = function(method, url, ...args) {
        this._url = url;
        this._method = method;
        return originalXHROpen.apply(this, [method, url, ...args]);
    };
    
    XMLHttpRequest.prototype.send = function(data) {
        // Check if this is the enrollment check request
        if (CONFIG.enabled && 
            this._url && 
            this._url.includes(CONFIG.apiEndpoint) && 
            this._method === 'POST') {
            
            // Parse the form data to get enrollment ID
            const formData = new URLSearchParams(data);
            const enrollmentId = formData.get('enrollment_id') || formData.get('enrollment') || formData.get('id');
            
            console.log('%c📝 Intercepted Enrollment Check Request', 'color: #2196F3; font-weight: bold;');
            console.log('Enrollment ID:', enrollmentId);
            console.log('Original Data:', data);
            
            // If it matches our enrollment ID or we want to bypass all, return valid response
            if (enrollmentId === CONFIG.enrollmentId || CONFIG.enabled) {
                console.log('%c✅ Bypassing validation - Returning valid response', 'color: #4CAF50; font-weight: bold;');
                
                // Override the response
                Object.defineProperty(this, 'responseText', {
                    writable: true
                });
                
                Object.defineProperty(this, 'status', {
                    writable: true
                });
                
                Object.defineProperty(this, 'statusText', {
                    writable: true
                });
                
                Object.defineProperty(this, 'readyState', {
                    writable: true
                });
                
                // Set up event listeners to fire with mock response
                setTimeout(() => {
                    this.responseText = JSON.stringify(MOCK_VALID_RESPONSE);
                    this.status = 200;
                    this.statusText = 'OK';
                    this.readyState = 4;
                    
                    if (this.onreadystatechange) {
                        this.onreadystatechange();
                    }
                    
                    // Dispatch events
                    this.dispatchEvent(new Event('readystatechange'));
                    this.dispatchEvent(new Event('load'));
                    this.dispatchEvent(new Event('loadend'));
                }, 100);
                
                return;
            }
        }
        
        // For other requests, proceed normally
        return originalXHRSend.apply(this, [data]);
    };
    
    /**
     * Method 2: Intercept Fetch API (modern approach)
     */
    const originalFetch = window.fetch;
    
    window.fetch = function(url, options = {}) {
        // Check if this is the enrollment check request
        if (CONFIG.enabled && 
            typeof url === 'string' && 
            url.includes(CONFIG.apiEndpoint) &&
            options.method === 'POST') {
            
            console.log('%c📝 Intercepted Fetch Enrollment Check Request', 'color: #2196F3; font-weight: bold;');
            console.log('URL:', url);
            console.log('Options:', options);
            
            // Parse body to get enrollment ID
            let enrollmentId = null;
            if (options.body) {
                if (typeof options.body === 'string') {
                    const formData = new URLSearchParams(options.body);
                    enrollmentId = formData.get('enrollment_id') || formData.get('enrollment') || formData.get('id');
                } else if (options.body instanceof FormData) {
                    enrollmentId = options.body.get('enrollment_id') || options.body.get('enrollment') || options.body.get('id');
                }
            }
            
            console.log('Enrollment ID:', enrollmentId);
            
            // Return mock valid response
            if (enrollmentId === CONFIG.enrollmentId || CONFIG.enabled) {
                console.log('%c✅ Bypassing validation - Returning valid response', 'color: #4CAF50; font-weight: bold;');
                
                return Promise.resolve(new Response(
                    JSON.stringify(MOCK_VALID_RESPONSE),
                    {
                        status: 200,
                        statusText: 'OK',
                        headers: {
                            'Content-Type': 'application/json',
                            'content-type': 'application/json'
                        }
                    }
                ));
            }
        }
        
        // For other requests, proceed normally
        return originalFetch.apply(this, arguments);
    };
    
    /**
     * Method 3: Intercept jQuery AJAX (if jQuery is used)
     */
    if (window.jQuery) {
        const originalAjax = window.jQuery.ajax;
        window.jQuery.ajax = function(options) {
            if (CONFIG.enabled && 
                options.url && 
                options.url.includes(CONFIG.apiEndpoint) &&
                options.type === 'POST') {
                
                console.log('%c📝 Intercepted jQuery AJAX Enrollment Check Request', 'color: #2196F3; font-weight: bold;');
                console.log('Options:', options);
                
                // Override success callback with mock response
                const originalSuccess = options.success;
                options.success = function(data, textStatus, jqXHR) {
                    console.log('%c✅ Bypassing validation - Returning valid response', 'color: #4CAF50; font-weight: bold;');
                    if (originalSuccess) {
                        originalSuccess.call(this, MOCK_VALID_RESPONSE, textStatus, jqXHR);
                    }
                };
            }
            return originalAjax.apply(this, arguments);
        };
        
        console.log('%c✓ jQuery AJAX interception enabled', 'color: #4CAF50;');
    }
    
    /**
     * Utility Functions
     */
    window.enrollmentBypass = {
        // Enable/disable the bypass
        enable: function() {
            CONFIG.enabled = true;
            console.log('%c✅ Enrollment bypass ENABLED', 'color: #4CAF50; font-weight: bold;');
        },
        
        disable: function() {
            CONFIG.enabled = false;
            console.log('%c❌ Enrollment bypass DISABLED', 'color: #F44336; font-weight: bold;');
        },
        
        // Update configuration
        setConfig: function(newConfig) {
            Object.assign(CONFIG, newConfig);
            console.log('%c⚙️ Configuration updated', 'color: #FF9800; font-weight: bold;');
            console.log('New config:', CONFIG);
        },
        
        // Get current configuration
        getConfig: function() {
            return { ...CONFIG };
        },
        
        // Test the bypass manually
        test: function(enrollmentId) {
            const testId = enrollmentId || CONFIG.enrollmentId;
            console.log('%c🧪 Testing bypass for enrollment ID:', 'color: #9C27B0; font-weight: bold;', testId);
            
            fetch('https://vadodaraliteraturefestival.in/inc/check_enrollment.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: `enrollment_id=${testId}`
            })
            .then(response => response.json())
            .then(data => {
                console.log('%c✅ Response received:', 'color: #4CAF50; font-weight: bold;', data);
            })
            .catch(error => {
                console.error('%c❌ Error:', 'color: #F44336; font-weight: bold;', error);
            });
        }
    };
    
    console.log('%c📋 Usage Instructions:', 'color: #2196F3; font-weight: bold; font-size: 12px;');
    console.log('1. The script is now active and will intercept enrollment checks');
    console.log('2. Use enrollmentBypass.enable() to enable');
    console.log('3. Use enrollmentBypass.disable() to disable');
    console.log('4. Use enrollmentBypass.setConfig({enrollmentId: "YOUR_ID"}) to update config');
    console.log('5. Use enrollmentBypass.test() to test the bypass');
    console.log('%c✓ Script ready! Fill the form and submit.', 'color: #4CAF50; font-weight: bold;');
    
})();

