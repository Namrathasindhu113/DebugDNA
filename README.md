# DebugDNA

DebugDNA is an AI-powered developer intelligence platform designed to help engineering teams monitor applications, analyze failures, identify root causes, and accelerate debugging workflows.

The platform combines real-time monitoring, log analysis, incident management, and AI-assisted troubleshooting into a unified dashboard that provides actionable insights for developers and operations teams.

---

## Overview

Modern applications generate large volumes of logs and operational data, making incident diagnosis time-consuming and complex. DebugDNA addresses this challenge by automatically collecting telemetry data, analyzing failures using large language models, and presenting structured debugging insights through an interactive monitoring dashboard.

The platform enables developers to:

* Detect application failures in real time
* Analyze logs using AI-driven root cause analysis
* Track incidents across multiple projects
* Receive intelligent debugging recommendations
* Monitor severity trends and system health
* Manage projects and API integrations from a centralized interface

---

## Key Features

### AI-Powered Log Analysis

* Automated root cause identification
* Severity classification
* Deployment impact assessment
* AI-generated remediation suggestions

### Real-Time Monitoring

* Live issue ingestion
* WebSocket-based updates
* Incident occurrence tracking
* Status management and resolution workflow

### Developer Intelligence Dashboard

* Centralized monitoring interface
* Severity-based issue visualization
* Incident analytics and reporting
* Historical issue tracking

### AI Debug Assistant

* Conversational troubleshooting interface
* Context-aware debugging support
* Infrastructure and application-level recommendations

### Project Management

* Project creation and configuration
* API key generation
* Environment-based project organization
* SDK integration support

### Alerting System

* Automated email notifications
* High-severity incident alerts
* AI-generated incident summaries

### Authentication and Access Control

* User registration and login
* Protected application routes
* Session-based authentication workflow

---

## System Architecture

```text
Application
      │
      ▼
DebugDNA SDK
      │
      ▼
Spring Boot Backend
      │
 ┌────┴────┐
 │         │
 ▼         ▼
MongoDB   Groq AI
 │         │
 └────┬────┘
      ▼
React Dashboard
```

---

## Technology Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* Recharts

### Backend

* Spring Boot
* Spring Security
* Spring Data MongoDB
* Spring WebSocket
* Spring Mail

### Database

* MongoDB

### Artificial Intelligence

* Groq API
* Llama 3.1

### Development Tools

* Maven
* Git
* GitHub
* Postman

---

## Repository Structure

```text
DebugDNA/
├── client/          # React frontend
├── server/          # Spring Boot backend
├── debugdna-sdk/    # Monitoring SDK
└── logs/            # Application logs
```

---

## Core Modules

### Monitoring Dashboard

Provides a centralized view of active incidents, severity levels, deployment health, and infrastructure status.

### Incident Management

Tracks issue lifecycle, occurrences, timestamps, and resolution status.

### AI Analysis Engine

Processes telemetry and log data to generate structured debugging insights and remediation guidance.

### Analytics

Provides incident distribution metrics and severity-based reporting.

### Project Management

Supports project creation, API key generation, and SDK onboarding.

### Alerting Service

Triggers automated notifications for critical incidents and operational anomalies.

---

## Local Development

### Clone Repository

```bash
git clone https://github.com/Namrathasindhu113/DebugDNA.git
cd DebugDNA
```

### Backend

```bash
cd server
mvn spring-boot:run
```

Backend URL:

```text
http://localhost:9090
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## Configuration

The backend requires the following environment variables:

```properties
SPRING_DATA_MONGODB_URI=
GROQ_API_KEY=
SPRING_MAIL_USERNAME=
SPRING_MAIL_PASSWORD=
```

---

## Future Enhancements

* Distributed system monitoring
* Kubernetes integration
* GitHub Actions integration
* Slack and Microsoft Teams notifications
* Predictive incident detection
* AI-generated deployment reports
* Advanced observability dashboards

---

## Author

Namratha Sindhu

Information Science Engineering
Garden City University

GitHub: https://github.com/Namrathasindhu113

---

## License

This project is provided for educational and portfolio purposes.
