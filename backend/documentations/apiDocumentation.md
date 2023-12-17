# API Documentation

## Introduction

This API provides CRUD operations for the users table and more. It allows you to create new users and edit existing ones.

## Authentication

To access the API, register and log in to obtain a bearer token. Include this token in the headers of your requests. Authentication is powered by JWT tokens.

## Endpoints

### 1. POST User

#### Description

Adds a new user to the database.

#### Endpoint

POST /user/post

#### Parameters

You need 2 credentials to create a user.

- **Username:** This must be unique.
- **Password:** Anything you want.

#### Request

Example of a request:

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
  "status": "success",
  "data": {
    // Additional information about the new user
  }
}
```

400 Bad Request

```json
{
  "status": "error",
  "message": "Invalid request. Please check your input."
}

{
  "status": "error",
  "message": "Username 'Emily' already exists. Please choose a different one."
}

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

### 2. ??? model

#### Description

?????.

#### Endpoint

??? /model/???

#### Parameters

?????.

- **????:** ?????.

#### Request

Example of a request:

Body
Param
Query

```json
{
  "username": "Emily"
}
```

#### Responses

200 OK

```json
{
  "status": "success",
  "data": {
    // Additional information about the new user
  }
}
```

400 Bad Request

```json
{
  "status": "error",
  "message": "Invalid request. Please check your input."
}

{
  "status": "error",
  "message": "Username 'Emily' already exists. Please choose a different one."
}

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
