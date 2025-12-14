# API Documentation

## Auth

### Register
- **POST** `/api/auth/register`
- Body:
  ```json
  {
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123"
  }
  ```
- Response: `{ "token": "JWT" }`

### Login
- **POST** `/api/auth/login`
- Body:
  ```json
  {
    "email": "test@example.com",
    "password": "test123"
  }
  ```
- Response: `{ "token": "JWT" }`

---

## Profile

### Get Profile
- **GET** `/api/profile`
- Headers: `Authorization: Bearer <token>`
- Response: `{ "name": "Test User", "email": "test@example.com" }`

---

## Tasks

### Get All Tasks
- **GET** `/api/tasks`
- Headers: `Authorization: Bearer <token>`
- Response:
  ```json
  [
    { "id": 1, "title": "Task 1", "completed": false, ... }
  ]
  ```

### Create Task
- **POST** `/api/tasks`
- Headers: `Authorization: Bearer <token>`
- Body:
  ```json
  { "title": "My new task" }
  ```
- Response:
  ```json
  { "id": 2, "title": "My new task", "completed": false, ... }
  ```

### Update Task
- **PUT** `/api/tasks/:id`
- Headers: `Authorization: Bearer <token>`
- Body:
  ```json
  { "completed": true }
  ```
- Response: `{ "message": "Task updated" }`

### Delete Task
- **DELETE** `/api/tasks/:id`
- Headers: `Authorization: Bearer <token>`
- Response: `{ "message": "Task deleted" }`