# User Routes Documentation

```markdown
## POST /user/register
- Description: Registers a new user.
- Status Codes:
  - 201: User successfully created.
  - 400: Validation error or user already exists.

### Request Body
- name (String, min 3 chars)
- email (String, valid email)
- password (String, min 6 chars)
- role (Optional, defaults to "STUDENT")

### Example

POST /user/register
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "mypassword",
        "role": "STUDENT"
    }


## Example Response
### 201 (Created)

{
  "user": {
    "id": String,
    "sort_id":String,
    "email":String,
    "password":String,
    "name":String,
    "role":String

  }
  "token": String
}


### 400 (Bad Request)

{
  "error": "User already exist"
}
```


```markdown

### Login and Logout Routes

## POST /user/login
- Description: Logs in an existing user.
- Status Codes:
  - 200: User logged in successfully.
  - 400: Validation error.
  - 401: Invalid credentials.

### Request Body
- email (String, valid email)
- password (String, min 6 chars)

### Example
POST /user/login
{
  "email": "john@example.com",
  "password": "mypassword"
}


## Example Response
### 200 (OK)
{
  "token": "string",
  "user": {
    "id": "string",
    // ...existing fields...
  }
}

## GET /user/logout
Logs out a user by blacklisting the current token.
Requires valid authentication.
