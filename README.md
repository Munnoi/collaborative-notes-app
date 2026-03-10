# Collaborative Notes App

A real-time collaborative note-taking application with user authentication, live editing via WebSockets, and public note sharing.

## Tech Stack

**Backend:** NestJS, TypeORM, PostgreSQL, Socket.IO, JWT (Passport.js)
**Frontend:** React 19, Vite, Tailwind CSS, React Router, Axios, socket.io-client

## Features

- **Authentication** — Register and login with email/password, JWT-based session management
- **Notes CRUD** — Create, read, update, and delete personal notes
- **Real-time Collaboration** — Live editing with WebSocket-powered sync (debounced at 300ms)
- **Public Sharing** — Share notes via public links without requiring authentication

## Prerequisites

- Node.js (v18+)
- PostgreSQL

## Getting Started

### 1. Set up the database

Create a PostgreSQL database named `notes_app`. The schema is auto-synced by TypeORM on startup.

### 2. Start the backend

```bash
cd backend
npm install
npm run start:dev
```

The API server runs on `http://localhost:3000`.

### 3. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The dev server proxies API requests (`/auth`, `/notes`, `/users`) to the backend.

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|---------------------|------|--------------------------|
| POST | /auth/register | No | Register a new user |
| POST | /auth/login | No | Login |
| GET | /users/me | Yes | Get current user |
| POST | /notes | Yes | Create a note |
| GET | /notes | Yes | List user's notes |
| GET | /notes/:id | Yes | Get a note |
| PATCH | /notes/:id | Yes | Update a note |
| DELETE | /notes/:id | Yes | Delete a note |
| GET | /notes/public/:id | No | View a public note |

### WebSocket Events

- `joinNote` / `leaveNote` — Join or leave a note editing room
- `editNote` — Broadcast edits to other connected clients
- `noteUpdated` — Receive real-time updates

## Project Structure

```
backend/src/
├── auth/          # Authentication (JWT, Passport)
├── notes/         # Notes module, service, controller, WebSocket gateway
├── users/         # Users module and service
└── app.module.ts  # App config and database connection

frontend/src/
├── api/           # Axios client with JWT interceptor
├── components/    # Reusable UI components
├── context/       # Auth context provider
├── hooks/         # WebSocket hook (useNoteSocket)
└── pages/         # Login, Register, Notes, NoteEdit, PublicNote
```
