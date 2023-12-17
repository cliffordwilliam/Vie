# API Documentation

## Introduction

This API provides CRUD operations for the users table and more. It allows you to create new users and edit existing ones.

## Authentication

To access the API, register and log in to obtain a bearer token. Include this token in the headers of your requests. Authentication is powered by JWT tokens.

## Endpoints

### POST User

#### Description

Adds a new user to the database.

#### Endpoint

POST /user

#### Parameters

**Body:**

- **username:** String, required, unique.
- **password:** String, required, characters length minimum is 5.

#### Request

```json
{
  "username": "Emily",
  "password": "vivehodie"
}
```

#### Responses

201 Created

```json
{
  "status": 201,
  "msg": "User successfully created.",
  "user": {
    "id": 1,
    "username": "Emily",
    "email": null,
    "profile_picture_url": null,
    "bio": null,
    "createdAt": "2023-12-17T03:12:09.736Z",
    "updatedAt": "2023-12-17T03:12:09.736Z"
  }
}
```

400 Bad Request

```json
{
    "error": {
        "status": 400,
        "msg": "Username is required."
    }
}
{
    "error": {
        "status": 400,
        "msg": "Username cannot be empty."
    }
}
{
    "error": {
        "status": 400,
        "msg": "Password is required."
    }
}
{
    "error": {
        "status": 400,
        "msg": "Password must be at least 5 characters long."
    }
}
```

500 Internal Server Error

```json
{
  "status": "error",
  "message": "Internal server error. Please try again later."
}
```

---

### POST Login User

#### Description

Generates a token for existing user in database.

#### Endpoint

POST /user/login

#### Parameters

**Body:**

- **username:** existing username in database.
- **password:** password of the existing username.

#### Request

```json
{
  "username": "Emily",
  "password": "vivehodie"
}
```

#### Responses

200 OK

```json
{
  "status": 200,
  "msg": "Login successful.",
  "token": "ey...",
  "user": {
    "id": 1,
    "username": "Emily",
    "email": null,
    "profile_picture_url": null,
    "bio": null,
    "createdAt": "2023-12-17T04:23:54.918Z",
    "updatedAt": "2023-12-17T04:23:54.918Z"
  }
}
```

400 Bad Request

```json
{
  "error": {
    "status": 400,
    "msg": "Username is required."
  }
}
```

```json
{
  "error": {
    "status": 400,
    "msg": "Password is required."
  }
}
```

500 Internal Server Error

```json
{
  "status": "error",
  "message": "Internal server error. Please try again later."
}
```

---

### GET User

#### Description

Returns all the users from database.

#### Endpoint

GET /user

#### Parameters

**Query:**

- **search:** the keyword for the search field to filter from.
- **searchField:** The thing to be searched upon.
- **limit:** data per page.
- **page:** the current page.
- **sort:** asc or desc.
- **sortField:** The thing to sort by.

#### Request

```json
{
  "search": "Em",
  "searchField": "username",
  "limit": 1,
  "page": 1,
  "sort": "asc",
  "sortField": "createdAt"
}
```

#### Responses

200 OK

```json
{
  "status": 200,
  "msg": "Users successfully retrieved.",
  "users": [
    {
      "id": 1,
      "username": "Emily",
      "email": null,
      "profile_picture_url": null,
      "bio": null,
      "createdAt": "2023-12-17T04:23:54.918Z",
      "updatedAt": "2023-12-17T04:23:54.918Z"
    }
  ]
}
```

400 Bad Request

```json
{
  "error": {
    "status": 400,
    "msg": "Invalid searchField. Please use 'username', 'email' or 'bio'."
  }
}
```

```json
{
  "error": {
    "status": 400,
    "msg": "Invalid sort. Please use 'asc' or 'desc'."
  }
}
```

```json
{
  "error": {
    "status": 400,
    "msg": "Invalid sortField. Please use 'username', 'email', 'createdAt', 'updatedAt'."
  }
}
```

401 Unauthorized

```json
{
  "error": {
    "status": 401,
    "msg": "Unauthorized. A valid bearer token is required for access."
  }
}
```

```json
{
  "error": {
    "status": 401,
    "msg": "Unauthorized. Your access token is invalid."
  }
}
```

500 Internal Server Error

```json
{
  "status": "error",
  "message": "Internal server error. Please try again later."
}
```

### GET ID User

#### Description

Returns one user by their ID.

#### Endpoint

GET /user/:id

#### Parameters

**Params:**

- **id:** 1.

#### Request

```json
{
  "id": 1
}
```

#### Responses

200 OK

```json
{
  "status": 200,
  "msg": "User successfully retrieved.",
  "user": {
    "id": 1,
    "username": "Emily",
    "email": null,
    "profile_picture_url": null,
    "bio": null,
    "createdAt": "2023-12-17T04:23:54.918Z",
    "updatedAt": "2023-12-17T04:23:54.918Z"
  }
}
```

400 Bad Request

```json
{
  "error": {
    "status": 400,
    "msg": "User ID must be a valid integer."
  }
}
```

401 Unauthorized

```json
{
  "error": {
    "status": 401,
    "msg": "Unauthorized. A valid bearer token is required for access."
  }
}
```

```json
{
  "error": {
    "status": 401,
    "msg": "invalid signature"
  }
}
```

404 Not Found

```json
{
  "error": {
    "status": 404,
    "msg": "User not found. No user with the ID -1 exists."
  }
}
```

500 Internal Server Error

```json
{
  "status": "error",
  "message": "Internal server error. Please try again later."
}
```

### ??? ???

#### Description

???

#### Endpoint

??? /???

#### Parameters

**???:**

- **???:** ???.

#### Request

```json
{
  "???": "???"
}
```

#### Responses

201 Created

```json

```

200 OK

```json

```

400 Bad Request

```json

```

401 Unauthorized

```json
{
  "status": "error",
  "message": "Unauthorized. Please provide a valid bearer token."
}
```

403 Forbidden - maybe later check in connections ig got a certain game score that is under par

```json
{
  "status": "error",
  "message": "Forbidden. Insufficient permissions to create a new user."
}
```

500 Internal Server Error

```json
{
  "status": "error",
  "message": "Internal server error. Please try again later."
}
```

### ??? ???

#### Description

???

#### Endpoint

??? /???

#### Parameters

**???:**

- **???:** ???.

#### Request

```json
{
  "???": "???"
}
```

#### Responses

201 Created

```json

```

200 OK

```json

```

400 Bad Request

```json

```

401 Unauthorized

```json
{
  "status": "error",
  "message": "Unauthorized. Please provide a valid bearer token."
}
```

403 Forbidden - maybe later check in connections ig got a certain game score that is under par

```json
{
  "status": "error",
  "message": "Forbidden. Insufficient permissions to create a new user."
}
```

500 Internal Server Error

```json
{
  "status": "error",
  "message": "Internal server error. Please try again later."
}
```
