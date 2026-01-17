/**
 * SIMPLIFIED VERSION - Copy this entire code and paste into browser console
 * This version is optimized for quick copy-paste into console
 */

(function() {
    const enrollmentId = '210510312010';
    const mockResponse = {
        valid: true,
        name: 'ARTH MAHENDRABHAI VALA',
        institute: 'Parul Institute of Computer Application'
    };
    
    // Intercept Fetch API
    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
        if (typeof url === 'string' && url.includes('/inc/check_enrollment.php') && options?.method === 'POST') {
            console.log('✅ Bypassing enrollment check - Returning valid response');
            return Promise.resolve(new Response(JSON.stringify(mockResponse), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }));
        }
        return originalFetch.apply(this, arguments);
    };
    
    // Intercept XMLHttpRequest
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;
    
    XMLHttpRequest.prototype.open = function(method, url) {
        this._url = url;
        this._method = method;
        return originalXHROpen.apply(this, arguments);
    };
    
    XMLHttpRequest.prototype.send = function(data) {
        if (this._url && this._url.includes('/inc/check_enrollment.php') && this._method === 'POST') {
            console.log('✅ Bypassing enrollment check - Returning valid response');
            setTimeout(() => {
                Object.defineProperty(this, 'responseText', { writable: true, value: JSON.stringify(mockResponse) });
                Object.defineProperty(this, 'status', { writable: true, value: 200 });
                Object.defineProperty(this, 'readyState', { writable: true, value: 4 });
                if (this.onreadystatechange) this.onreadystatechange();
                this.dispatchEvent(new Event('readystatechange'));
                this.dispatchEvent(new Event('load'));
            }, 50);
            return;
        }
        return originalXHRSend.apply(this, arguments);
    };
    
    console.log('🔧 Enrollment bypass script loaded! Fill the form and submit.');
})();

