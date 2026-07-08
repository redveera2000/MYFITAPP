# Branching Strategy

> **Model**: Enhanced GitHub Flow  
> **Last Updated**: July 2026  
> **Applies To**: [redveera2000/MYFITAPP](https://github.com/redveera2000/MYFITAPP)

## Table of Contents

- [Overview](#overview)
- [Branch Types](#branch-types)
- [Naming Conventions](#naming-conventions)
- [Workflow Diagrams](#workflow-diagrams)
- [Feature / Bugfix Workflow](#feature--bugfix-workflow)
- [Release Workflow](#release-workflow)
- [Hotfix Workflow](#hotfix-workflow)
- [Branch Protection Rules](#branch-protection-rules)
- [Git Tags & Versioning](#git-tags--versioning)
- [Stale Branch Cleanup](#stale-branch-cleanup)
- [Quick Reference](#quick-reference)

---

## Overview

This project uses an **Enhanced GitHub Flow** branching model with two long-lived branches and short-lived topic branches:

```
main (production)
  └── development (staging/integration)
       ├── feature/*   (new features)
       ├── bugfix/*    (bug fixes)
       ├── docs/*      (documentation)
       └── release/*   (release preparation)
  └── hotfix/*         (emergency production fixes, branched from main)
```

### Principles

1. **`main` is always production-ready** — every commit on `main` is deployed to production
2. **`development` is the integration branch** — all feature work merges here first for testing
3. **Feature branches isolate work** — every change gets its own branch, reviewed via PR
4. **Hotfixes bypass `development`** — critical production fixes go directly to `main`
5. **Tags mark releases** — every production release gets a semantic version tag

### CI/CD Mapping

| Branch | Deployment Target | Workflow |
|---|---|---|
| `main` | 🟢 **Production** (`/opt/vtrack`) | `deploy-prod.yml` |
| `development` | 🟡 **Staging** (`/opt/vtrack-dev`) | `deploy-dev.yml` |
| `feature/*`, `bugfix/*` | — (local testing only) | — |

---

## Branch Types

### Long-Lived Branches (Never Delete)

| Branch | Purpose | Deploys To | Who Can Merge |
|---|---|---|---|
| `main` | Production-ready code | Production VPS | Maintainers only (via PR) |
| `development` | Integration & staging | Dev VPS | Maintainers (via PR from feature branches) |

### Short-Lived Branches (Create → Merge → Delete)

| Branch Type | Purpose | Created From | Merges Into | Lifetime |
|---|---|---|---|---|
| `feature/*` | New functionality | `development` | `development` | Days to 2 weeks |
| `bugfix/*` | Non-critical bug fixes | `development` | `development` | Hours to days |
| `hotfix/*` | 🚨 Critical production fixes | `main` | `main` + backport to `development` | Hours |
| `release/*` | Release preparation & version bump | `development` | `main` (with tag) | Hours to 1 day |
| `docs/*` | Documentation-only changes | `development` | `development` | Hours to days |

---

## Naming Conventions

### Pattern

```
<type>/<short-kebab-case-description>
```

### Rules

- Use **lowercase letters, numbers, and hyphens** only
- Keep descriptions between **3–40 characters**
- Use the **issue number** as a prefix when applicable
- Never use spaces, underscores, or uppercase letters

### Regex Validation

```regex
^(feature|bugfix|hotfix|release|docs)\/[a-z0-9][a-z0-9-]{2,40}$
```

### Examples

| ✅ Good | ❌ Bad | Why Bad |
|---|---|---|
| `feature/pwa-support` | `PWA-support` | Missing type prefix, uppercase |
| `feature/42-dark-theme` | `feature/Add_Dark_Theme` | Underscores, uppercase |
| `bugfix/timer-save-crash` | `fix-timer` | Missing type prefix |
| `hotfix/auth-token-expiry` | `hotfix/fix the auth bug` | Spaces in name |
| `release/v1.11.0` | `release-1.11` | Wrong separator, incomplete semver |
| `docs/api-reference` | `analyze-docker-container-architecture` | No type prefix, too long |

---

## Workflow Diagrams

### Feature Development Flow

```
   development          feature/pwa-support
       │                       │
       ├──── checkout ────────▶│
       │                       ├── commit: feat: add manifest.json
       │                       ├── commit: feat: add service worker
       │                       ├── commit: test: verify offline mode
       │                       │
       │◀── PR (squash merge) ─┤
       │                       │ ← DELETE branch
       │
       │ (deploy-dev.yml triggers → staging deploy)
       │
```

### Release Flow

```
   development        release/v1.11.0           main
       │                     │                    │
       ├── checkout ────────▶│                    │
       │                     ├── bump version     │
       │                     ├── update changelog │
       │                     │                    │
       │                     ├── PR ─────────────▶│
       │                     │                    ├── git tag v1.11.0
       │                     │ ← DELETE branch    │
       │                     │                    │ (deploy-prod.yml triggers)
       │                     │                    │
```

### Hotfix Flow

```
       main               hotfix/auth-crash       development
        │                       │                      │
        ├── checkout ──────────▶│                      │
        │                       ├── fix: patch auth    │
        │                       │                      │
        │◀── PR (merge) ───────┤                      │
        │                       │                      │
        ├── git tag v1.11.1     ├── backport PR ──────▶│
        │                       │                      │
        │ (prod deploy)         │ ← DELETE branch      │
        │                       │                      │
```

---

## Feature / Bugfix Workflow

### Step-by-Step

#### 1. Create your branch from `development`

```bash
git checkout development
git pull origin development
git checkout -b feature/your-feature-name
```

#### 2. Make your changes

```bash
# Work on your changes, commit often
git add .
git commit -m "feat: add offline mode with service worker"
```

#### 3. Keep your branch up to date

```bash
# Rebase onto latest development to avoid merge conflicts
git fetch origin
git rebase origin/development
```

#### 4. Push and open a Pull Request

```bash
git push origin feature/your-feature-name
```

Then open a PR targeting `development` on GitHub.

#### 5. After PR is approved and merged

```bash
# Clean up your local branch
git checkout development
git pull origin development
git branch -d feature/your-feature-name
```

> **Merge Strategy**: Use **Squash and Merge** for feature/bugfix branches to keep `development` history clean. Each PR becomes a single, descriptive commit.

---

## Release Workflow

When `development` is stable and ready for production:

#### 1. Create a release branch

```bash
git checkout development
git pull origin development
git checkout -b release/v1.11.0
```

#### 2. Prepare the release

- Bump version numbers in `index.html` (header subtitle, CSS version tag)
- Bump the Docker image tag in `docker-compose.yml`
- Update `CHANGELOG.md` with release notes
- Commit:

```bash
git add .
git commit -m "chore: bump version to v1.11.0 and update changelog"
```

#### 3. Open PR to `main`

```bash
git push origin release/v1.11.0
```

Open a PR: `release/v1.11.0` → `main`

#### 4. After merge — tag the release

```bash
git checkout main
git pull origin main
git tag -a v1.11.0 -m "Release v1.11.0: <brief description>"
git push origin v1.11.0
```

#### 5. Create a GitHub Release

Go to **Releases → Draft a new release** on GitHub:
- Choose tag: `v1.11.0`
- Title: `v1.11.0 — <Feature Name>`
- Description: Copy from `CHANGELOG.md`

#### 6. Cleanup

```bash
git branch -d release/v1.11.0
git push origin --delete release/v1.11.0
```

---

## Hotfix Workflow

For **critical production bugs** that cannot wait for a normal release cycle:

#### 1. Create hotfix from `main`

```bash
git checkout main
git pull origin main
git checkout -b hotfix/describe-the-issue
```

#### 2. Fix the issue (minimal changes only)

```bash
git add .
git commit -m "fix: resolve critical auth token expiry crash"
```

#### 3. Open PR to `main`

```bash
git push origin hotfix/describe-the-issue
```

Open a PR: `hotfix/describe-the-issue` → `main`

#### 4. After merge — tag with patch version

```bash
git checkout main
git pull origin main
git tag -a v1.11.1 -m "Hotfix v1.11.1: auth token expiry crash"
git push origin v1.11.1
```

#### 5. Backport to `development`

```bash
git checkout development
git pull origin development
git merge hotfix/describe-the-issue
git push origin development
```

Or open a second PR: `hotfix/describe-the-issue` → `development`

#### 6. Cleanup

```bash
git branch -d hotfix/describe-the-issue
git push origin --delete hotfix/describe-the-issue
```

---

## Branch Protection Rules

Configure these in **GitHub → Settings → Branches → Add branch protection rule**:

### Rule 1: `main`

| Setting | Value |
|---|---|
| **Branch name pattern** | `main` |
| Require a pull request before merging | ✅ |
| Required number of approving reviews | `1` |
| Dismiss stale pull request approvals when new commits are pushed | ✅ |
| Require status checks to pass before merging | ✅ (when CI tests are added) |
| Require branches to be up to date before merging | ✅ |
| Do not allow bypassing the above settings | ✅ |
| Restrict who can push to matching branches | ✅ (maintainers only) |
| Allow force pushes | ❌ |
| Allow deletions | ❌ |

### Rule 2: `development`

| Setting | Value |
|---|---|
| **Branch name pattern** | `development` |
| Require a pull request before merging | ✅ |
| Required number of approving reviews | `0` (allow self-merge for maintainers) |
| Allow force pushes | ❌ |
| Allow deletions | ❌ |

### Step-by-Step: How to Configure Branch Protection on GitHub

#### For `main` branch:

1. Go to your repository: **https://github.com/redveera2000/MYFITAPP**
2. Click **Settings** (gear icon, top right of the repo page)
3. In the left sidebar, click **Branches** (under "Code and automation")
4. Click **Add branch protection rule** (or "Add classic branch protection rule")
5. In **Branch name pattern**, type: `main`
6. Check the following boxes:
   - ✅ **Require a pull request before merging**
     - Set **Required number of approving reviews before merging** to `1`
     - ✅ Check **Dismiss stale pull request approvals when new commits are pushed**
   - ✅ **Require status checks to pass before merging** (enable this after adding CI tests)
     - ✅ Check **Require branches to be up to date before merging**
   - ✅ **Do not allow bypassing the above settings**
7. Under **Restrict who can push to matching branches**:
   - ✅ Enable and add yourself as the only allowed user
8. Ensure these are **unchecked**:
   - ❌ Allow force pushes
   - ❌ Allow deletions
9. Click **Create** (or **Save changes**)

#### For `development` branch:

1. Still on **Settings → Branches**, click **Add branch protection rule** again
2. In **Branch name pattern**, type: `development`
3. Check the following boxes:
   - ✅ **Require a pull request before merging**
     - Set **Required number of approving reviews** to `0`
4. Ensure these are **unchecked**:
   - ❌ Allow force pushes
   - ❌ Allow deletions
5. Click **Create** (or **Save changes**)

> **Note**: Branch protection rules require the repository to be **public**, or you must be on a **GitHub Pro/Team** plan for private repos.

---

## Git Tags & Versioning

### Semantic Versioning

This project follows [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`):

| Component | When to Increment | Example |
|---|---|---|
| **MAJOR** | Breaking changes or major rewrites | `v2.0.0` |
| **MINOR** | New features (backward compatible) | `v1.11.0` |
| **PATCH** | Bug fixes and hotfixes | `v1.11.1` |

### Tagging Rules

- **Always use annotated tags** (`git tag -a`) — never lightweight tags
- **Tag format**: `v<MAJOR>.<MINOR>.<PATCH>` (e.g., `v1.11.0`)
- **Tag message**: Brief description of the release (e.g., `"Release v1.11.0: PWA Support"`)
- **When to tag**: After merging a release or hotfix branch into `main`
- **Push tags**: Always push tags explicitly (`git push origin <tag>`)

### Listing Tags

```bash
# List all tags
git tag -l

# List tags matching a pattern
git tag -l "v1.10.*"

# View tag details
git show v1.10.0
```

---

## Stale Branch Cleanup

### Policy

- Feature, bugfix, and hotfix branches must be **deleted after merge**
- Release branches must be **deleted after tagging**
- Branches with no activity for **30+ days** should be reviewed and deleted

### Cleanup Commands

```bash
# List remote branches merged into development
git branch -r --merged origin/development

# Delete a remote branch
git push origin --delete <branch-name>

# Delete a local branch
git branch -d <branch-name>

# Prune stale remote-tracking references
git fetch --prune
```

---

## Quick Reference

### Cheat Sheet

```bash
# Start a new feature
git checkout development && git pull origin development
git checkout -b feature/my-feature

# Start a bugfix
git checkout development && git pull origin development
git checkout -b bugfix/describe-bug

# Start a hotfix (EMERGENCY)
git checkout main && git pull origin main
git checkout -b hotfix/critical-fix

# Prepare a release
git checkout development && git pull origin development
git checkout -b release/v1.12.0

# Tag a release
git tag -a v1.12.0 -m "Release v1.12.0: Feature Description"
git push origin v1.12.0

# Clean up after merge
git branch -d feature/my-feature
git push origin --delete feature/my-feature
```

### Decision Tree

```
Is it a critical production bug?
  ├── YES → hotfix/* from main
  └── NO
       ├── Is it a new feature? → feature/* from development
       ├── Is it a bug fix? → bugfix/* from development
       ├── Is it documentation only? → docs/* from development
       └── Is development ready for production? → release/* from development
```

---

## Related Documents

- [CONTRIBUTING.md](CONTRIBUTING.md) — How to contribute (includes branch naming quick reference)
- [CHANGELOG.md](CHANGELOG.md) — Version history and release notes
- [deploy-dev.yml](.github/workflows/deploy-dev.yml) — Development CI/CD pipeline
- [deploy-prod.yml](.github/workflows/deploy-prod.yml) — Production CI/CD pipeline
