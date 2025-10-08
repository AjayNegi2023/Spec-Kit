# Technical Research: Alumni Connect Portal MVP

## Authentication with json-server

**Decision**: Use json-server's built-in authentication with custom routes and local storage

**Rationale**:
- Simplest solution for MVP stage
- Matches constitution's requirement for simulated auth
- Easy to replace with real auth system later
- Supports basic login/logout flow

**Alternatives Considered**:
1. Firebase Auth - Rejected (external dependency)
2. Custom Express server - Rejected (overengineered for MVP)

## Frontend Framework Configuration

**Decision**: Vite + React + TypeScript with strict mode

**Rationale**:
- Vite provides excellent dev experience
- Built-in TypeScript support
- Fast hot module replacement
- Small bundle size

**Alternatives Considered**:
1. Create React App - Rejected (slower development experience)
2. Next.js - Rejected (too feature-rich for MVP needs)

## Styling Solution

**Decision**: Tailwind CSS with custom theme

**Rationale**:
- Rapid UI development
- Built-in responsive design
- No need for separate CSS files
- Easy to maintain consistency

**Alternatives Considered**:
1. Material-UI - Rejected (too opinionated)
2. CSS Modules - Rejected (more verbose for MVP needs)

## State Management

**Decision**: React Context + local state

**Rationale**:
- Sufficient for MVP needs
- Simple to implement
- Easy to understand
- No external dependencies

**Alternatives Considered**:
1. Redux - Rejected (overkill for MVP)
2. Zustand - Rejected (unnecessary complexity)

## Directory Search Implementation

**Decision**: Client-side search with json-server filtering

**Rationale**:
- Works well with small dataset
- No need for complex backend
- Instant results
- Easy to implement

**Alternatives Considered**:
1. Elasticsearch - Rejected (too complex for MVP)
2. Custom search API - Rejected (unnecessary for initial phase)