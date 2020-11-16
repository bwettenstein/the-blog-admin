# the-blog-admin

## Description

This is a REST API, at least to the best of my abilities, that allows admins to create and modify messages that are displayed on the front end blog site.

## Stack and main packages

Nodejs, Express, Mongoose, Jwt, bcrypt

## Documentation

### URL For Routes

https://intense-forest-77371.herokuapp.com

### Index routes

**Path** - '/'  
**Request Type**- GET  
**Called method** - getLoginPage  
**Authentication Needed** - No  
**Description** - Purely renders the login page

**Path** - '/'  
**Request Type**- POST  
**Called method** - postLoginPage  
**Authentication Needed** - No  
**Description** - Takes in the username and password. Checks to see if the username is already in use and checks if the password is valid. If the username and password fields are valid, a json web token is signed and returned to the user so they can have access to authenticated routes.

### Message routes

**Path** - '/admin/message/message-list'  
**Request Type**- GET  
**Called method** - messageListGet  
**Authentication Needed** - Yes  
**Required Headers** -

- auth-token - Holds the jsonwebtoken returned to the user when they logged in. The token will be verified, if verification is passed the request will be processed.

**Description** - Returns the list of all messages currently saved in the database. The id, title, text, user, and timestamp of each message will be returned. This data is returned in json.

**Path** - '/admin/message/:message-id'  
**Request Type**- GET  
**Called method** - getMessageGet  
**Authentication Needed** - Yes  
**Required Headers** -

- auth-token - Holds the jsonwebtoken returned to the user when they logged in. The token will be verified, if verification is passed the request will be processed.

**Description** - Returns a single message saved in the database. The message id passed in the url request will be verified. If the id is correct and matches an existing entry, the message's id, title, text, user, and timestamp will be returned in json.

**Path** - '/admin/message/create'  
**Request Type**- GET  
**Called method** - createMessageGet  
**Authentication Needed** - Yes  
**Required Headers** -

- auth-token - Holds the jsonwebtoken returned to the user when they logged in. The token will be verified, if verification is passed the request will be processed.

**Description** - Returns instructions on the info they need to provide in order to make a post request to create the request.

**Path** - '/admin/message/create'  
**Request Type**- POST  
**Called method** - createMessagePost  
**Authentication Needed** - Yes  
**Required Headers** -

- auth-token - Holds the jsonwebtoken returned to the user when they logged in. The token will be verified, if verification is passed the request will be processed.
- message-title - Holds the title to the message that the user wishes to create.
- message-text - Holds the body of the message that the user create.

**Description** - Extracts the id of the user through the json web token. The id is used to create the message and sign the user as the author. Additionally, the message-title and message-text are checked to make sure they are provided. If they're not, the request won't go through and the user will be told to include the headers. If the headers are present, the message is saved to the database and a success message is sent back to the user in json.

**Path** - '/admin/message/:message-id'  
**Request Type**- PUT  
**Called method** - editMessagePut  
**Authentication Needed** - Yes  
**Required Headers** -

- auth-token - Holds the jsonwebtoken returned to the user when they logged in. The token will be verified, if verification is passed the request will be processed.
- message-title - Holds the updated message title.
- message-text - Holds the updated message body.

**Description** - First verifies that the message-title and message-text headers are present, as well as the message-id in the url. If either field is missing, or incorrect in the case of the message-id, an response will be sent telling the user that something is missing. Once successfully verified, the message will be updated and saved. Upon success, the user will receive a response that includes a success message and the updated message.

**Path** - '/admin/message/:message-id'  
**Request Type**- PUT  
**Called method** - deleteMessageDelete  
**Authentication Needed** - Yes  
**Required Headers** -

- auth-token - Holds the jsonwebtoken returned to the user when they logged in. The token will be verified, if verification is passed the request will be processed.

**Description** - Verifies that the id is present and valid. If verification fails, a response will be sent to the user telling them that the request wasn't successful. Upon successful verification, the message matching the message id will be deleted and a success response that includes the deleted message will be sent to the user.
