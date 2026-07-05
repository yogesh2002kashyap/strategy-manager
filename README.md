# Strategy Manager

A full-stack MERN application for managing microservice decoupling strategies.

## Overview

This project includes a React frontend and an Express/MongoDB backend for creating, viewing, editing, searching, and deleting strategy records.

## Features

- Responsive internal dashboard
- CRUD operations for strategies
- Local search by strategy name, service name, or owner
- Client-side validation and accessible forms
- Loading, empty, and error states
- Production-ready API with validation and XSS sanitization

## Tech Stack

- React + Vite
- React Router
- Axios
- Express
- MongoDB Atlas
- Mongoose

## Folder Structure

- frontend/
- backend/
- postman/

## Environment Variables

### Frontend

- VITE_API_URL: deployed backend URL (for example, https://strategy-manager-l2pz.onrender.com/api)

### Backend

- PORT: server port
- MONGO_URI: MongoDB Atlas connection string
- NODE_ENV: environment name

## Local Development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

## Deployment

- Frontend: Vercel
- Backend: Render

## Live URLs

- Frontend: https://strategy-manager-iota.vercel.app
- Backend: https://strategy-manager-l2pz.onrender.com

## API Overview

- GET /api/health
- GET /api/strategies
- POST /api/strategies
- PUT /api/strategies/:id
- DELETE /api/strategies/:id