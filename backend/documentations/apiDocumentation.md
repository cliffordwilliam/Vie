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

- **Username:** String, required, unique.
- **Password:** String, required, characters length minimum is 5.

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

- **Username:** existing username in database.
- **Password:** password of the existing username.

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

### 1. ??? ???

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

200 Created

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

403 Forbidden

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
