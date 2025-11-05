#  Node.js Application Deployment using Jenkins (Master–Slave Setup)

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Jenkins](https://img.shields.io/badge/Jenkins-Automation-blue)
![AWS](https://img.shields.io/badge/AWS-Cloud-orange)
![Node.js](https://img.shields.io/badge/Node.js-v18+-success)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

This project demonstrates a **CI/CD pipeline** for deploying a simple **Node.js application** using **Jenkins**, configured with a **master and slave (node) server architecture**.
The pipeline automates cloning the repository, transferring files to the EC2 instance, installing dependencies, and starting the app with **PM2**.

---

##  Project Overview

This project automates deployment of a Node.js app using a Jenkins pipeline on AWS EC2 servers.

### Key Highlights

* Jenkins **Master–Slave setup** for distributed build and deployment.
* Automated **CI/CD pipeline** using Jenkinsfile.
* Node.js application managed with **PM2** process manager.
* Secure file transfer and command execution via **SSH Agent plugin**.

---

##  Architecture Diagram

```
Developer → GitHub Repo → Jenkins Master → Jenkins Node (EC2) → Node.js App Running via PM2
```

---

##  Tech Stack

| Component            | Description                                 |
| -------------------- | ------------------------------------------- |
| **Jenkins**          | CI/CD automation tool                       |
| **GitHub**           | Source code repository                      |
| **Node.js**          | Application runtime                         |
| **PM2**              | Process manager for Node.js                 |
| **AWS EC2**          | Virtual machines for Jenkins Master & Slave |
| **SSH Agent Plugin** | Used for secure remote operations           |

---

##  Repository Structure

```
node-app/
│
├── app.js              # Node.js application entry point
├── package.json        # Project dependencies
├── jenkinsfile         # Jenkins pipeline definition
├── README.md           # Project documentation
└── ...
```

---

##  Installation & Setup Guide

### 1️⃣ Launch EC2 Instances

* Create **2 EC2 instances** (Ubuntu 22.04 LTS recommended):

  * Jenkins Master
  * Jenkins Slave (Node)

### 2️⃣ Install Jenkins on Master

```bash
sudo apt update -y
sudo apt install openjdk-11-jdk -y
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update -y
sudo apt install jenkins -y
sudo systemctl enable jenkins
sudo systemctl start jenkins
```

### 3️⃣ Install Node.js and PM2 on Slave Node

```bash
sudo apt update -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

### 4️⃣ Connect Slave Node to Jenkins Master

* In Jenkins UI → **Manage Jenkins → Manage Nodes → New Node**.
* Select **Permanent Agent** and configure:

  * Remote root directory: `/home/ubuntu/jenkins-node`
  * Launch method: **Launch agents via SSH**.
* Add EC2 key under **Manage Credentials → SSH Username with Private Key**.

### 5️⃣ Verify Connection

```bash
# From Jenkins master, test connection to node:
ssh -i your-key.pem ubuntu@<Slave-IP>
```

If it connects successfully → Jenkins node is ready.

### 6️⃣ Jenkinsfile Pipeline Steps

1. **Checkout SCM** – Pulls code from GitHub.
2. **Clone Repository** – Fetches latest project files.
3. **Upload Files** – Transfers files to EC2 using SSH.
4. **Install Dependencies & Start App** – Installs Node.js packages and runs with PM2.

---

##  Jenkins Console Output Summary

 **Build #2** (5 Nov 2025, 08:15:36)

* Repository: [https://github.com/AishwaryaPawar149/node-app](https://github.com/AishwaryaPawar149/node-app)
* Revision: `1f5ff1fccbcf4abdc2a63da3961d9b49003a8b57`
* Duration: **8.3s**
* Status: **SUCCESS**
* Deployed on: `172.31.11.37`
* PM2 Process: `node-app` (Online )

---

##  What You’ll Learn

* Configure **Master–Slave Jenkins setup** on AWS.
* Use **Declarative Jenkins Pipeline** syntax.
* Automate SSH-based deployments.
* Manage Node.js with PM2.

---

##  Useful Commands

```bash
# PM2 Commands
pm2 start app.js --name node-app
pm2 restart node-app
pm2 stop node-app
pm2 list

# Check Node.js & Jenkins Versions
node -v
npm -v
java -version
```

---

##  How CI/CD Works (Simplified Flow)

```
+-------------+       +-------------+       +-------------+       +------------+
|   Developer | --->  |   GitHub    | --->  | Jenkins CI  | --->  | EC2 Deploy |
+-------------+       +-------------+       +-------------+       +------------+
        |                    |                     |                     |
        +----> Commit Code --+                     |                     |
                            Jenkins Pulls Repo ----+                     |
                                                   SSH + PM2 Deployment --+
```

---

##  Troubleshooting Tips

| Issue                        | Possible Fix                                           |
| ---------------------------- | ------------------------------------------------------ |
| Jenkins slave not connecting | Check port 22 open, verify key permissions (chmod 400) |
| PM2 not found                | Run `sudo npm install -g pm2`                          |
| Permission denied            | Use correct `ubuntu` user & private key                |
| Build fails                  | Check Jenkinsfile syntax or missing credentials        |

---

##  Build Details

| Detail              | Description                    |
| ------------------- | ------------------------------ |
| **Build Trigger**   | Manual by *Aishwarya Pawar*    |
| **Build Result**    | ✅ SUCCESS                      |
| **Build Time**      | 8.3 seconds                    |
| **Node Server IP**  | 172.31.11.37                   |
| **Deployment Path** | /home/ubuntu/node-app          |
| **Deployed By**     | Jenkins Pipeline via SSH Agent |

---

##  Repository Link

🔗 [GitHub: AishwaryaPawar149/node-app](https://github.com/AishwaryaPawar149/node-app)

---

##  Author

**Aishwarya Pawar**
Cloud & DevOps | AWS | Jenkins | Node.js
 *Build completed on: 5 Nov 2025*

---

###  Application Deployed Successfully!
