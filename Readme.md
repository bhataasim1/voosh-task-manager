## Voosh Task Manager
Voosh Task Manager is a simple task manager that allows you to create, edit, and delete tasks. It is built using React and Nodejs. The application is responsive and works on all devices.

## Features
- Create a task
- Edit a task
- Delete a task
- Drag and drop Feature (automatically updates the status of the task)
- Responsive design

## Technologies Used
- React
- Nodejs
- Express
- PostgreSQL
- Shadcn UI
- Supabase
- Prisma

## Installation
1. Clone the repository.
2. It contains the server and client folders.
3. Setup the server by running the following commands:
    - `cd server`
    - `pnpm install`
    - `pnpm run dev`
4. Setup the client by running the following commands:
    - `cd client`
    - `pnpm install`
    - `pnpm run dev`
5. Open your browser and visit `http://localhost:5137`

## Server Environment Variables
- DATABASE_URL="postgresql://postgres:password@localhost:5432/voosh"
- PORT=3000
- HOST="http://localhost"
- GOOGLE_CLIENT_ID="your-google-client-id"
- GOOGLE_CLIENT_SECRET="your-google-client-secret"
- GOOGLE_REDIRECT_URI="http://localhost:3000/api/auth/google/callback"
- JWT_SECRET="randomsecret"


## Client Environment Variables
- VITE_BACKEND_URL = "http://localhost:3000"
