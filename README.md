# DebugDNA

DebugDNA is an AI-powered monitoring and debugging platform that helps engineering teams detect, analyze, and resolve application issues faster through real-time insights and intelligent root-cause suggestions. This repository contains a full‑stack reference implementation: a React + Vite frontend, a Spring Boot backend, and a small SDK for collecting and forwarding telemetry from applications.

Badges
- (Add CI / build / coverage / license badges here when available)

Table of contents
- Quick overview
- Key features
- Architecture
- Tech stack
- Getting started (local)
  - Prerequisites
  - Run with Docker Compose (recommended)
  - Run locally (frontend & backend)
- Configuration
  - Required environment variables
  - Optional variables / AI provider
- SDK (example usage)
- Development & testing
- Deployment
- Contributing
- Roadmap
- Security
- License & authors
- Contact & support

Quick overview
DebugDNA provides:
- Real-time telemetry ingestion and incident creation
- AI-powered log and trace analysis, with suggested root causes and remediation steps
- Incident lifecycle management (create, triage, resolve)
- Severity classification and historical analytics
- Developer dashboard for investigations and alerting
- Lightweight SDK for instrumenting apps

Key features
- AI-assisted log analysis and root-cause inference
- WebSocket-based real-time updates to dashboards
- Incident management and severity tracking
- Email alerting with extensible integrations (Slack, Teams planned)
- Project & API key management for multi-environment support
- Conversational Debug Assistant for remediation guidance

Architecture
Client (React) ↔ Server (Spring Boot) ↔ MongoDB
Telemetry flow:
Application -> DebugDNA SDK -> Spring Boot Backend -> MongoDB + AI Engine -> React Dashboard
WebSockets deliver real-time incident and analysis updates to the dashboard.

Technology stack
- Frontend: React, Vite, Tailwind CSS, React Router, Axios
- Backend: Java 17+, Spring Boot, Spring Security, Spring Data MongoDB, Spring WebSocket, Spring Mail
- Database: MongoDB (local or cloud)
- AI / Observability: Configurable AI provider (Groq / Llama or other)
- Build / Tools: Maven, Node.js / npm, Docker (optional)

Repository layout
DebugDNA/
├── client/          # React frontend
├── server/          # Spring Boot backend
├── debugdna-sdk/    # Monitoring SDK for instrumenting apps
└── logs/            # Example or collected logs

Getting started — Local development

Prerequisites
- Java 17+
- Maven
- Node.js 18+ and npm
- Docker & Docker Compose (recommended for quick local setup) or MongoDB running locally

Option A — Quick start with Docker Compose (recommended)
A sample docker-compose.yml (place in repository root) will start MongoDB, the backend, and frontend for local development:

```yaml
version: '3.8'
services:
  mongo:
    image: mongo:6.0
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  server:
    build: ./server
    environment:
      SPRING_DATA_MONGODB_URI: mongodb://root:example@mongo:27017/debugdna?authSource=admin
      GROQ_API_KEY: "${GROQ_API_KEY}"
      SPRING_MAIL_USERNAME: "${SPRING_MAIL_USERNAME}"
      SPRING_MAIL_PASSWORD: "${SPRING_MAIL_PASSWORD}"
      SERVER_PORT: 9090
    ports:
      - "9090:9090"
    depends_on:
      - mongo

  client:
    build:
      context: ./client
    environment:
      VITE_BACKEND_URL: http://localhost:9090
    ports:
      - "5173:5173"
    depends_on:
      - server

volumes:
  mongo-data:
```

Start:
- docker compose up --build

Option B — Run frontend & backend separately

Clone the repo
```bash
git clone https://github.com/Namrathasindhu113/DebugDNA.git
cd DebugDNA
```

Start the backend
```bash
cd server
mvn -DskipTests spring-boot:run
```
Default backend: http://localhost:9090

Start the frontend
```bash
cd client
npm install
npm run dev
```
Default frontend: http://localhost:5173

Configuration

Required environment variables (backend)
- SPRING_DATA_MONGODB_URI — MongoDB connection string (e.g., mongodb://user:pass@host:27017/debugdna)
- GROQ_API_KEY — API key for Groq or other AI provider if applicable
- SPRING_MAIL_USERNAME — SMTP username
- SPRING_MAIL_PASSWORD — SMTP password

Optional / recommended variables
- AI_PROVIDER — identifier for which AI provider to use (e.g., groq, llama, openai)
- SLACK_WEBHOOK_URL — Slack alerts webhook (if enabled)
- TEAMS_WEBHOOK_URL — Microsoft Teams webhook
- SERVER_PORT — Backend port (default 9090)
- VITE_BACKEND_URL — For frontend dev server to call the backend

Example .env (do not commit secrets)
```env
SPRING_DATA_MONGODB_URI=mongodb://root:example@localhost:27017/debugdna
GROQ_API_KEY=YOUR_GROQ_KEY
SPRING_MAIL_USERNAME=mail@example.com
SPRING_MAIL_PASSWORD=supersecret
AI_PROVIDER=groq
```

SDK — example usage
The SDK should provide simple primitives to create events, incidents, and to forward logs. Example (Java-like pseudocode):

```java
DebugDNAClient client = DebugDNAClient.builder()
    .apiKey("PROJECT_API_KEY")
    .endpoint("http://localhost:9090/api/v1")
    .build();

// capture a log / telemetry
client.captureLog(new LogEvent()
    .withLevel("ERROR")
    .withMessage("NullPointer on OrderProcessor")
    .withService("order-service")
    .withTimestamp(Instant.now())
);

// create an incident
client.createIncident(new Incident()
    .withTitle("Order processing NPE")
    .withSeverity(Severity.P1)
    .withContext(Map.of("orderId", "1234"))
);
```

(Replace with real SDK examples from debugdna-sdk/ package — add README inside debugdna-sdk/ with full API docs.)

Development & testing
- Backend
  - Build: mvn clean package
  - Run tests: mvn test
  - Run locally: mvn spring-boot:run
- Frontend
  - Install: npm install
  - Dev server: npm run dev
  - Build: npm run build
- SDK
  - See debugdna-sdk/ README for language-specific docs and examples

API & Docs
- API specification should be included in server/ (OpenAPI/Swagger recommended).
- Add automated API docs (Swagger UI) accessible from the running server for developers.

Deployment
- Provide container images for server and client.
- Recommended production architecture:
  - Backend: containerized Spring Boot behind a reverse proxy (NGINX / API Gateway)
  - Data: managed MongoDB (Atlas) with backups
  - AI inference: use a managed provider or dedicated inference service with scaling and cost controls
  - Observability: add distributed tracing (Jaeger/Zipkin) and logs (ELK/other)
- Consider Helm charts / k8s manifests for production deployments (roadmap item).

Security
- Never commit secrets. Use environment variables, a secrets manager, or Kubernetes secrets.
- Protect API endpoints with authentication & authorization (API keys, OAuth, or JWT).
- Sanitize user-provided logs before sending to AI services to avoid leaking PII or secrets.

Contributing
We welcome contributions. Suggested workflow:
1. Fork the repo
2. Create a feature branch: git checkout -b feat/my-feature
3. Run tests and linters
4. Open a PR with a clear description and linked issue (if relevant)

Contribution guidelines / CODE_OF_CONDUCT / CONTRIBUTING.md
- Add these documents to the repo to clarify expectations and review process.

Roadmap / future work
- Kubernetes native deployment and Helm charts
- Distributed tracing and span ingestion
- Predictive incident detection and alert suppression
- Slack / Teams / GitHub Actions integrations
- Enhanced observability dashboards and analytics

Troubleshooting & FAQ
- Backend fails to start: check SPRING_DATA_MONGODB_URI and connectivity to MongoDB
- Frontend failing to reach backend: verify VITE_BACKEND_URL or proxy settings
- AI calls failing: ensure GROQ_API_KEY or AI_PROVIDER configuration is set and valid

License & authors
- Author: Namratha Sindhu — Information Science Engineering, Garden City University
- GitHub: https://github.com/Namrathasindhu113
- Add a LICENSE file to the repository (MIT/Apache-2.0 or other) to clarify usage rights.

Acknowledgements
- Built using open-source components: Spring Boot, React, Vite, Tailwind CSS, MongoDB

Contact & support
- For issues and feature requests, please open an issue on this repository.
- For direct contact, use the GitHub profile: https://github.com/Namrathasindhu113
