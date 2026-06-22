# DebugDNA

DebugDNA is an AI-powered monitoring and debugging platform that helps engineering teams detect, analyze, and resolve application issues faster through real-time insights and intelligent root-cause analysis.

This repository contains a full-stack reference implementation: a React + Vite frontend, a Spring Boot backend, and a small SDK for collecting and forwarding telemetry from applications.

---

## Quick summary

- Real-time incident ingestion and monitoring
- AI-assisted log analysis and root cause suggestions
- Incident lifecycle and severity tracking
- Centralized developer dashboard for troubleshooting
- SDK for easy integration and telemetry collection

---

## What's new (updated project)

- Refreshed developer documentation and onboarding steps
- Clearer local development commands for frontend and backend
- Environment variable guidance for secrets and AI integrations
- Consolidated architecture diagram and technology list

---

## Features

- AI-powered log analysis and root-cause inference
- Real-time monitoring with WebSocket-based updates
- Incident management (create, track, resolve)
- Severity classification and historical analytics
- Alerting (email and future integrations for Slack/Teams)
- Project and API key management for multi-environment support
- Conversational AI Debug Assistant that suggests remediation steps

---

## Architecture

Application -> DebugDNA SDK -> Spring Boot Backend -> MongoDB + AI Engine -> React Dashboard

---

## Technology stack

Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios

Backend
- Java, Spring Boot
- Spring Security
- Spring Data MongoDB
- Spring WebSocket
- Spring Mail

Database
- MongoDB

AI / Observability
- Groq API (configurable)
- Llama 3.x (used by AI components, configurable provider)

Development
- Maven
- Node / npm
- Git & GitHub

---

## Repository layout

DebugDNA/
├── client/          # React frontend
├── server/          # Spring Boot backend
├── debugdna-sdk/    # Monitoring SDK for instrumenting apps
└── logs/            # Example or collected logs

---

## Local development

Prerequisites
- Java 17+
- Maven
- Node 18+ (or the version the project specifies)
- MongoDB running locally or a connection string

Clone and run

```bash
git clone https://github.com/Namrathasindhu113/DebugDNA.git
cd DebugDNA
```

Backend

```bash
cd server
mvn spring-boot:run
```

Default backend URL: http://localhost:9090

Frontend

```bash
cd client
npm install
npm run dev
```

Default frontend URL: http://localhost:5173

---

## Configuration

Required environment variables for the backend (example .env or system env):

```properties
SPRING_DATA_MONGODB_URI=
GROQ_API_KEY=
SPRING_MAIL_USERNAME=
SPRING_MAIL_PASSWORD=
```

Optional / future integration variables
- AI_PROVIDER - to select the AI backend provider
- SLACK_WEBHOOK_URL, TEAMS_WEBHOOK_URL - for notifications

---

## Contributing

Contributions welcome — please open issues or PRs. For code changes:
- Fork the repo
- Create a feature branch
- Open a PR with a clear description of the changes

---

## Roadmap / Future work

- Kubernetes and distributed tracing integration
- Predictive incident detection and alert suppression
- Slack / Teams / GitHub Actions integrations
- Improved observability dashboards and advanced analytics

---

## Author

Namratha Sindhu

Information Science Engineering, Garden City University

GitHub: https://github.com/Namrathasindhu113

---
