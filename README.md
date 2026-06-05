# DockerForge

DockerForge is a Docker Automation Platform that analyzes a public GitHub repository, generates a Dockerfile, builds a Docker image, runs a container, captures build/runtime logs, performs health verification, and displays the results through a web interface.

---

# Overview

The goal of DockerForge is to automate the process of containerizing existing GitHub repositories.

The system:

* Accepts a public GitHub repository URL
* Clones and analyzes the repository
* Generates a Dockerfile automatically
* Builds a Docker image
* Runs the generated container
* Captures build and runtime logs
* Performs health verification
* Retries failed builds (up to 3 attempts)
* Displays results in the UI

---

# Architecture

```text
User
  │
  ▼
React Frontend
  │
  ▼
Express Backend API
  │
  ▼
Git Repository Cloner
  │
  ▼
Repository Scanner
  │
  ▼
Dockerfile Generator
  │
  ▼
Docker Build Engine
  │
  ▼
Retry Engine (Max 3 Attempts)
  │
  ▼
Docker Runtime
  │
  ▼
Health Verification
  │
  ▼
Result Display
```

---

# Features

* GitHub Repository URL Input
* Automatic Repository Cloning
* Repository Structure Analysis
* Dockerfile Generation
* Docker Image Build
* Build Log Capture
* Docker Container Execution
* Runtime Log Capture
* Health Verification
* Build Retry Mechanism (3 Attempts)
* Common Dockerfile Error Fixes
* Frontend Dashboard
* Error Handling and Reporting

---

# Dockerfile Generation Strategy

DockerForge uses repository inspection and rule-based analysis.

The system scans:

* package.json
* package-lock.json
* start scripts
* main entry file
* repository structure

Based on detected files and scripts, DockerForge generates an appropriate Dockerfile.

Example:

```dockerfile
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]
```

Generated Dockerfiles are validated through actual Docker build and runtime execution.

---

# Retry Mechanism

If a Docker build fails:

1. Build logs are captured.
2. Common issues are detected.
3. Dockerfile fixes are applied.
4. Build is retried.
5. Maximum retry count = 3.

Currently supported fixes:

* Missing index.js
* Missing start script
* Incorrect entry file selection

---

# Technology Stack

## Frontend

* React.js
* Axios

## Backend

* Node.js
* Express.js

## Docker

* Docker Engine
* Docker CLI

## Utilities

* simple-git
* fs-extra
* child_process

---

# Project Structure

```text
DockerForge

├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── services
│   ├── tempRepos
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# Workflow

## Step 1

User enters a GitHub repository URL.

Example:

```text
https://github.com/bezkoder/node-express-mongodb
```

## Step 2

Repository is cloned locally.

## Step 3

Repository files are scanned and analyzed.

Detected files may include:

```text
package.json
server.js
index.js
app.js
```

## Step 4

Dockerfile is generated automatically.

## Step 5

Docker image is built.

```bash
docker build -t image-name .
```

## Step 6

If build fails:

```text
Retry up to 3 times
```

## Step 7

Container is executed.

```bash
docker run -d image-name
```

## Step 8

Container health is verified.

## Step 9

Results are displayed in the frontend UI.

---

# API Endpoint

## Generate Dockerfile

POST

```text
/api/generate
```

Request:

```json
{
  "githubUrl": "https://github.com/bezkoder/node-express-mongodb"
}
```

Response:

```json
{
  "success": true,
  "dockerfile": "...",
  "buildResult": {},
  "runResult": {},
  "healthResult": {}
}
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/ChandrapalParmar/DockerForge.git
```

---

## Backend Setup

```bash
cd backend

npm install

npm start
```

Backend:

```text
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm start
```

Frontend:

```text
http://localhost:3000
```

---

# Tested Repositories

## Repository 1

```text
https://github.com/bezkoder/node-express-mongodb
```

Result:

* Dockerfile Generated
* Docker Image Built Successfully
* Container Started
* Health Verification Passed

---

## Repository 2

```text
https://github.com/gothinkster/node-express-realworld-example-app
```

Result:

* Dockerfile Generated
* Docker Image Built Successfully
* Runtime Execution Attempted

Note:

Repository requires additional runtime dependencies such as Prisma initialization and environment configuration.

---

## Repository 3

```text
https://github.com/expressjs/express
```

Result:

* Dockerfile Generated
* Docker Image Built Successfully
* Runtime Execution Attempted

Note:

Express is primarily a framework/library repository rather than a standalone deployable application.

---

# Failure Handling Tests

## Invalid Repository

```text
https://github.com/abcxyz123456/notfound
```

Result:

```text
Repository Not Found
```

---

# LLM / AI Integration

The initial design explored LLM-based Dockerfile generation.

For reliability and deterministic execution, the current implementation uses repository analysis, Docker build validation, runtime verification, and retry-based correction mechanisms.

Future versions can integrate:

* OpenAI
* Gemini
* OpenRouter

for intelligent Dockerfile generation and automated runtime error reasoning.

---

# Error Handling

DockerForge currently handles:

* Invalid Repository URLs
* Repository Clone Failures
* Docker Build Failures
* Container Startup Failures
* Missing Entry Files
* Missing Start Scripts
* Missing index.js
* Runtime Verification Failures
* Health Verification Failures

---

# Known Limitations

Current version primarily supports Node.js repositories.

Not fully supported:

* Python Projects
* Java Projects
* .NET Projects
* Go Projects
* Monorepo Structures
* External Database Dependencies
* Complex Microservice Architectures
* Prisma-based Runtime Setup
* Environment Variable Dependent Applications
* Dynamic Port Discovery
* docker-compose.yml Generation

---

# Future Enhancements

* AI-Powered Dockerfile Generation
* OpenAI / Gemini Integration
* Automatic Runtime Error Reasoning
* Multi-Language Support
* Monorepo Detection
* Automatic Port Detection
* Database Dependency Detection
* Prisma Support
* Multi-Stage Docker Builds
* Container Log Analysis
* Kubernetes Deployment
* CI/CD Integration

---

# Screenshots

Add screenshots of:

* Home Page
* Dockerfile Generation
* Build Logs
* Container Status
* Health Verification

---

# Author

Chandrapal Parmar

* MERN Stack Developer
* NIT Kurukshetra

---

# License

This project was created for educational and assessment purposes.
