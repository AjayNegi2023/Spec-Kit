# Alumni Connect Portal - Quickstart Guide

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- Git

## Setup

1. Clone the repository and navigate to the project:
```bash
git clone [repository-url]
cd alumni-connect-portal
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

## Development

1. Start the backend server (from backend directory):
```bash
npm run server
# Runs on http://localhost:3000
```

2. Start the frontend development server (from frontend directory):
```bash
npm run dev
# Runs on http://localhost:5173
```

## Test Users

The system comes with pre-configured test users:

```json
{
  "email": "alumni@test.com",
  "password": "test123",
  "role": "alumni"
}

{
  "email": "student@test.com",
  "password": "test123",
  "role": "student"
}
```

## Available Scripts

### Frontend

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run test`: Run tests
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

### Backend

- `npm run server`: Start json-server
- `npm run server:watch`: Start with auto-reload

## Project Structure

- `frontend/`: React + TypeScript application
  - `src/components/`: Reusable UI components
  - `src/pages/`: Page components
  - `src/services/`: API and auth services
  - `src/types/`: TypeScript definitions

- `backend/`: json-server backend
  - `db.json`: Database file
  - `routes.json`: Custom routes
  - `server.js`: Server configuration

## Development Guidelines

1. Keep components small and focused
2. Use TypeScript for all new code
3. Follow the established file structure
4. Write tests for critical functionality

## Common Tasks

### Adding a New Component

1. Create component in appropriate directory
2. Create test file
3. Add to index export
4. Use in pages/other components

### Modifying the Database

1. Stop the server
2. Edit `backend/db.json`
3. Restart the server

## Troubleshooting

### Common Issues

1. "Module not found" errors:
   - Check if all dependencies are installed
   - Run `npm install` in both frontend and backend

2. TypeScript errors:
   - Ensure proper types are imported
   - Check `tsconfig.json` settings

3. API errors:
   - Verify backend server is running
   - Check frontend API URL configuration
   - Verify correct auth token in requests