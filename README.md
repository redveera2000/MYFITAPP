<div align="center">

# 🏋️‍♂️ AESTHETIX V-Track

### Premium Workout Tracker & Progressive Overload Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.10.0-purple.svg)](CHANGELOG.md)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](Dockerfile)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange.svg)](https://firebase.google.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**A glassmorphic, mobile-first fitness tracker with AI-powered progressive overload recommendations, Google Fit integration, and real-time cloud sync.**

[Features](#-features) · [Quick Start](#-quick-start) · [Architecture](#-architecture) · [Contributing](#-contributing) · [Changelog](CHANGELOG.md)

</div>

---

## ✨ Features

### 🎯 Core Training Engine
- **6-Day Push/Pull/Legs Split** — Fully customizable workout program with per-exercise baseline targets (sets, reps, weight)
- **Progressive Overload Algorithm** — Automatically calculates next-session targets based on your performance history
- **Dynamic Weight Increments** — Equipment-aware progression (barbell: 2.5kg, dumbbell: 2kg, cable: 5kg, bodyweight: +1 rep)
- **Active Session Logger** — Real-time workout logging with per-set tracking, timer, and instant save

### 🧠 Smart Training Coach
- **7 Evidence-Based Detection Algorithms** including:
  - Weight deviation detection (ego-lifting & sandbagging alerts)
  - Rep performance analysis (failure vs. exceeding targets)
  - Volume load tracking with progressive overload verification
  - CNS fatigue monitoring for heavy compound movements
  - Plateau detection across consecutive sessions

### 📊 Insights & Analytics
- **Progressive Overload Volume Chart** — 8-session training volume trend with moving averages
- **Recovery & CNS Monitor** — Fatigue detection engine with science-backed recovery recommendations
- **Holistic Body Composition Analysis** — Cross-references weight trends against volume trends to identify recomposition states
- **Training History** — Complete session logs with duration metrics and performance breakdowns

### 👟 Google Fit Integration
- **Daily Activity Tracker** — Steps, distance, active calories, and heart rate from Google Fit
- **14-Day Step Trend Chart** — Color-coded training vs. rest days with goal overlay
- **Google Takeout CSV Import** — Bulk import from Google Fit's Daily Summaries export
- **Manual Entry** — Log steps, distance, calories, and heart rate directly

### ☁️ Cloud Sync & Data
- **Firebase Authentication** — Secure single-user access
- **Real-Time Firestore Sync** — Instant cloud backup with offline-first localStorage fallback
- **JSON Backup/Restore** — Full data export and import with step logs included
- **Automated VPS Backups** — Rolling 30-day containerized backup service

### 🎨 Premium Design
- **Glassmorphic Dark Theme** — Frosted glass cards, gradient accents, and smooth animations
- **Mobile-First Responsive** — Optimized for phone-in-gym usage
- **Micro-Animations** — Shimmer effects, transitions, and interactive hover states

---

## 🚀 Quick Start

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/)
- A [Firebase](https://console.firebase.google.com) project with Authentication & Firestore enabled

### 1. Clone the repository

```bash
git clone https://github.com/redveera2000/MYFITAPP.git
cd MYFITAPP
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env with your Firebase project credentials
```

### 3. Launch with Docker

```bash
docker compose up --build
```

### 4. Open in browser

```
http://localhost:8080
```

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     BROWSER (Client)                      │
│                                                          │
│  index.html ──▶ app.js (142KB, single-file application)  │
│       │              │                                    │
│       ├── index.css (Glassmorphic Design System)          │
│       ├── firebase-config.js (Runtime Config Injection)   │
│       ├── db-service.js (Firestore CRUD Layer)            │
│       └── health-api.js (Google Fit OAuth + API)          │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                    FIREBASE (Backend)                      │
│                                                          │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐   │
│  │ Auth        │  │ Firestore DB │  │ Security      │   │
│  │ (Email/Pwd) │  │ (NoSQL)      │  │ Rules         │   │
│  └─────────────┘  └──────────────┘  └───────────────┘   │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                  DEPLOYMENT (Docker + Nginx)               │
│                                                          │
│  Dockerfile ──▶ nginx:1.27-alpine                        │
│  docker-compose.yml ──▶ Port mapping + env injection     │
│  .github/workflows/ ──▶ CI/CD (dev + prod auto-deploy)   │
│  backup-service/ ──▶ Automated Firestore backups         │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Vanilla HTML5, CSS3, JavaScript (ES6+) |
| **Design** | Custom glassmorphic design system, CSS custom properties |
| **Charts** | Chart.js |
| **Auth** | Firebase Authentication (Email/Password) |
| **Database** | Cloud Firestore (NoSQL) |
| **Health Data** | Google Fit REST API (OAuth 2.0) |
| **Server** | Nginx 1.27 (Alpine) |
| **Container** | Docker + Docker Compose |
| **CI/CD** | GitHub Actions (SSH deploy to VPS) |
| **Backups** | Node.js + Firebase Admin SDK |

---

## 📁 Project Structure

```
MYFITAPP/
├── index.html              # Main application shell (837 lines)
├── index.css               # Glassmorphic design system
├── app.js                  # Core application logic (142KB)
├── db-service.js           # Firestore CRUD abstraction layer
├── firebase-config.js      # Runtime Firebase configuration
├── health-api.js           # Google Fit API integration
├── firestore.rules         # Firebase security rules
├── Dockerfile              # Production Nginx container
├── docker-compose.yml      # Container orchestration
├── .env.example            # Environment variable template
├── CHANGELOG.md            # Detailed version history
├── BRANCHING_STRATEGY.md   # Git branching model & workflow
├── CONTRIBUTING.md         # Contributor guidelines
├── CODE_OF_CONDUCT.md      # Community code of conduct
├── SECURITY.md             # Vulnerability reporting policy
├── LICENSE                 # MIT License
├── nginx/
│   ├── default.conf        # Nginx site configuration
│   └── configure-firebase.sh # Runtime env injection script
├── backup-service/         # Automated Firestore backup scripts
└── .github/
    ├── workflows/
    │   ├── deploy-dev.yml  # Development auto-deploy
    │   └── deploy-prod.yml # Production auto-deploy
    ├── ISSUE_TEMPLATE/
    │   ├── bug_report.md   # Bug report template
    │   ├── feature_request.md # Feature request template
    │   └── config.yml      # Issue template config
    └── PULL_REQUEST_TEMPLATE.md
```

---

## 🤝 Contributing

Contributions are welcome! Whether it's fixing a bug, adding a feature, or improving documentation — every contribution matters.

1. **Read the [Contributing Guide](CONTRIBUTING.md)** for setup instructions and guidelines
2. **Review the [Branching Strategy](BRANCHING_STRATEGY.md)** for branch naming, workflows, and release process
3. **Browse [Good First Issues](https://github.com/redveera2000/MYFITAPP/labels/good%20first%20issue)** to find beginner-friendly tasks
4. **Check the [Changelog](CHANGELOG.md)** to understand the project's evolution

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions.

---

## 📋 Roadmap

- [ ] PWA support (offline-first with service worker)
- [ ] Data export to CSV/PDF
- [ ] Dark/Light theme toggle
- [ ] Internationalization (i18n)
- [ ] Workout rest timer with audio notifications
- [ ] Social sharing of achievements
- [ ] Onboarding wizard for new users
- [ ] Unit tests for core algorithms

---

## 🔒 Security

This application handles sensitive health and fitness data. Please review our [Security Policy](SECURITY.md) for vulnerability reporting procedures.

**⚠️ Never commit secrets or API keys to the repository.** Use the `.env.example` template for reference.

---

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Firebase](https://firebase.google.com) for authentication and real-time database
- [Chart.js](https://www.chartjs.org) for data visualization
- [Google Fit API](https://developers.google.com/fit) for health data integration
- [Contributor Covenant](https://www.contributor-covenant.org) for the Code of Conduct

---

<div align="center">

**Built with 💪 by [Veeradinesh](https://github.com/redveera2000)**

*Star ⭐ this repo if you find it useful!*

</div>
