# DevFlow Frontend

Modern React frontend for **DevFlow**, a full-stack issue tracking and project management platform.

The frontend provides dashboards, project management, issue tracking, collaboration tools, notifications, analytics and real-time updates.

---

## Features

- JWT Authentication
- Dashboard
- Dashboard Analytics
- Project Management
- Project Members
- Issue Tracking
- Issue Assignment
- Issue Status Management
- Issue Search
- Issue Filters
- Issue Comments
- Activity Timeline
- Notifications
- User Profiles
- Real-Time Updates
- Responsive UI

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React | UI |
| Vite | Frontend tooling |
| Axios | API communication |
| React Router | Client-side routing |
| Tailwind CSS | Styling |
| Recharts | Data visualization |
| Socket.IO Client | Real-time communication |

---

## Application Architecture

```text
                    ┌──────────────────┐
                    │   React Frontend │
                    └────────┬─────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
        ┌────────────┐               ┌──────────────┐
        │   Axios    │               │ Socket.IO    │
        │ REST API   │               │    Client    │
        └─────┬──────┘               └──────┬───────┘
              │                             │
              ▼                             ▼
        Express API                  Socket.IO Server
              │                             │
              └──────────────┬──────────────┘
                             ▼
                       MySQL Database
```

---

## UI Design

DevFlow uses a minimal interface with a custom visual identity.

### Color Palette

- DeepForest `#102C26`
- Champagne `#F7E7CE`

### Typography

- Headings: Unbounded
- Body: Spectral

---

## Screenshots

Screenshots of the completed application will be added here.

Recommended screenshots:

- Login
- Dashboard
- Projects
- Issues
- Issue details
- Notifications
- Analytics
- User profile

Example:

```markdown
![DevFlow Dashboard](docs/screenshots/dashboard.png)
```

---

## Local Setup

### Prerequisites

- Node.js
- npm
- DevFlow backend running locally

### 1. Clone the repository

```bash
git clone <YOUR_FRONTEND_REPOSITORY_URL>
cd devflow-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the backend URL

Create the appropriate environment file for your local environment.

Example:

```env
VITE_API_URL=http://localhost:2005/api/v1
```

The exact frontend environment variables should match the configuration used by the application.

### 4. Start the development server

```bash
npm run dev
```

The frontend runs locally at:

```text
http://localhost:5173
```

---

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Backend

The frontend communicates with the DevFlow Express backend.

Backend repository:

```text
<YOUR_BACKEND_REPOSITORY_URL>
```

Backend API:

```text
http://localhost:2005
```

Swagger documentation:

```text
http://localhost:2005/api-docs
```

---

## Authentication

The frontend communicates with the backend authentication system using JWT access tokens and refresh-token authentication.

```text
Login
  │
  ▼
Express API
  │
  ├── Access Token
  │
  └── Refresh Token
          │
          ▼
     HTTP-only Cookie
```

Google OAuth is also supported by the backend.

---

## Real-Time Updates

DevFlow uses Socket.IO Client to receive real-time application events.

```text
React Application
       │
       │ Socket.IO
       ▼
Socket.IO Server
       │
       ▼
DevFlow Backend
```

This enables real-time updates for supported application events.

---

## Project Structure

```text
devflow-frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── context/
│   ├── hooks/
│   └── ...
│
├── public/
├── docs/
├── package.json
├── vite.config.*
└── README.md
```

---

## Why I Built DevFlow

DevFlow was built as a practical full-stack project to understand how a modern frontend communicates with a production-style backend.

The project goes beyond basic CRUD interfaces by combining authentication, role-based access, project management, issue tracking, analytics, real-time communication and responsive UI design.

---

## What I Learned

Through the frontend development of DevFlow, I gained practical experience with:

- Building React applications with Vite
- Designing reusable UI components
- Managing client-side routing
- Integrating REST APIs with Axios
- Handling authentication flows
- Working with protected application routes
- Building dashboards and data visualizations
- Implementing real-time communication
- Managing application state
- Designing responsive interfaces
- Connecting frontend features with backend authorization

---

## Future Improvements

- Production deployment
- Improved accessibility
- More advanced dashboard visualizations
- Additional real-time interactions
- Progressive Web App support
- Further UI performance optimization

---

## Project Status

DevFlow is an actively developed full-stack project.

The frontend currently provides the main interface for authentication, dashboards, projects, issues, collaboration, notifications, analytics and real-time updates.

---

## License

MIT
