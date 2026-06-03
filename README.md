# DockerForge

DockerForge is a MERN-based Docker Automation Platform that automatically analyzes a GitHub repository, generates a Dockerfile, builds a Docker image, runs a container, verifies container health, and checks whether the application responds successfully.

---

## Problem Statement

Build a tool called DockerForge with the following flow:

1. Accept a public GitHub repository URL from the user.
2. Clone the repository and scan its file structure.
3. Generate a Dockerfile based on repository analysis.
4. Run `docker build` and capture the output.
5. If build fails, analyze the error and retry (up to 3 attempts).
6. Run the generated Docker container.
7. Verify the container starts and responds correctly.
8. Display the final result in the UI.

---

## Features

* Accept GitHub Repository URL
* Clone Repository Automatically
* Scan Repository Structure
* Detect Node.js Applications
* Generate Dockerfile Automatically
* Build Docker Image
* Capture Docker Build Logs
* Retry Failed Builds (Max 3 Attempts)
* Auto-Fix Common Dockerfile Issues
* Run Docker Container
* Verify Container Health
* Verify Application Response
* Display Build & Runtime Results in UI
* Display Container Logs
* Handle Invalid Repository URLs
* Handle Build Failures Gracefully

---

## Architecture

```text
User
  ↓
React Frontend
  ↓
Node.js / Express Backend
  ↓
Clone GitHub Repository
  ↓
Repository Analysis
  ↓
Dockerfile Generation
  ↓
Docker Build
  ↓
Retry Failed Builds (Max 3 Attempts)
  ↓
Docker Run
  ↓
Container Health Check
  ↓
Application Response Verification
  ↓
Result Display
```

## Tech Stack

### Frontend

* React.js
* Axios

### Backend

* Node.js
* Express.js

### Docker

* Docker Engine
* Docker CLI

### Utilities

* simple-git
* fs-extra
* child_process

---

## Project Structure

```text
DockerForge/

├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── tempRepos/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Workflow

### Step 1

User enters a GitHub repository URL.

Example:

```text
https://github.com/expressjs/express
```

### Step 2

Backend clones the repository into a temporary directory.

### Step 3

Repository files are analyzed.

Common files detected:

```text
package.json
server.js
index.js
app.js
```

### Step 4

Dockerfile is generated automatically.

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

### Step 5

Docker image is built.

```bash
docker build -t image-name .
```

### Step 6

If build fails, DockerForge retries automatically.

Maximum retries:

```text
3 Attempts
```

### Step 7

Container is started.

```bash
docker run -d image-name
```

### Step 8

Container health is verified.

### Step 9

Application response is verified.

### Step 10

Results are displayed in the frontend UI.

---

## API Endpoint

### Generate Dockerfile

**POST**

```text
/api/generate
```

### Request

```json
{
  "githubUrl": "https://github.com/expressjs/express"
}
```

### Response

```json
{
  "success": true,
  "detectedFiles": [],
  "dockerfile": "...",
  "buildResult": {},
  "runResult": {},
  "healthResult": {}
}
```

---

## Installation

### Clone Project

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

Backend runs on:

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

Frontend runs on:

```text
http://localhost:3000
```

---

## Tested Repositories

### Successful Tests

#### Express

```text
https://github.com/expressjs/express
```

Result:

* Dockerfile Generated
* Docker Image Built
* Container Started
* Health Check Passed

---

#### Node Express MongoDB

```text
https://github.com/bezkoder/node-express-mongodb
```

Result:

* Dockerfile Generated
* Docker Image Built
* Container Started
* Health Check Passed

Note:

* Runtime verification may fail if MongoDB service is unavailable.

---

#### RealWorld Express Example

```text
https://github.com/gothinkster/node-express-realworld-example-app
```

Result:

* Dockerfile Generated
* Docker Image Built
* Container Started
* Health Check Passed

---

### Failure Handling Tests

#### Invalid Repository

```text
https://github.com/abcxyz123456/notfound
```

Result:

```text
Repository Not Found
```

---

#### Monorepo Repository

```text
https://github.com/ChandrapalParmar/DockerForge
```

Result:

```text
Build Failure Detected
Monorepo Limitation Identified
```

---

## Error Handling

DockerForge currently handles:

* Invalid GitHub URLs
* Repository Clone Failures
* Docker Build Failures
* Container Startup Failures
* Missing Entry Files
* Missing Start Script
* Missing index.js
* Health Check Failures
* Runtime Verification Failures

---

## Known Limitations

Current version primarily supports Node.js repositories.

Not fully supported:

* Python Projects
* Java Projects
* .NET Projects
* Go Projects
* Monorepo Structures
* Projects requiring external databases
* Complex microservice architectures
* Prisma projects requiring additional setup commands

---

## Future Enhancements

* AI-Powered Dockerfile Generation
* Multi-Language Support
* Monorepo Detection Support
* Automatic Port Detection
* Database Dependency Detection
* Prisma Generate Support
* Multi-Stage Docker Builds
* Container Log Analysis
* Kubernetes Deployment Support
* CI/CD Integration

---

## Screenshots

Add screenshots here:

* Home Page
* Dockerfile Generation
* Build Logs
* Container Status
* Health Check
* Response Verification

---

## Author

**Chandrapal Parmar**

* MERN Stack Developer
* NIT Kurukshetra

---

## License

This project was created for educational and assessment purposes.
