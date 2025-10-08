# Implementation Plan: Alumni Connect Portal MVP

**Branch**: `001-create-baseline-api` | **Date**: 2025-10-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-create-baseline-api/spec.md`

## Summary

This plan outlines the implementation of the Alumni Connect Portal MVP, focusing on core features:
- User authentication (login/logout)
- Profile management (view/edit)
- Alumni directory browsing
- Job listings (read-only)

Technical approach:
- Frontend: React + TypeScript (Vite), Tailwind CSS
- Backend: json-server for API simulation
- Simple authentication using local storage
- Minimal, responsive UI design

## Technical Context

**Language/Version**: TypeScript 5.0+, Node.js 18+
**Primary Dependencies**: 
  - Frontend: React 18, Vite 4, Tailwind CSS 3
  - Backend: json-server 0.17+
**Storage**: JSON file (db.json)
**Testing**: Vitest + React Testing Library
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge)
**Project Type**: Web application (frontend + simulated backend)
**Performance Goals**: 
  - Page load < 3s
  - API response < 500ms
  - Search results < 1s
**Constraints**:
  - Local development only
  - No external authentication
  - No file uploads
  - No real-time features
**Scale/Scope**:
  - 5 main pages
  - ~15 React components
  - 8 API endpoints
  - Single JSON data store

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Minimalist Architecture
✅ Uses required tech stack (React, TypeScript, Vite, Tailwind)
✅ Focused on core MVP features only
✅ Each component has single responsibility

### II. Type Safety
✅ TypeScript with strict mode enabled
✅ Shared interface definitions
✅ OpenAPI documentation included

### III. Simulated Authentication
✅ Uses json-server for auth simulation
✅ Local storage for session management
✅ Isolated auth code for future replacement

### IV. User-First Design
✅ Intuitive navigation flow
✅ Responsive interface
✅ Core features only (profile, directory)

### V. Iterative Development
✅ Clear feature milestones
✅ Independent feature completion
✅ No breaking changes in MVP

**GATE STATUS**: ✅ PASS - All principles satisfied

## Project Structure

### Documentation (this feature)

```
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── profile/
│   │   │   ├── ProfileCard.tsx
│   │   │   ├── ProfileForm.tsx
│   │   │   └── ProfileView.tsx
│   │   ├── directory/
│   │   │   ├── DirectorySearch.tsx
│   │   │   └── DirectoryList.tsx
│   │   └── jobs/
│   │       ├── JobCard.tsx
│   │       └── JobList.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Directory.tsx
│   │   ├── Profile.tsx
│   │   └── Jobs.tsx
│   ├── services/
│   │   ├── auth.ts
│   │   ├── profiles.ts
│   │   └── jobs.ts
│   ├── types/
│   │   └── models.ts
│   └── utils/
│       └── api.ts
├── tests/
│   ├── components/
│   └── services/
└── package.json

backend/
├── db.json
├── server.js
└── routes.json

docs/
├── api/
│   └── openapi.yaml
└── README.md
```

**Structure Decision**: Web application split into frontend and backend:
- Frontend: Vite + React + TypeScript project with component-based architecture
- Backend: Simple json-server setup with custom routes
- Shared types for API interfaces
- Documentation for API and setup instructions

## Implementation Milestones

### 1. Project Setup (2 hours)
- Initialize Vite + React + TypeScript project (0.5h)
  ```bash
  npm create vite@latest frontend -- --template react-ts
  cd frontend
  npm install
  ```
- Add and configure Tailwind CSS (0.5h)
  ```bash
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```
- Setup ESLint and Prettier (0.5h)
- Initialize backend directory (0.5h)

### 2. Backend Setup (2 hours)
- Install json-server (0.25h)
  ```bash
  cd backend
  npm init -y
  npm install json-server
  ```
- Create initial db.json with sample data (1h)
- Configure custom routes for auth (0.5h)
- Add npm scripts for running server (0.25h)

### 3. Frontend Foundation (4 hours)
- Set up React Router (0.5h)
- Create page components scaffolding (1h)
- Implement base layout and navigation (1h)
- Add authentication context and hooks (1.5h)

### 4. Authentication Implementation (3 hours)
- Create login page UI (1h)
- Implement auth service with json-server (1h)
- Add protected route wrapper (0.5h)
- Handle login/logout flow (0.5h)

### 5. Directory & Profiles (4 hours)
- Create profile components (1.5h)
- Implement directory search and list (1.5h)
- Add profile editing functionality (1h)

### 6. Job Board (2 hours)
- Create job list and detail components (1h)
- Implement job service and data loading (1h)

### 7. Polish & Documentation (3 hours)
- Add loading and error states (1h)
- Implement responsive design fixes (1h)
- Create README with setup instructions (1h)

Total Estimated Time: 20 hours

## Development Guidelines

### Code Style
- Use functional components with hooks
- Implement proper TypeScript types
- Follow Tailwind CSS best practices
- Use proper error boundaries

### Testing Strategy
- Unit tests for services
- Component tests for key features
- Integration tests for auth flow

### Security Considerations
- Validate all user input
- Sanitize data in templates
- Implement proper auth checks
- Handle errors gracefully
