# AWS EC2 Deployment Guide - Skill India Connect

This guide outlines the steps to deploy the Skill India Connect application to an AWS EC2 instance. This approach uses Docker Compose to easily spin up the application and databases on a single EC2 server, suitable for an academic project.

## Prerequisites

1. An AWS Account.
2. A generated Key Pair (.pem file) for EC2 SSH access.
3. Your OpenAI API Key.

---

## Step 1: Launch an EC2 Instance

1. Log in to your AWS Management Console.
2. Go to the **EC2 Dashboard** and click **Launch Instance**.
3. **Name**: `SkillIndiaConnect-Server`.
4. **AMI**: Select **Ubuntu Server 22.04 LTS**.
5. **Instance Type**: Select **t2.micro** (Free tier eligible) or **t2.small** if you need more resources for Docker.
6. **Key Pair**: Select an existing key pair or create a new one. Download the `.pem` file and keep it secure.
7. **Network Settings**:
   - Allow SSH traffic from anywhere (Port 22).
   - Allow HTTP traffic from the internet (Port 80).
   - Allow Custom TCP Port `5000` (for our Node.js backend).
8. Click **Launch Instance**.

---

## Step 2: Connect to your EC2 Instance

Open your terminal or command prompt and use SSH to connect:

```bash
# Set appropriate permissions for your key file (Mac/Linux only)
chmod 400 your-key.pem

# Connect using the public IP of your EC2 instance
ssh -i "your-key.pem" ubuntu@<YOUR_EC2_PUBLIC_IP>
```

---

## Step 3: Install Docker and Docker Compose

Once connected to your Ubuntu instance, run the following commands to install Docker:

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Docker
sudo apt install docker.io -y

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to the docker group (avoids needing sudo for docker commands)
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo apt install docker-compose -y
```
*Note: You may need to log out and log back in (or `exit` and reconnect via SSH) for the user group changes to take effect.*

---

## Step 4: Transfer Project Files to EC2

You can use `git` or `scp` to get your project files onto the server.

### Option A: Using Git (Recommended)
1. Push your code to a GitHub repository.
2. On your EC2 instance, clone the repository:
```bash
git clone <YOUR_REPO_URL>
cd CA2-project
```

### Option B: Using SCP
From your local machine terminal:
```bash
scp -i "your-key.pem" -r ./CA2-project ubuntu@<YOUR_EC2_PUBLIC_IP>:~/CA2-project
```

---

## Step 5: Configure Environment Variables

1. Navigate to the backend directory:
```bash
cd ~/CA2-project/backend
```

2. Create a `.env` file (if it wasn't transferred) and populate it with production values:
```bash
nano .env
```

Paste the following (replace the OpenAI key):
```env
PORT=5000
MONGO_URI=mongodb://mongodb:27017/skillindiaconnect
PG_USER=postgres
PG_HOST=postgresdb
PG_DATABASE=skillindiaconnect
PG_PASSWORD=postgres
PG_PORT=5432
JWT_SECRET=your_super_secret_production_key
OPENAI_API_KEY=sk-your-actual-openai-api-key
```
Press `Ctrl+O`, `Enter`, and `Ctrl+X` to save and exit.

---

## Step 6: Start the Application

1. Go back to the root directory where `docker-compose.yml` is located:
```bash
cd ~/CA2-project
```

2. Run Docker Compose to build and start the containers in detached mode:
```bash
docker-compose up -d --build
```

3. Check the status of your containers:
```bash
docker-compose ps
```

---

## Step 7: Update Frontend API URL (If necessary)

Currently, the frontend uses `http://localhost:5000/api`. If you are accessing the frontend files directly from your local machine but want them to talk to your deployed AWS backend, you need to change this.

1. Open `frontend/js/api.js` on your local machine.
2. Change the `API_URL`:
```javascript
const API_URL = 'http://<YOUR_EC2_PUBLIC_IP>:5000/api';
```

*(Note: For a fully production-ready app, you would serve the frontend files using a web server like Nginx on the same EC2 instance, but for an academic project, opening the HTML files locally while pointing to the AWS backend is acceptable).*

---

## Step 8: Verify Deployment

1. Open your browser and navigate to `http://<YOUR_EC2_PUBLIC_IP>:5000/` to ensure the backend is running (should say "API is running...").
2. Open your local `frontend/index.html` file, register a user, and ensure it connects successfully to the AWS-hosted backend.

---

## Troubleshooting

- **Containers failing to start?** View logs using `docker-compose logs backend`.
- **Database Connection Error?** Ensure MongoDB and Postgres containers have started fully before the backend tries to connect. Docker-compose handles this usually, but checking logs helps.
- **Port 5000 blocked?** Double-check your EC2 Security Group inbound rules to ensure custom TCP port 5000 is open to `0.0.0.0/0`.
