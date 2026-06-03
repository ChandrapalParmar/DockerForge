# DockerForge

DockerForge is a MERN-based Docker Automation Platform that automatically analyzes a GitHub repository, generates a Dockerfile, builds a Docker image, runs a container, and verifies container health.

---

## Features

* Accept GitHub Repository URL
* Clone Repository Automatically
* Scan Repository Structure
* Detect Node.js Applications
* Generate Dockerfile Automatically
* Build Docker Image
* Capture Docker Build Logs
* Run Docker Container
* Verify Container Health
* Retry Build Process (up to 3 attempts)
* Display Build and Runtime Results in UI
* Handle Invalid Repository URLs

---

## Architecture

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
Docker Run
↓
Health Check
↓
Result Display

---

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

DockerForge/

├── frontend/

│ ├── src/

│ ├── public/

│ └── package.json

│

├── backend/

│ ├── controllers/

│ ├── routes/

│ ├── services/

│ ├── tempRepos/

│ ├── app.js

│ ├── server.js

│ └── package.json

│

└── README.md

---

## Workflow

### Step 1

User enters a GitHub repository URL.

Example:

https://github.com/expressjs/express

### Step 2

Backend clones the repository into a temporary directory.

### Step 3

Repository files are analyzed.

Important files:

* package.json
* server.js
* index.js

### Step 4

A Dockerfile is generated automatically.

Example:

FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]

### Step 5

Docker image is built.

docker build -t image-name .

### Step 6

Docker container is started.

docker run -d image-name

### Step 7

Container health is verified.

### Step 8

Results are returned to the frontend.

---

## API Endpoint

### Generate Dockerfile

POST

/api/generate

Request:

{
"githubUrl": "https://github.com/expressjs/express"
}

Response:

{
"success": true,
"dockerfile": "...",
"buildResult": {},
"runResult": {},
"healthResult": {}
}

---

## Installation

### Clone Project

git clone <repository-url>

### Backend Setup

cd backend

npm install

npm start

Backend runs on:

http://localhost:5000

### Frontend Setup

cd frontend

npm install

npm start

Frontend runs on:

http://localhost:3000

---

## Tested Repositories

### Successful Tests

1. expressjs/express

* Dockerfile Generated
* Image Built
* Container Started
* Health Check Passed

2. bezkoder/node-express-mongodb

* Dockerfile Generated
* Image Built
* Container Started
* Health Check Passed

3. gothinkster/node-express-realworld-example-app

* Dockerfile Generated
* Image Built
* Container Started
* Health Check Passed

### Failure Handling Tests

1. Invalid Repository

https://github.com/abcxyz123456/notfound

Result:

Repository Not Found

2. Non-Runnable Repository

https://github.com/facebook/create-react-app

Result:

Container Startup Failure Detected

---

## Error Handling

The system handles:

* Invalid GitHub URLs
* Repository Clone Failures
* Docker Build Failures
* Container Startup Failures
* Missing Entry Files
* Health Check Failures

---

## Known Limitations

Current version primarily supports Node.js repositories.

Not fully supported:

* Python Projects
* Java Projects
* .NET Projects
* Go Projects

---

## Future Enhancements

* AI-powered Dockerfile Generation
* Multi-Language Support
* Automatic Dockerfile Repair
* Container Log Analysis
* Kubernetes Deployment Support
* CI/CD Integration

---

## Screenshots

Add screenshots here:

1. Home Page
2. Dockerfile Generation
3. Build Logs
4. Container Status
5. Health Check

---

## Author

Chandrapal Parmar

MERN Stack Developer

NIT Kurukshetra

---

## License

This project is created for educational and assessment purposes.
