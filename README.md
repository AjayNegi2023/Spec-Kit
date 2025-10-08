# Spec-Kit Project

## Overview
Spec-Kit is a specification management system built with React, TypeScript, and JSON Server. It provides a user-friendly interface for managing and organizing technical specifications.

## Project Structure
```
spec-kit/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/    # API services
│   │   └── types/       # TypeScript interfaces
│   └── package.json
└── backend/          # JSON Server backend
    ├── db.json       # Database file
    ├── server.js     # Server configuration
    └── package.json
```

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```
   The server will run on http://localhost:3000

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at http://localhost:5173

## Features
- User Authentication
- Profile Management
- Specification Directory
- CRUD Operations for Specifications
- Role-based Access Control

## API Endpoints

### Authentication
- POST /auth/login
- POST /auth/logout

### Profiles
- GET /profiles
- GET /profiles/:id
- PUT /profiles/:id

### Directory
- GET /directory
- POST /directory
- PUT /directory/:id
- DELETE /directory/:id

### Specifications
- GET /specifications
- POST /specifications
- PUT /specifications/:id
- DELETE /specifications/:id

## Development
- Backend uses json-server with JWT authentication
- Frontend built with React 18, TypeScript, and Vite
- Styling implemented with Tailwind CSS
- State management with React Context API

## Testing
TODO: Add testing instructions

## Contributing
TODO: Add contribution guidelines