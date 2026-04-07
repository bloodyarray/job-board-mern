#  Job Board MERN App

##  Overview

This is a full-stack **Job Board application** built using the MERN stack:

* MongoDB
* Express.js
* React (Vite)
* Node.js

The application allows users to:

* Register and login
* Create, view, update, and delete job applications
* Filter and search jobs
* Manage their personal job dashboard

---

##  Features

###  Authentication

* Register and login with JWT
* Password hashing using bcrypt
* Protected routes

###  Jobs Management

* Create job
* View all jobs
* Update job
* Delete job

###  Filters & Search

* Filter by status (pending, interview, declined)
* Filter by job type (full-time, part-time, remote)
* Search by position
* Sort jobs (latest, oldest, a-z, z-a)
* Pagination support

###  Frontend

* React + Vite
* Protected routes
* Dashboard layout
* Purple-dark UI design
* Edit job functionality

---

## 🛠 Tech Stack

### Backend:

* Node.js
* Express
* MongoDB (Mongoose)
* JWT (jsonwebtoken)
* bcryptjs

### Frontend:

* React (Vite)
* React Router v6
* Axios

---

##  Project Structure

```bash
job-board-mern/
  client/     # React frontend
  server/     # Express backend
```

---

## ⚙ Setup & Installation

### 1. Clone repository

```bash
git clone https://github.com/your-username/job-board-mern.git
cd job-board-mern
```

---

### 2. Install dependencies

#### Backend:

```bash
cd server
npm install
```

#### Frontend:

```bash
cd client
npm install
```

---

### 3. Environment variables

Create `.env` file inside `server/`:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 4. Run the app

#### Backend:

```bash
cd server
npm run dev
```

#### Frontend:

```bash
cd client
npm run dev
```

---

##  API Routes

### Auth

* `POST /api/v1/auth/register`
* `POST /api/v1/auth/login`

### Jobs

* `GET /api/v1/jobs`
* `POST /api/v1/jobs`
* `PATCH /api/v1/jobs/:id`
* `DELETE /api/v1/jobs/:id`

---

##  Screens

* Landing page
* Login/Register page
* Dashboard
* All Jobs
* Add/Edit Job
* Profile

---

##  Notes

* JWT is stored in localStorage
* All job routes are protected
* Each user can manage only their own jobs

---

##  Deployment

You can deploy the app using:

* Backend → Render
* Frontend → Vercel / Netlify

---

##  Author

Created by **Dmytro Katunkin**

---

##  Result

This project demonstrates full MERN stack development including:

* Authentication
* REST API
* CRUD operations
* React frontend with routing and state management

