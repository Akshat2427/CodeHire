```markdown
# User Routes Documentation

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
<<<<<<< HEAD

=======
```markdown

### Login routes
>>>>>>> 19fb3345a5429007782b955eca0a0d7583bae77e

