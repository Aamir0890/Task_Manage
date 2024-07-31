# Project Management API

This API provides functionality for managing projects, teams, tasks, comments, and attachments.

## Features

1. User Management
2. Team Management
3. Task Management
4. Comment System
5. Attachment Handling

## API Endpoints

### User Management

#### Create User
- **POST** `/api/users`
- Creates a new user account
- Request body:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
 - Response: Returns the created user object (201 Created)

#### User Login
- **POST** `/api/users/login`
  - Request body:
  ```json
  {
    "email": "string",
    "password": "string"
  }
- Authenticates a user and returns a token

#### Update user
- **PUT** `/api/user`

- Updates the current user's information
- Requires authentication
- Request body: Fields to be updated


#### Delete User
- **DELETE** `/user`
- Deletes the current user's account
- Requires authentication

### Team Management

#### Create Team
- **POST** `/team/register`
- Request body:
  ```json
  {
    "name": "string"
  }
- Creates a new team
 
#### Invite to Team
- **POST** `/team/invite`
- Request body:
  ```json
  {
    "teamId": "integer",
    "email": "string",
  }
- Invites a user to join a team

#### Get Team Members
- **GET** `/team/:id`
- Retrieves all members of a specific team


### Project Management

#### Create Project
- **POST** `/project`
- Creates a new project
- Request body:
  ```json
  {
    "teamId": "integer",
    "projectName": "string"
  }

### Task Management

#### Get All Tasks
- **GET** `/task`
- Retrieves all tasks

#### Create Task
- **POST** `/task/create`
- Creates a new task
- Requires authentication
- Request body:
  ```json
  {
    "title": "string",
    "description": "string",
    "status": "incomplete" "|" "completed" "optional",
    "dueDate": "YYYY-MM-DD",
    "projectId": "integer"
  }

#### Get Task
- **GET** `/task`
- Get all task of the user
- requires authentication

#### Update Task
- **PUT** `/task/update/:id`
- Updates an existing task
- requires authentication
- request body:
    ````json
    {
  "status": "incomplete" | "completed"
       }

#### Filter Tasks
- **GET** `/filterTask`
- Filters tasks based on specified criteria
- request query params:
    ````json
    {
  "status": "incomplete" | "completed"
       }

#### Search Tasks
- **GET** `/search`
- Searches for tasks based on a query
- Requires authentication
- Query parameter: q (search term)
- Response: Returns an array of matching task objects
- Status: 200 OK


#### Transfer Task
- **PUT** `/transferTask`
- Transfers a task to another user of the team thee task is assinged to
- Requires authentication
- Request body:
     jsonCopy{
  "email": "string",
  "taskId": integer
       }

- Response: Returns the updated task object
- Status: 200 OK

### Comment System

#### Get All Comments
- **GET** `/comment`
- Retrieves all comments

#### Create Comment
- **POST** `/comment`
- Adds a new comment

#### Delete Comment
- **DELETE** `/comment`
- Deletes a specific comment


### Attachment Handling

#### Get All Attachments
- **GET** `/attachment`
- Retrieves all attachments

#### Create Attachment
- **POST** `/attachment`
- Adds a new attachment

#### Delete Attachment
- **DELETE** `/attachment`
- Deletes a specific attachment

## Authentication

Most endpoints require authentication. Include the authentication token in the header of your requests for protected routes.

## Usage

1. Register a new user account
2. Login to get an authentication token
3. Use the token for authenticated requests
4. Create and manage teams, projects, and tasks
5. Add comments and attachments to tasks as needed

## Error Handling

The API uses appropriate HTTP status codes for different scenarios:
- 200 OK: Successful request
- 201 Created: Resource successfully created
- 400 Bad Request: Invalid input
- 401 Unauthorized: Authentication failed
- 403 Forbidden: User doesn't have necessary permissions
- 404 Not Found: Resource not found
- 500 Internal Server Error: Server-side error

For detailed error messages, check the response body.