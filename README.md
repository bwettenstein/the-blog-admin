# the-blog-admin

## Documentation

### Index routes

**Path** - '/'  
**Request Type**- GET  
**Called method** - getLoginPage  
**Authentication Needed** - No  
**Description** - Purely renders the login page

**Path** - '/'  
**Request Type**- POST  
**Called method** - getLoginPage  
**Authentication Needed** - No  
**Description** - Takes in the username and password. Checks to see if the username is already in use and checks if the password is valid. If the username and password fields are valid, a json web token is signed and returned to the user so they can have access to authenticated routes.
