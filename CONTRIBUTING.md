# Contributing to AESTHETIX V-Track

Thank you for considering contributing to AESTHETIX V-Track! 🏋️‍♂️ Every contribution helps make this fitness tracker better.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Branch Strategy](#branch-strategy)
- [Commit Message Convention](#commit-message-convention)
- [Pull Request Process](#pull-request-process)
- [Code Style Guidelines](#code-style-guidelines)
- [Finding Issues to Work On](#finding-issues-to-work-on)

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to veeradinesh219@gmail.com.

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/)
- A Firebase project ([create one here](https://console.firebase.google.com))
- [Git](https://git-scm.com/downloads)
- A modern web browser (Chrome/Firefox recommended)
- (Optional) [Node.js](https://nodejs.org/) 18+ for local development without Docker

### Development Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/MYFITAPP.git
   cd MYFITAPP
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase credentials
   ```

4. **Run with Docker** (recommended):
   ```bash
   docker compose up --build
   ```
   The app will be available at `http://localhost:8080`

5. **Run without Docker** (alternative):
   - Open `index.html` directly in a browser
   - Note: Some features (Firebase config injection) require the Docker/Nginx setup

### Firebase Setup for Contributors

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Email/Password Authentication** in Authentication → Sign-in method
3. Create a **Cloud Firestore** database
4. Copy your project's config values into your `.env` file
5. (Optional) For Google Fit integration, set up OAuth 2.0 credentials in [Google Cloud Console](https://console.cloud.google.com)

## How to Contribute

### Reporting Bugs

- Use the [Bug Report](https://github.com/redveera2000/MYFITAPP/issues/new?template=bug_report.md) issue template
- Include steps to reproduce, expected vs actual behavior, and screenshots if applicable
- Check existing issues first to avoid duplicates

### Suggesting Features

- Use the [Feature Request](https://github.com/redveera2000/MYFITAPP/issues/new?template=feature_request.md) issue template
- Describe the use case and why it would benefit users
- Be open to discussion — features may need to align with the project's direction

### Submitting Code

1. Find an issue to work on or create one
2. Comment on the issue to let others know you're working on it
3. Fork the repo and create a feature branch
4. Make your changes following the guidelines below
5. Submit a pull request

## Branch Strategy

We use an **Enhanced GitHub Flow** model. For the complete strategy including diagrams, protection rules, and release process, see [BRANCHING_STRATEGY.md](BRANCHING_STRATEGY.md).

```
main (production)  ← Protected, deployed via CI/CD
  └── development  ← Staging/integration branch
       ├── feature/*   ← New features
       ├── bugfix/*    ← Bug fixes
       ├── docs/*      ← Documentation changes
       └── release/*   ← Release preparation
  └── hotfix/*     ← Emergency production fixes (from main)
```

### Branch Naming Convention

| Type | Pattern | Example |
|---|---|---|
| Feature | `feature/<kebab-case>` | `feature/pwa-support` |
| Bug Fix | `bugfix/<kebab-case>` | `bugfix/timer-save-crash` |
| Hotfix | `hotfix/<kebab-case>` | `hotfix/auth-token-expiry` |
| Release | `release/v<semver>` | `release/v1.11.0` |
| Docs | `docs/<kebab-case>` | `docs/api-reference` |

### Quick Start Commands

```bash
# Feature or bugfix (from development)
git checkout development && git pull origin development
git checkout -b feature/your-feature-name

# Hotfix (from main — emergency only)
git checkout main && git pull origin main
git checkout -b hotfix/describe-the-issue
```

### Rules

- **Never push directly to `main` or `development`** — always use pull requests
- Feature/bugfix branches → PR to `development`
- Hotfix branches → PR to `main` (then backport to `development`)
- **Delete branches after merge** — keep the repository clean
- Use **squash merge** for feature branches to keep history clean

## Commit Message Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>: <description>

[optional body]
```

### Types

| Type | Description |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `perf` | Performance improvement |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `style` | Formatting, missing semicolons, etc. (no code change) |
| `docs` | Documentation only changes |
| `test` | Adding or updating tests |
| `chore` | Build process, CI, or auxiliary tool changes |

### Examples

```
feat: Add dark/light theme toggle with persistence
fix: Resolve timezone offset bug in step log date grouping
perf: Optimize login sync speed with Promise.all
docs: Add local development setup instructions to README
chore: Bump Docker image tag to 1.11.0
```

## Pull Request Process

1. **Update your branch** with the latest `development`:
   ```bash
   git fetch origin
   git rebase origin/development
   ```

2. **Self-review your changes** — read through the diff before submitting

3. **Fill out the PR template** completely, including:
   - Description of what changed and why
   - Testing steps you followed
   - Screenshots for any UI changes

4. **Ensure your changes work**:
   - Build and run the Docker container successfully
   - Test in a browser — check the relevant tabs/features
   - No console errors

5. **Wait for review** — a maintainer will review your PR and may request changes

## Code Style Guidelines

### General

- **No build tools or bundlers required** — this is a vanilla HTML/CSS/JS project
- Keep things simple and readable
- Comment complex logic, especially fitness calculation algorithms
- Use meaningful variable names

### JavaScript

- Use `const` and `let` — never `var`
- Use ES6+ features (arrow functions, template literals, destructuring)
- Prefix private/internal functions with underscore (e.g., `_calculateVolume`)
- Follow the existing StateManager / Module pattern in `app.js`
- Handle errors gracefully — never let Firebase errors crash the UI

### CSS

- Follow the existing glassmorphic design system
- Use CSS custom properties (variables) defined in `:root`
- Maintain the dark theme aesthetic
- Ensure mobile responsiveness (the app is mobile-first)
- Use the existing animation patterns for consistency

### HTML

- Use semantic HTML5 elements
- All interactive elements must have unique `id` attributes
- Maintain accessibility (ARIA labels, keyboard navigation)

## Finding Issues to Work On

Look for issues labeled:

- 🟢 **`good first issue`** — Great for first-time contributors
- 🟡 **`help wanted`** — Maintainers would appreciate community help
- 🔵 **`enhancement`** — Feature improvements
- 🔴 **`bug`** — Something that needs fixing

Browse open issues: [github.com/redveera2000/MYFITAPP/issues](https://github.com/redveera2000/MYFITAPP/issues)

---

## Questions?

If you have questions about contributing, feel free to:
- Open a [Discussion](https://github.com/redveera2000/MYFITAPP/discussions) on GitHub
- Reach out via email: veeradinesh219@gmail.com

Thank you for helping make AESTHETIX V-Track better! 💪
