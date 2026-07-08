## 📝 Description

<!-- Describe what this PR does and why. Link to relevant issue(s). -->

Fixes #(issue_number)

## 🔄 Type of Change

<!-- Check the relevant option(s) -->

- [ ] 🐛 Bug fix (non-breaking change that fixes an issue)
- [ ] ✨ New feature (non-breaking change that adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to change)
- [ ] 📝 Documentation update
- [ ] ♻️ Refactor (no functional changes)
- [ ] ⚡ Performance improvement
- [ ] 🎨 Style / UI change
- [ ] 🚀 Production release (`development` → `main`)

## 🧪 How Has This Been Tested?

<!-- Describe the tests you ran to verify your changes. -->

- [ ] Tested locally with Docker (`docker compose up --build`)
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested on mobile viewport (Chrome DevTools responsive mode)
- [ ] No console errors or warnings
- [ ] All 5 tabs still work (Dashboard, Program, History, Insights, Settings)

## 📸 Screenshots (if UI change)

<!-- Add before/after screenshots for any visual changes -->

| Before | After |
|--------|-------|
|        |       |

## ✅ Pre-Merge Checklist

### Code Quality
- [ ] My code follows the project's code style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code where necessary (especially complex logic)
- [ ] No `var` declarations — only `const` and `let`
- [ ] No leftover `console.log` debug statements

### Security
- [ ] No secrets, API keys, or credentials are committed
- [ ] `.env` file is NOT tracked by git
- [ ] User inputs are sanitized (no unsafe `innerHTML` with user data)

### UI/UX (if applicable)
- [ ] Glassmorphic dark theme aesthetic maintained
- [ ] Mobile responsive — tested on phone viewport
- [ ] Animations are smooth with no layout shift

### Docker & Deployment
- [ ] `docker compose build --no-cache` succeeds
- [ ] Container starts and serves the app at `localhost:8080`

### Documentation
- [ ] I have updated the `CHANGELOG.md` (if applicable)
- [ ] Any new files are added to the `COPY` commands in `Dockerfile` (if applicable)

---

<details>
<summary><strong>🚀 Production Release Checklist</strong> (expand for <code>development</code> → <code>main</code> PRs only)</summary>

### Version & Release Prep
- [ ] Version number bumped in `index.html` (header subtitle + CSS `?v=` tag)
- [ ] Docker image tag bumped in `docker-compose.yml`
- [ ] `CHANGELOG.md` updated with new version section, date, and all changes

### Staging Verification
- [ ] Feature has been deployed and verified on the **staging/dev server**
- [ ] Verified on staging for at least 24 hours with no issues

### Full Application Smoke Test
- [ ] **Auth flow**: Login → use app → logout → login works without errors
- [ ] **Dashboard tab**: Active logger loads, timer works, exercise cards render
- [ ] **Program tab**: Workout program and baselines display correctly
- [ ] **History tab**: Training history logs show past sessions with correct data
- [ ] **Insights tab**: Volume chart renders, recovery monitor shows, step tracker works
- [ ] **Data persistence**: Log a workout → reload page → data persists (Cloud Synced indicator)
- [ ] **Export/Import**: Backup export → clear data → import backup → all data restored
- [ ] **Google Fit** (if applicable): Step sync, manual entry, and CSV import work

### Final Checks
- [ ] Zero console errors on all tabs (desktop + mobile)
- [ ] `firestore.rules` unchanged OR explicitly reviewed for security
- [ ] No regressions from previous release functionality
- [ ] PR title follows format: `release: v1.X.0 — <Feature Name>`

### Post-Merge Actions (after merging)
- [ ] Create git tag: `git tag -a v1.X.0 -m "Release v1.X.0: <description>"`
- [ ] Push tag: `git push origin v1.X.0`
- [ ] Create GitHub Release with changelog notes
- [ ] Verify production deployment is live and healthy

</details>
