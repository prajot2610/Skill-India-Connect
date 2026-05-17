# Skill India Connect

Skill India Connect is a comprehensive full-stack web application designed for an Advanced Web Development syllabus. It provides a platform connecting learners, recruiters, and educational resources, featuring AI-powered skill recommendations and real-time notifications.

## 🚀 Features

- **Role-Based Access Control**: Separate dashboards and permissions for Learners, Recruiters, and Admins.
- **Job Portal**: Recruiters can post jobs; Learners can apply.
- **Course Management**: Admins can create premium courses for users to enroll.
- **Real-time Notifications**: Recruiters receive instant socket-based notifications when a learner applies for a job.
- **AI Skill Recommendations**: Integrates with OpenAI to analyze a user's current skills and recommend personalized learning paths.
- **Dual Database Architecture**: 
  - MongoDB handles dynamic content (Users, Jobs, Courses).
  - PostgreSQL handles structured analytic reporting logs.
- **Premium UI**: Built with pure HTML/CSS/JS focusing on modern aesthetics, glassmorphism, and responsive design.

## 🛠️ Tech Stack

**Frontend**
- HTML5
- CSS3 (Vanilla, custom design system)
- JavaScript (Vanilla, ES6+)

**Backend**
- Node.js & Express.js
- MongoDB (Mongoose ORM)
- PostgreSQL (pg)
- Socket.IO (Real-time events)
- JWT (JSON Web Tokens for Auth)
- express-validator & helmet for security

**DevOps**
- Docker & Docker Compose
- AWS EC2 (Deployment targeted)

## 📁 Project Structure

```
CA2-project/
├── frontend/             # Vanilla frontend application
│   ├── css/              # Premium styling
│   ├── js/               # API, Auth, and Socket logic
│   └── *.html            # User interfaces
├── backend/              # Node.js backend application
│   ├── config/           # Database configurations (Mongo & PG)
│   ├── controllers/      # Route logic and AI integration
│   ├── middleware/       # JWT Auth and Validation
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express API endpoints
│   ├── sockets/          # Socket.io notification logic
│   ├── server.js         # Entry point
│   └── Dockerfile        # Backend container definition
├── docker-compose.yml    # Multi-container orchestration
├── README.md             # Project documentation
└── AWS_DEPLOYMENT.md     # Guide for AWS EC2 hosting
```

## 💻 Local Setup Instructions

### 1. Prerequisites
Ensure you have the following installed:
- Node.js (v16+)
- Docker Desktop (If running via containers)
- MongoDB & PostgreSQL (If running without Docker)

### 2. Environment Setup
Navigate to the `backend/` folder and create a `.env` file based on `.env.example` (or use the existing one):
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/skillindiaconnect
PG_USER=postgres
PG_HOST=localhost
PG_DATABASE=skillindiaconnect
PG_PASSWORD=postgres
PG_PORT=5432
JWT_SECRET=supersecretjwtkey_for_academic_project
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Running with Docker (Recommended)
From the root directory, simply run:
```bash
docker-compose up --build
```
This will start the backend, MongoDB, and PostgreSQL simultaneously.

### 4. Running Without Docker
If you prefer running services locally:
1. Ensure local MongoDB and PostgreSQL servers are running.
2. In the `backend` folder, run:
   ```bash
   npm install
   npm start
   ```

### 5. Accessing the Application
- **Backend API**: `http://localhost:5000`
- **Frontend**: Simply open `frontend/index.html` in your web browser. (No build step required).

## ☁️ Deployment

For deployment instructions on AWS EC2, please refer to the `AWS_DEPLOYMENT_GUIDE.md` included in this repository.
