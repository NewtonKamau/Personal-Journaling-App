# Backend Service Platform

This is a backend service platform built with Express and TypeScript. It includes features for user management, journal entry management, data summary, and security. The application uses PostgreSQL as the relational database.

## Features

1. **User Management**
   - User registration and authentication (JWT-based).
   - Profile management.
   - User update and deletion.

2. **Journal Entry Management**
   - CRUD operations for journal entries.
   - Categorization of entries (e.g., Personal, Work, Travel).

3. **Data Summary**
   - Endpoints to fetch summary data for given periods (daily, weekly, monthly).

4. **Security**
   - All endpoints are secure and accessible only by authenticated users.

## Prerequisites

- Node.js (v14 or later)
- PostgreSQL
- npm (v6 or later)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/backend-service-platform.git
   cd backend-service-platform
## Install dependencies:

--npm install

## Run the application 
-  npx ts-node src/server.ts

## Set up environment variables:
Create a .env file in the root of the project and add the following variables:

DATABASE_URL=postgresql://your_user:your_password@localhost:5432/your_database
JWT_SECRET=your_jwt_secret

DB_USER=your_user
DB_HOST=localhost
DB_NAME=your_database
DB_PASSWORD=your_password
DB_PORT=5432
# create this tables in your postgres db
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE journal_entries (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

## API Endpoints
--User Management
--Register

# POST /api/users/register
Body: { "username": "your_username", "password": "your_password" }

# Login

POST /api/users/login
Body: { "username": "your_username", "password": "your_password" }

# Update User

 PUT /api/users
Headers: { "Authorization": "Bearer your_jwt_token" }
Body: { "username": "new_username", "password": "new_password" }

# Delete User

DELETE /api/users
Headers: { "Authorization": "Bearer your_jwt_token" }


## Journal Entry Management
# Create Entry

POST /api/journal/entries
Headers: { "Authorization": "Bearer your_jwt_token" }
Body: { "title": "Entry title", "content": "Entry content", "category": "Entry category" }
# Get Entries

GET /api/journal/entries
Headers: { "Authorization": "Bearer your_jwt_token" }

# Get Entry by ID

GET /api/journal/entries/:id
Headers: { "Authorization": "Bearer your_jwt_token" }

# Update Entry

PUT /api/journal/entries/:id
Headers: { "Authorization": "Bearer your_jwt_token" }
Body: { "title": "Updated title", "content": "Updated content", "category": "Updated category" }

# Delete Entry

DELETE /api/journal/entries/:id
Headers: { "Authorization": "Bearer your_jwt_token" }
Summary

# Get Summary
GET /api/summary
Headers: { "Authorization": "Bearer your_jwt_token" }
Query Parameters: ?period=daily or ?period=weekly or ?period=monthly


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

[MIT](https://choosealicense.com/licenses/mit/)