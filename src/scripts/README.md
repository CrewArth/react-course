# Enrollment Validation Bypass Script

## Purpose
This script is designed for **testing purposes only** to bypass frontend validation for the enrollment check API. It allows you to test the backend registration flow even when your enrollment ID is marked as inactive in the database.

## ⚠️ Important Notes
- **This is for testing purposes only**
- Use only on your company's testing/staging environment
- Do not use this script on production systems
- This script modifies browser behavior and should be removed after testing

## 📋 Prerequisites
- Access to the registration page: `https://vadodaraliteraturefestival.in/registration/`
- Browser Developer Tools (F12)
- Your enrollment details:
  - Enrollment ID: `210510312010`
  - Name: `ARTH MAHENDRABHAI VALA`
  - Institute: `Parul Institute of Computer Application`

## 🚀 Quick Start (Simplified Version)

### Step 1: Open the Registration Page
1. Navigate to: `https://vadodaraliteraturefestival.in/registration/`
2. Open Browser Developer Tools (Press `F12` or `Right-click → Inspect`)
3. Go to the **Console** tab

### Step 2: Copy and Paste the Script
1. Open the file: `enrollmentBypass-console.js`
2. Copy the **entire content** (including the `(function() { ... })();` wrapper)
3. Paste it into the browser console
4. Press `Enter` to execute

You should see: `🔧 Enrollment bypass script loaded! Fill the form and submit.`

### Step 3: Fill the Form
Fill in the registration form with these details:
- **Registration Type**: PU Attendee
- **Enrollment ID**: `210510312010`
- **Name**: `ARTH MAHENDRABHAI VALA`
- **Institute**: `Parul Institute Of Computer Application`
- **Mail ID**: `arthvala@gmail.com`
- **Whatsapp Number**: `9913414224`

### Step 4: Submit the Form
1. Click the submit/check enrollment button
2. The script will intercept the API call
3. You should see in console: `✅ Bypassing enrollment check - Returning valid response`
4. The form should now accept your enrollment ID and proceed

## 📖 Detailed Usage (Full Version)

### Using the Full-Featured Script

1. **Load the Script**:
   - Open `enrollmentBypass.js` in your editor
   - Copy the entire content
   - Paste into browser console and press Enter

2. **Available Commands**:
   ```javascript
   // Enable bypass (default: enabled)
   enrollmentBypass.enable()
   
   // Disable bypass
   enrollmentBypass.disable()
   
   // Update configuration
   enrollmentBypass.setConfig({
       enrollmentId: '210510312010',
       name: 'ARTH MAHENDRABHAI VALA',
       institute: 'Parul Institute of Computer Application'
   })
   
   // View current configuration
   enrollmentBypass.getConfig()
   
   // Test the bypass manually
   enrollmentBypass.test('210510312010')
   ```

## 🔍 How It Works

The script uses three methods to intercept API calls:

1. **Fetch API Interception**: Intercepts modern `fetch()` calls
2. **XMLHttpRequest Interception**: Intercepts traditional AJAX calls (used by jQuery)
3. **jQuery AJAX Interception**: Specifically handles jQuery AJAX calls (if jQuery is present)

When the script detects a POST request to `/inc/check_enrollment.php`, it:
- Intercepts the request before it reaches the server
- Returns a mock valid response: `{valid: true, name: "...", institute: "..."}`
- Allows the form to proceed with registration

## 📡 API Details

**Endpoint**: `https://vadodaraliteraturefestival.in/inc/check_enrollment.php`

**Request Method**: POST

**Request Headers**:
```
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
```

**Request Body** (Form Data):
```
enrollment_id=210510312010
```

**Expected Valid Response**:
```json
{
  "valid": true,
  "name": "ARTH MAHENDRABHAI VALA",
  "institute": "Parul Institute of Computer Application"
}
```

**Invalid Response** (what you're bypassing):
```json
{
  "valid": false,
  "message": "Invalid Enrollment / Staff ID"
}
```

## 🐛 Troubleshooting

### Script Not Working?

1. **Check Console for Errors**:
   - Open DevTools → Console tab
   - Look for any red error messages
   - Make sure the script executed without errors

2. **Verify Script is Loaded**:
   - Type `enrollmentBypass` in console
   - You should see an object with methods (if using full version)

3. **Check Network Tab**:
   - Open DevTools → Network tab
   - Filter by "check_enrollment"
   - Submit the form
   - Check if the request is being intercepted
   - Look at the response - it should show the mock valid response

4. **Try Different Interception Method**:
   - The script tries multiple methods
   - If one doesn't work, the others should catch it
   - Check which method is being used in console logs

5. **Clear Browser Cache**:
   - Sometimes cached scripts can interfere
   - Try hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

6. **Check Form Field Names**:
   - The script looks for `enrollment_id`, `enrollment`, or `id` in the form data
   - If your form uses a different field name, update the script accordingly

### Form Still Shows Invalid?

1. **Verify Script Execution**:
   - Make sure you see the success message in console
   - Check that the script ran after page load

2. **Check Timing**:
   - Some forms validate on blur/change events
   - Try submitting the form again after script is loaded

3. **Multiple Validation Points**:
   - Some forms have client-side validation before API call
   - The script only bypasses the API call, not client-side validation

## 🔒 Security Notes

- This script only works in your browser - it doesn't modify server-side code
- The bypass only affects your browser session
- Other users are not affected
- Server-side validation should still be in place
- This is purely for frontend testing purposes

## 📝 Customization

To use with different enrollment details, modify these values in the script:

```javascript
const enrollmentId = 'YOUR_ENROLLMENT_ID';
const mockResponse = {
    valid: true,
    name: 'YOUR_NAME',
    institute: 'YOUR_INSTITUTE'
};
```

## 🧪 Testing Checklist

- [ ] Script loads without errors
- [ ] Console shows success message
- [ ] Form accepts enrollment ID
- [ ] Registration proceeds successfully
- [ ] Network tab shows intercepted request
- [ ] Response shows valid: true

## 📞 Support

If you encounter issues:
1. Check browser console for error messages
2. Verify all form fields are filled correctly
3. Ensure script is loaded before form submission
4. Try refreshing the page and reloading the script

---

**Remember**: This is a testing tool. Always ensure proper server-side validation exists in production!

