🎓 Skill India Connect
Skill India Connect is a highly polished, enterprise-grade full-stack web application developed for advanced web systems training. It bridges the gap between learners, recruiters, and educational resources by combining real-time collaboration tools, modern glassmorphic designs, and browser-driven AI talent recommendations with dual-database persistence.

🌐 AWS Deployed Live API Endpoint: http://13.206.255.113/

🌟 Key Highlights & Features

🔐 1. Role-Based Access Control (RBAC)

Dedicated dashboard layouts and resource access scopes tailored to three distinct roles:

Learner: Discover tailored jobs, build profiles, apply for openings, track application status, and get AI learning recommendations.

Recruiter: Draft and manage job openings, view list of applications, and receive instant real-time alerts upon new submissions.

Administrator: Manage and edit courses, monitor systems logs, and govern platform configurations.

🤖 2. In-Browser AI Skill Recommendations

Integrates dynamic AI skill analysis powered by Puter.js running client-side. The AI evaluates a learner's existing skills against target careers and builds custom-tailored learning pathways instantly without needing complex backend key setups.

⚡ 3. Real-Time Event System

Incorporates standard bidirectional WebSocket communication via Socket.io. Recruiter dashboards receive zero-latency push notifications when applications are submitted, providing an interactive, live user experience.

🗄️ 4. Hybrid Dual-Database Architecture

Combines the advantages of Document-oriented and Relational databases under one application:

Database

Technology

Purpose / Use-Case

NoSQL

MongoDB (via Mongoose)

Houses highly dynamic, rich documents (User profiles, Job descriptions, Course materials, Applications).

SQL

PostgreSQL (via pg)

Manages structured database transactional history, analytical log reports, and platform metric logs for audit tracking.

🎨 5. Premium UI Design System

Built completely on pure Vanilla HTML5, CSS3, and ES6+ JavaScript. It features an elegant glassmorphism dashboard layout, vibrant modern gradients, micro-animations, fully responsive styling, and custom interactive dashboard cards.

🛠️ Advanced Technology Stack

Frontend: Vanilla CSS3 Custom Design System (custom grid, layout utilities, variable definitions), HTML5, Modern ES6+ JavaScript.

Backend: Node.js, Express.js.

Databases: MongoDB (Mongoose ORM), PostgreSQL (Raw Client Pool).

Real-time Layer: Socket.io.

Security & Authentication: JSON Web Tokens (JWT), password hashing via bcryptjs, Secure HTTP Headers (helmet), Input Validation (express-validator).

Infrastructure & DevOps: Docker, Docker Compose (Multi-container architecture), AWS EC2 Cloud Hosting.

📁 Repository Structure

CA2-project/
├── frontend/             # Premium Vanilla Web Application
│   ├── css/              # Customized Glassmorphic Design System
│   ├── js/               # API Clients, Authentication, and Socket Listeners
│   │   ├── api.js        # AWS/Local Endpoint Configuration
│   │   └── socket.js     # WebSocket Clients
│   └── *.html            # User/Recruiter/Admin Responsive Viewports
├── backend/              # Node.js & Express REST API Server
│   ├── config/           # Multi-database pool connections (Mongo & PG)
│   ├── controllers/      # Route Controllers & business logic
│   ├── middleware/       # JWT Authorization & Payload Validators
│   ├── models/           # Mongoose schemas for dynamic data models
│   ├── routes/           # REST endpoints mapping
│   ├── sockets/          # Socket.io notification dispatcher
│   ├── server.js         # API Server Bootloader & Express Setup
│   └── Dockerfile        # Highly optimized multi-stage Node build
├── docker-compose.yml    # Full local multi-container environment Orchestrator
├── README.md             # Top-tier developer guide and documentation
└── AWS_DEPLOYMENT_GUIDE.md # Thorough guide on launching in AWS EC2 instances

🚀 Local Deployment Instructions

Prerequisites

Make sure you have the following installed on your machine:

Docker Desktop (Highly Recommended)

Alternatively: Node.js (v16+), MongoDB Server, and PostgreSQL Server installed locally.

Method A: Docker Compose Orchestration (Recommended & Easiest)

Docker configures the entire stack (Node Backend, MongoDB, and PostgreSQL) automatically inside an isolated network.

Clone the Repository:

git clone https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git
cd CA2-project

Spin up the multi-container stack:

docker-compose up --build

Access the Application:

Backend API Status: http://localhost:5000 (Returns API is running...)

Frontend Client: Double-click and open frontend/index.html inside any modern browser.

Method B: Native Local Installation

If you prefer to run the servers directly on your machine:

Configure environment files:Navigate to the backend/ directory and configure your .env:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/skillindiaconnect
PG_USER=postgres
PG_HOST=localhost
PG_DATABASE=skillindiaconnect
PG_PASSWORD=your_postgres_password
PG_PORT=5432
JWT_SECRET=production_standard_jwt_secret_phrase

Install dependencies and seed the database:

cd backend
npm install
node seed.js     # Seeds courses, recruiters, learners, and admins

Boot the backend server:

npm start

Open the client interface:Launch frontend/index.html locally using a standard web browser.

☁️ Production Deployment on AWS EC2

This platform is architected to run perfectly in a distributed cloud environment. We deploy the entire stack using Docker containers inside a t2.micro or t2.small Ubuntu instance behind standard security groups.

[!TIP]For a detailed, step-by-step tutorial on launching, securing, and configuring your AWS EC2 instance, installing Docker, mapping host ports, and updating client routing endpoints, check out our comprehensive AWS EC2 Deployment Guide included in this repository.

🔒 Security Practices Built-in

HTTP Protection: Configured with helmet to mitigate clickjacking, cross-site scripting, and generic headers sniffing.

Token-Based Sessions: Stateless authentication using cryptographically signed JWT tokens with user data stored secure-scoped.

Validated Payload Schemes: Inputs are sanitized and strictly validated in middleware using express-validator.

Cross-Origin Requests: Robust CORS middleware configurations preventing unauthorized origin script requests.

🤝 Project Credits & Academic Scope

Developed as a high-tier project mapping onto Advanced Web Application architecture and modern DevOps infrastructure guidelines.
