# Task Manager API

A simple Task Manager built with Node.js. Data is stored in an in-memory array (no database), so it resets when the server restarts.

## Setup

```bash
npm install
```

## Part A: CLI tool

```bash
node cli.js "Buy groceries"
# Task created: Buy groceries
```

## Part B: Core http server (port 3001)

```bash
npm run http
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message | 
| GET | `/about` | App info |
| GET | `/tasks` | List tasks |
| POST | `/tasks` | Create a task |

## Parts C & D: Express API (port 3000)

```bash
npm start
```

Base URL: `http://localhost:3000/api/v1`

| Method | Endpoint | Description | Success | Errors |
|--------|----------|-------------|---------|--------|
| GET | `/tasks` | Get all tasks | 200 | |
| GET | `/tasks/:id` | Get one task | 200 | 404 |
| POST | `/tasks` | Create a task | 201 | 400 |
| PUT | `/tasks/:id` | Update a task | 200 | 400, 404 |
| DELETE | `/tasks/:id` | Delete a task | 200 | 404 |

### Task object

```json
{ "id": 1, "title": "Learn Express", "completed": false }
```

### Examples

**POST /api/v1/tasks**
```json
{ "title": "Write README", "completed": false }
```

**PUT /api/v1/tasks/1** (both fields required)
```json
{ "title": "Learn Express deeply", "completed": true }
```

### Status codes

- `200 OK`: successful GET, PUT, DELETE
- `201 Created`: task created
- `400 Bad Request`: missing or invalid fields, or malformed JSON
- `404 Not Found`: task or route does not exist
