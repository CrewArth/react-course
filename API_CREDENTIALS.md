# KodeCreators Interview API - Login Credentials

## Base URL
```
https://interview-api.kodecreators.com/api
```

## Login Endpoint
```
POST /auth/login
```

## Request Format
```json
{
  "username": "your_username",
  "password": "your_password"
}
```

## Response Format (Expected)
```json
{
  "token": "jwt_token_here",
  "user": {
    // user object
  }
}
```

## Credentials

**Note:** The login credentials are not included in the Postman collection. You will need to obtain them from:

1. **Your Interview Coordinator** - They should provide test credentials for the interview API
2. **API Documentation** - Check if there's separate documentation with test credentials
3. **Common Test Credentials** - Some interview APIs use standard test accounts like:
   - Username: `test` / Password: `test`
   - Username: `admin` / Password: `admin`
   - Username: `demo` / Password: `demo`

## How to Find Credentials

If you don't have the credentials yet, try:

1. Contact the person who provided you with the Postman collection
2. Check the interview/test instructions or documentation
3. Check if the API has a registration endpoint: `POST /auth/register`
4. Look for environment-specific credentials (dev/staging/prod)

## Usage in Application

The login credentials can be used in the Login component at `/login` route. The application is now configured to use the KodeCreators interview API endpoint.

---

**Important:** Never commit actual credentials to version control. Use environment variables or secure credential management for production applications.
