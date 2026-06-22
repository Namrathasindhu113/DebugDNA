# DebugDNA

## AI-Powered Monitoring and Debugging Platform

DebugDNA is an intelligent software monitoring and debugging platform designed to help developers identify, analyze, and resolve application issues faster through centralized observability, real-time monitoring, audit tracking, and AI-assisted diagnostics.

The platform provides a unified environment for monitoring application behavior, tracking system events, analyzing failures, and maintaining complete visibility into software operations. By combining real-time event processing, audit intelligence, and AI-driven insights, DebugDNA reduces debugging time and improves software reliability.

---

## Problem Statement

Modern software systems generate massive volumes of logs, events, exceptions, and performance data. Developers often spend significant time navigating fragmented monitoring tools, manually tracing failures, and identifying root causes.

DebugDNA addresses these challenges by providing:

* Centralized monitoring
* Intelligent event tracking
* AI-assisted debugging workflows
* Real-time system visibility
* Root-cause investigation support
* Comprehensive audit logging

---

## Core Features

### Real-Time Monitoring

* Live application monitoring
* Continuous event tracking
* Real-time status updates
* WebSocket-powered synchronization
* System activity visualization

### AI-Assisted Debugging

* Automated anomaly detection
* Intelligent issue categorization
* Context-aware debugging assistance
* Failure pattern analysis
* Root-cause investigation support

### Audit Intelligence

* Complete audit trail generation
* Historical activity tracking
* Event correlation
* User action monitoring
* Change traceability

### Incident Tracking

* Issue creation and management
* Priority classification
* Assignment workflows
* Status lifecycle management
* Resolution tracking

### Observability Dashboard

* Centralized monitoring dashboard
* Application health insights
* Activity summaries
* Issue statistics
* Operational visibility

### Event Management

* Structured event recording
* Event lifecycle tracking
* Historical event analysis
* Real-time event streaming

---

## Key Audit Events

The platform currently tracks:

| Event Type           | Description                    |
| -------------------- | ------------------------------ |
| PROJECT_CREATED      | New project registration       |
| ISSUE_CREATED        | New incident or issue detected |
| ISSUE_ASSIGNED       | Ownership assignment tracking  |
| ISSUE_STATUS_UPDATED | Issue lifecycle transitions    |

---

## System Architecture

```text
                        ┌────────────────────┐
                        │      Frontend      │
                        │ React + Tailwind   │
                        └─────────┬──────────┘
                                  │
                                  ▼
                        ┌────────────────────┐
                        │   Spring Boot API  │
                        │ Business Services  │
                        └─────────┬──────────┘
                                  │
               ┌──────────────────┼──────────────────┐
               │                  │                  │
               ▼                  ▼                  ▼

      ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
      │ Audit Engine │   │ AI Analysis  │   │ WebSockets   │
      │ Event Logs   │   │ Diagnostics  │   │ Live Updates │
      └──────┬───────┘   └──────────────┘   └──────────────┘
             │
             ▼

      ┌────────────────────┐
      │      MySQL DB      │
      │ Monitoring Data    │
      └────────────────────┘
```

---

## Technology Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router

### Backend

* Spring Boot
* Spring Data JPA
* Spring Security
* REST APIs
* WebSockets

### Database

* MySQL

### AI & Analytics

* AI-powered diagnostic workflows
* Event analysis engine
* Monitoring intelligence modules

### Development Tools

* Git
* GitHub
* Maven
* VS Code
* Postman

---

## Engineering Highlights

### Real-Time Event Streaming

Implemented WebSocket-based communication to deliver instant monitoring updates and system notifications.

### Audit Trail Engine

Designed a centralized audit mechanism to maintain complete traceability across system activities and debugging workflows.

### Modular Architecture

Developed using a scalable service-oriented architecture that separates monitoring, event management, AI analysis, and data persistence layers.

### Full-Stack Development

Built end-to-end using React, Spring Boot, and MySQL with RESTful communication patterns.


---

## Use Cases

* Application Monitoring
* Software Debugging
* Incident Management
* Operational Visibility
* Root Cause Analysis
* Development Team Collaboration
* Software Reliability Engineering
* DevOps Monitoring Workflows

---

## Author

**Namratha Sindhu M**

Information Science Engineering
Garden City University

GitHub: https://github.com/Namrathasindhu113

LinkedIn: https://www.linkedin.com/in/namratha-sindhu-m-3906a22b2

---

