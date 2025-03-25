# PhotoPilot API Documentation

This document provides details about the PhotoPilot API endpoints, request/response formats, and authentication requirements.

## Base URL

All API endpoints are relative to the base URL:

```
http://localhost:5000/api
```

In production, this would be your deployed API URL.

## Authentication

Most API endpoints require authentication using JSON Web Tokens (JWT). To authenticate, include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

You can obtain a JWT token by registering or logging in.

## Endpoints

### Authentication

#### Register a new user

- **URL**: `/auth/register`
- **Method**: `POST`
- **Auth required**: No
- **Request body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response**:
  - **Code**: 201 Created
  - **Content**:
    ```json
    {
      "_id": "60d0fe4f5311236168a109ca",
      "name": "John Doe",
      "email": "john@example.com",
      "token": "your_jwt_token"
    }
    ```

#### Login

- **URL**: `/auth/login`
- **Method**: `POST`
- **Auth required**: No
- **Request body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "_id": "60d0fe4f5311236168a109ca",
      "name": "John Doe",
      "email": "john@example.com",
      "cloudAccounts": [],
      "socialAccounts": [],
      "token": "your_jwt_token"
    }
    ```

#### Get user profile

- **URL**: `/auth/profile`
- **Method**: `GET`
- **Auth required**: Yes
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "_id": "60d0fe4f5311236168a109ca",
      "name": "John Doe",
      "email": "john@example.com",
      "cloudAccounts": [],
      "socialAccounts": [],
      "createdAt": "2023-03-01T12:00:00.000Z"
    }
    ```

### Projects

#### Get all projects

- **URL**: `/projects`
- **Method**: `GET`
- **Auth required**: Yes
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    [
      {
        "_id": "60d0fe4f5311236168a109cb",
        "name": "Wedding Shoot 2023",
        "cloudPath": "/wedding_shoot_2023",
        "cloudProvider": "dropbox",
        "owner": {
          "_id": "60d0fe4f5311236168a109ca",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "collaborators": [],
        "createdAt": "2023-03-01T12:00:00.000Z",
        "updatedAt": "2023-03-01T12:00:00.000Z"
      }
    ]
    ```

#### Create a new project

- **URL**: `/projects`
- **Method**: `POST`
- **Auth required**: Yes
- **Request body**:
  ```json
  {
    "name": "Wedding Shoot 2023",
    "cloudPath": "/wedding_shoot_2023",
    "cloudProvider": "dropbox"
  }
  ```
- **Success Response**:
  - **Code**: 201 Created
  - **Content**:
    ```json
    {
      "_id": "60d0fe4f5311236168a109cb",
      "name": "Wedding Shoot 2023",
      "cloudPath": "/wedding_shoot_2023",
      "cloudProvider": "dropbox",
      "owner": "60d0fe4f5311236168a109ca",
      "collaborators": [],
      "createdAt": "2023-03-01T12:00:00.000Z",
      "updatedAt": "2023-03-01T12:00:00.000Z"
    }
    ```

#### Get a project by ID

- **URL**: `/projects/:id`
- **Method**: `GET`
- **Auth required**: Yes
- **URL Parameters**: `id=[string]` where `id` is the ID of the project
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "_id": "60d0fe4f5311236168a109cb",
      "name": "Wedding Shoot 2023",
      "cloudPath": "/wedding_shoot_2023",
      "cloudProvider": "dropbox",
      "owner": {
        "_id": "60d0fe4f5311236168a109ca",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "collaborators": [],
      "createdAt": "2023-03-01T12:00:00.000Z",
      "updatedAt": "2023-03-01T12:00:00.000Z"
    }
    ```

#### Update a project

- **URL**: `/projects/:id`
- **Method**: `PUT`
- **Auth required**: Yes
- **URL Parameters**: `id=[string]` where `id` is the ID of the project
- **Request body**:
  ```json
  {
    "name": "Wedding Shoot 2023 - Updated",
    "cloudPath": "/wedding_shoot_2023_updated"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "_id": "60d0fe4f5311236168a109cb",
      "name": "Wedding Shoot 2023 - Updated",
      "cloudPath": "/wedding_shoot_2023_updated",
      "cloudProvider": "dropbox",
      "owner": "60d0fe4f5311236168a109ca",
      "collaborators": [],
      "createdAt": "2023-03-01T12:00:00.000Z",
      "updatedAt": "2023-03-01T12:30:00.000Z"
    }
    ```

#### Delete a project

- **URL**: `/projects/:id`
- **Method**: `DELETE`
- **Auth required**: Yes
- **URL Parameters**: `id=[string]` where `id` is the ID of the project
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "message": "Project removed"
    }
    ```

#### Add a collaborator to a project

- **URL**: `/projects/:id/collaborators`
- **Method**: `POST`
- **Auth required**: Yes
- **URL Parameters**: `id=[string]` where `id` is the ID of the project
- **Request body**:
  ```json
  {
    "userId": "60d0fe4f5311236168a109cc",
    "role": "editor"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content**: Updated project object

### Media Assets

#### Get all media assets for a project

- **URL**: `/media/project/:projectId`
- **Method**: `GET`
- **Auth required**: Yes
- **URL Parameters**: `projectId=[string]` where `projectId` is the ID of the project
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    [
      {
        "_id": "60d0fe4f5311236168a109cd",
        "projectId": "60d0fe4f5311236168a109cb",
        "filename": "IMG_001.jpg",
        "status": "good",
        "cloudPath": "/wedding_shoot_2023/IMG_001.jpg",
        "metadata": {
          "ai_description": "A couple standing under a floral arch",
          "custom_text": "",
          "social_posts": []
        },
        "orderIndex": 0,
        "createdAt": "2023-03-01T12:00:00.000Z",
        "updatedAt": "2023-03-01T12:00:00.000Z"
      }
    ]
    ```

#### Create a new media asset

- **URL**: `/media`
- **Method**: `POST`
- **Auth required**: Yes
- **Request body**:
  ```json
  {
    "projectId": "60d0fe4f5311236168a109cb",
    "filename": "IMG_001.jpg",
    "cloudPath": "/wedding_shoot_2023/IMG_001.jpg",
    "status": "good",
    "orderIndex": 0
  }
  ```
- **Success Response**:
  - **Code**: 201 Created
  - **Content**: Created media asset object

#### Update a media asset

- **URL**: `/media/:id`
- **Method**: `PUT`
- **Auth required**: Yes
- **URL Parameters**: `id=[string]` where `id` is the ID of the media asset
- **Request body**:
  ```json
  {
    "status": "change",
    "metadata": {
      "ai_description": "A couple standing under a floral arch",
      "custom_text": "Wedding ceremony"
    },
    "orderIndex": 1
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content**: Updated media asset object

#### Delete a media asset

- **URL**: `/media/:id`
- **Method**: `DELETE`
- **Auth required**: Yes
- **URL Parameters**: `id=[string]` where `id` is the ID of the media asset
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "message": "Media asset removed"
    }
    ```

#### Update media asset status

- **URL**: `/media/:id/status`
- **Method**: `PUT`
- **Auth required**: Yes
- **URL Parameters**: `id=[string]` where `id` is the ID of the media asset
- **Request body**:
  ```json
  {
    "status": "good"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content**: Updated media asset object

## Error Responses

All endpoints can return the following error responses:

- **401 Unauthorized**:
  ```json
  {
    "message": "Not authorized, no token"
  }
  ```

- **403 Forbidden**:
  ```json
  {
    "message": "Not authorized to access this resource"
  }
  ```

- **404 Not Found**:
  ```json
  {
    "message": "Resource not found"
  }
  ```

- **500 Internal Server Error**:
  ```json
  {
    "message": "Server error"
  }
  ```