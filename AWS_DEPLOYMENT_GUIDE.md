# AWS EC2 Deployment Guide - Skill India Connect

This guide outlines the steps to deploy the Skill India Connect application to an AWS EC2 instance using Docker Compose on a single EC2 server.

## Prerequisites

1. An AWS Account.
2. A generated Key Pair (.pem file) for EC2 SSH access.
3. Your GitHub repository URL (for cloning on EC2).

> **Note:** No third-party API keys are needed — AI features are powered by [Puter.js](https://js.puter.com/v2/) and handled entirely in the browser.

---

## Step 1: Launch an EC2 Instance

1. Log in to your AWS Management Console.
2. Go to the **EC2 Dashboard** and click **Launch Instance**.
3. **Name**: `SkillIndiaConnect-Server`.
4. **AMI**: Select **Ubuntu Server 22.04 LTS**.
5. **Instance Type**: Select **t2.micro** (Free tier eligible) or **t2.small** for better Docker performance.
6. **Key Pair**: Select an existing key pair or create a new one. Download the `.pem` file and keep it secure.
7. **Network Settings / Security Group — open these ports**:
   - Port **22** — SSH
   - Port **80** — HTTP
   - Port **5000** — Node.js backend (Custom TCP)
8. Click **Launch Instance**.

---

## Step 2: Connect to your EC2 Instance

```bash
# Set appropriate permissions for your key file (Mac/Linux only)
chmod 400 your-key.pem

# Connect using the public IP of your EC2 instance
ssh -i "your-key.pem" ubuntu@<YOUR_EC2_PUBLIC_IP>
```

On Windows (PowerShell):
```powershell
ssh -i "your-key.pem" ubuntu@<YOUR_EC2_PUBLIC_IP>
```

---

## Step 3: Install Docker and Docker Compose

Once connected to your Ubuntu instance, run:

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Docker
sudo apt install docker.io -y

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to the docker group
sudo usermod -aG docker ubuntu

# Install Docker Compose plugin
sudo apt install docker-compose-plugin -y

# Log out and back in for group changes to take effect
exit
```

Reconnect via SSH after logging out.

---

## Step 4: Push Code to GitHub & Clone on EC2

### On your local machine — push to GitHub:
```bash
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git
git push -u origin main
```

### On your EC2 instance — clone the repo:
```bash
git clone https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git
cd CA2-project
```

---

## Step 5: Configure Environment Variables on EC2

Navigate to the backend directory and create the `.env` file:

```bash
cd ~/CA2-project/backend
nano .env
```

Paste the following (no API keys needed):
```env
PORT=5000
MONGO_URI=mongodb://mongodb:27017/skillindiaconnect
PG_USER=postgres
PG_HOST=postgresdb
PG_DATABASE=skillindiaconnect
PG_PASSWORD=postgres
PG_PORT=5432
JWT_SECRET=your_super_secret_production_key
```

Press `Ctrl+O`, `Enter`, then `Ctrl+X` to save and exit.

---

## Step 6: Start the Application

```bash
# Go to the project root
cd ~/CA2-project

# Build and start all containers in detached mode
docker compose up -d --build

# Check container status
docker compose ps

# View logs if needed
docker compose logs backend
```

---

## Step 7: Update Frontend API URL

Since the frontend is served from a browser, update `frontend/js/api.js` to point to your EC2:

```javascript
const API_URL = 'http://<YOUR_EC2_PUBLIC_IP>:5000/api';
```

Commit and push this change, then on EC2:
```bash
git pull
```

---

## Step 8: Verify Deployment

1. Visit `http://<YOUR_EC2_PUBLIC_IP>:5000/` — should return `API is running...`
2. Open `frontend/index.html` locally or serve it from EC2 using Nginx.
3. Register/login and test the AI recommendations feature — it runs fully in the browser via Puter.js.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Containers failing to start | `docker compose logs backend` |
| MongoDB/Postgres not ready | Wait 10-15s, then `docker compose restart backend` |
| Port 5000 blocked | Check EC2 Security Group inbound rules |
| CORS errors on frontend | Ensure `API_URL` uses the EC2 public IP, not `localhost` |
| AI "Unauthorized" error | User needs to sign in with a free Puter account — normal behavior |
