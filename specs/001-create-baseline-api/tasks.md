# Tasks: Alumni Connect Portal MVP Implementation

**Input**: Design documents from `/specs/001-create-baseline-api/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Phase 1: Project Setup (Shared Infrastructure)

**Purpose**: Initialize frontend and backend projects with required dependencies

### Frontend Project Setup

- [ ] T001 Create Vite project
  ```bash
  npm create vite@latest frontend -- --template react-ts
  cd frontend
  npm install
  ```
  **Files**: `frontend/`
  **Acceptance**: Directory structure matches plan.md

- [ ] T002 [P] Install core dependencies
  ```bash
  npm install react-router-dom @types/react-router-dom axios
  ```
  **Files**: `frontend/package.json`
  **Acceptance**: Dependencies listed in package.json

- [ ] T003 [P] Configure TypeScript
  ```bash
  # Update tsconfig.json settings
  ```
  **Files**: `frontend/tsconfig.json`
  **Acceptance**: Strict mode enabled, path aliases configured

- [ ] T004 Install and configure Tailwind CSS
  ```bash
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```
  **Files**:
  - `frontend/tailwind.config.js`
  - `frontend/postcss.config.js`
  - `frontend/src/index.css`
  **Acceptance**: Tailwind classes work in components

- [ ] T005 [P] Add environment configuration
  **Files**: `frontend/.env`
  **Acceptance**: VITE_API_URL configured

### Backend Project Setup

- [ ] T006 Initialize backend project
  ```bash
  mkdir backend
  cd backend
  npm init -y
  ```
  **Files**: `backend/package.json`
  **Acceptance**: Package.json created with correct name

- [ ] T007 Install backend dependencies
  ```bash
  npm install json-server jsonwebtoken cors
  ```
  **Files**: `backend/package.json`
  **Acceptance**: Dependencies installed

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure required by all user stories

### Backend Foundation

- [ ] T008 Create initial database schema
  **Files**: `backend/db.json`
  ```json
  {
    "users": [],
    "profiles": [],
    "jobs": []
  }
  ```
  **Acceptance**: Valid JSON structure with required collections

- [ ] T009 Create server configuration
  **Files**: `backend/server.js`
  **Content**: Custom routes, JWT middleware, CORS setup
  **Acceptance**: Server starts without errors

- [ ] T010 Configure custom routes for authentication
  **Files**: `backend/routes.json`
  **Content**: Login/logout route mappings
  **Acceptance**: Routes map to correct endpoints

### Frontend Foundation

- [ ] T011 [P] Create API service utilities
  **Files**: `frontend/src/utils/api.ts`
  **Content**: Axios instance, auth interceptors
  **Acceptance**: API calls include auth token

- [ ] T012 [P] Set up routing configuration
  **Files**: `frontend/src/App.tsx`
  **Content**: Router setup with route definitions
  **Acceptance**: Basic routing works

- [ ] T013 Setup authentication context
  **Files**: 
  - `frontend/src/contexts/AuthContext.tsx`
  - `frontend/src/hooks/useAuth.ts`
  **Content**: Auth state management, login/logout methods
  **Acceptance**: Context provides auth state

## Phase 3: User Story 1 - Authentication Flow (Priority: P1)

**Goal**: Users can log in and access protected routes
**Independent Test**: Successful login redirects to dashboard

### Implementation

- [ ] T014 [P] Create login page component
  **Files**: `frontend/src/pages/Login.tsx`
  **Content**: Login form with email/password
  **Acceptance**: Form renders with validation

- [ ] T015 [P] Create auth service
  **Files**: `frontend/src/services/auth.ts`
  **Content**: Login/logout API methods
  **Acceptance**: POST /auth/login returns token

- [ ] T016 Implement protected route wrapper
  **Files**: `frontend/src/components/auth/ProtectedRoute.tsx`
  **Content**: Route guard with auth check
  **Acceptance**: Redirects unauthorized users

- [ ] T017 Create basic dashboard page
  **Files**: `frontend/src/pages/Dashboard.tsx`
  **Content**: Welcome message, navigation links
  **Acceptance**: Only accessible after login

**Checkpoint**: Authentication flow complete - users can log in and access protected routes

## Phase 4: User Story 2 - Alumni Directory (Priority: P1)

**Goal**: Users can view the alumni directory
**Independent Test**: Directory shows list of profiles

### Implementation

- [ ] T018 [P] Create profile service
  **Files**: `frontend/src/services/profiles.ts`
  **Content**: Methods to fetch profiles
  **Acceptance**: GET /profiles returns data

- [ ] T019 [P] Create profile card component
  **Files**: `frontend/src/components/profile/ProfileCard.tsx`
  **Content**: Profile display layout
  **Acceptance**: Renders profile data correctly

- [ ] T020 [P] Create directory search component
  **Files**: `frontend/src/components/directory/DirectorySearch.tsx`
  **Content**: Search input and filters
  **Acceptance**: Filters profile list

- [ ] T021 Create directory page
  **Files**: `frontend/src/pages/Directory.tsx`
  **Content**: Search and profile list
  **Acceptance**: Displays searchable profiles

**Checkpoint**: Directory browsing complete - users can view and search profiles

## Phase 5: User Story 3 - Profile Management (Priority: P1)

**Goal**: Users can view and edit their profiles
**Independent Test**: Profile changes are saved and displayed

### Implementation

- [ ] T022 [P] Create profile view component
  **Files**: `frontend/src/components/profile/ProfileView.tsx`
  **Content**: Read-only profile display
  **Acceptance**: Shows all profile fields

- [ ] T023 [P] Create profile edit form
  **Files**: `frontend/src/components/profile/ProfileForm.tsx`
  **Content**: Editable profile fields
  **Acceptance**: Form validation works

- [ ] T024 Create profile page
  **Files**: `frontend/src/pages/Profile.tsx`
  **Content**: View/edit modes, save handler
  **Acceptance**: PUT /profiles/:id saves changes

**Checkpoint**: Profile management complete - users can view and edit profiles

## Dependencies & Execution Order

### Phase Dependencies

1. Setup (Phase 1) → No dependencies
2. Foundation (Phase 2) → Requires Setup completion
3. Authentication (Phase 3) → Requires Foundation
4. Directory (Phase 4) → Requires Authentication
5. Profile (Phase 5) → Requires Directory

### Parallel Opportunities

Frontend tasks marked [P] can run in parallel:
```bash
# Phase 1 parallel tasks
T002: Install dependencies
T003: Configure TypeScript
T005: Add environment config

# Phase 2 parallel tasks
T011: API utilities
T012: Routing setup

# Phase 3 parallel tasks
T014: Login page
T015: Auth service

# Phase 4 parallel tasks
T018: Profile service
T019: Profile card
T020: Directory search

# Phase 5 parallel tasks
T022: Profile view
T023: Profile edit form
```

## Implementation Strategy

### MVP First (Authentication)
1. Complete Phase 1 + 2 (Setup & Foundation)
2. Complete Phase 3 (Authentication)
3. Verify login flow works
4. Deploy basic version

### Incremental Delivery
1. Add Directory browsing
2. Add Profile management
3. Test each feature independently

### Task Completion Rules
1. Frontend changes require successful build
2. Backend changes require API tests
3. Mark checkpoints complete before moving to next phase