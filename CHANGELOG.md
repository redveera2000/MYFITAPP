# Changelog

All notable changes to the AESTHETIX V-TRACK fitness tracker will be documented in this file.

---

## [1.9.3] - 2026-06-28
### Fixed
- **Timer Firestore Sync:** Fixed a critical bug where `durationSeconds` (Workout Timer) was not being saved to or loaded from the cloud Firestore database, causing the timer data to be lost upon browser refresh or logging in on a new device.
- **Tracker UI Improvements:** The Tracker tab now prominently displays the total duration of a completed workout directly inside the "COMPLETED ✓" status badge at the top of the page when reviewing past dates.

## [1.9.2] - 2026-06-28
### Performance
- **Instant Login UI:** The login screen now disappears instantly upon authentication instead of freezing while historical data downloads.
- **Concurrent Syncing:** The `loadFromFirestore` sync pipeline now utilizes `Promise.all()` to download all user data (profile, history, weights, etc.) simultaneously, dramatically reducing login loading time.

## [1.9.1] - 2026-06-28
### Fixed
- **Weight Log Banner:** The missing weight log banner is now globally visible on all tabs (including Dashboard) and re-evaluates correctly after Firebase synchronization finishes.
- **Timer Save Bug:** Fixed an issue where clicking "Save & Check Progression" after all exercises were individually saved would skip halting and saving the timer duration. Timer duration now properly saves to training history.

## [1.9.0] - 2026-06-24
### Added — Workout Duration Timer
- **⏱️ Active Session Timer**: Added a real-time workout timer on the Dashboard tab. The timer automatically manages elapsed time scoped to the specific date and workout session (e.g. Push Day 1), persists across browser reloads via LocalStorage state management, and captures the total duration upon saving.
- **📊 History Log Duration Metrics**: Logged workout durations are now visually displayed alongside the completion date and name in the Training History tab.

### Changed
- **Cache-busting**: Bumped all asset imports in `index.html` to `?v=1.9.0` to force cache refresh.
- **Docker Compose**: Bumped default production docker image tag to `1.9.0`.

---

## [1.8.0] - 2026-06-17
### Added — Deep Research & Recommendations Dashboard
- **📈 Progressive Overload Volume Chart**: Added a dedicated `Insights & Recovery` tab featuring a dynamic chart that visualizes Total Session Volume (Sets × Reps × Weight) for the last 8 training sessions. The underlying algorithm computes moving averages to detect whether training volume is successfully scaling up over time.
- **🔋 Recovery & CNS Monitor**: Implemented a state-based fatigue detection engine. It actively parses recent history to flag extended training streaks (e.g., 6+ consecutive days) and high-tax Central Nervous System (CNS) events like heavy Leg Days, providing real-time scientific recovery recommendations.
- **🧠 Holistic Data Analysis**: Built a cross-referencing engine (`generateHolisticInsights`) that evaluates body weight trends against workout volume trends to identify critical progression states such as *Ultimate Recomposition*, *Excessive Deficit Risk*, or *Solid Bulking Phase*.

### Changed
- **Cache-busting**: Bumped all asset imports in `index.html` to `?v=1.8.0` to force cache refresh.
- **Docker Compose**: Bumped default production docker image tag to `1.8.0`.

---

## [1.7.3] - 2026-06-17
### Fixed
- **🎯 Progressive Overload History Context**: Fixed a critical bug in the workout target calculator and UI renderer where "Next Target" reps and weights, along with the "Last Session" display, would fail to load or incorrectly revert to baseline default values when logging multiple distinct instances of the same workout key or after clicking the "Edit Log" button. The historical lookup mechanism has been hardened to securely filter the history sequence for the exact requested exercise from the strictly preceding date context.

### Changed
- **Cache-busting**: Bumped all asset imports in `index.html` to `?v=1.7.3` to force cache refresh.
- **Docker Compose**: Bumped default production docker image tag to `1.7.3`.

---

## [1.7.2] - 2026-06-11
### Added
- **❌ Routine Exercise Deletion**: Added a "Remove Exercise" action button (subtle red glassmorphic design) to each exercise row in the **Workout Program & Baselines** tab. Deleting an exercise removes it from future logs without altering past history records.
- **🗑️ Active Session Discarding**: Added a "Discard Session" option in the **Workout Dashboard** active logger. Users can now clear/delete all logged sets for the selected date and session in one click, syncing deletions to Cloud Firestore.

### Changed
- **Cache-busting**: Bumped all asset imports in `index.html` to `?v=1.7.2` to force cache refresh.
- **Docker Compose**: Bumped default production docker image tag to `1.7.2`.

---

## [1.7.1] - 2026-06-11
### Fixed
- **🛡️ Secure Access Gateway Boot Flow**: Added robust defensive structural validation and loading guards for `customProgram` mapping. This prevents corrupt local storage state or uninitialized cache properties from triggering a fatal `TypeError` on boot, resolving the login gate initialization block.

### Changed
- **Cache-busting**: Bumped all frontend asset query parameters to `?v=1.7.1` to force browser cache reload.
- **Docker Compose**: Bumped production container reference to `1.7.1`.

---

## [1.7.0] - 2026-06-11
### Added
- **🏋️‍♂️ Dynamic Routine Customizer**: Users can now add new custom exercises dynamically to any Push/Pull/Legs training day via a modal form on the Program tab.
- **💾 Automated VPS Backups**: Containerized Node.js script using the Firebase Admin SDK to fetch all database collections (profiles, targets, history, weight logs) and store rolling 30-day backups on the VPS host disk.
- **🔄 Live Frontend Restore Sync**: Upgraded the backup import logic to write directly to Firestore (via `migrateFromLocalStorage`), fixing the issue where imported backups were overwritten by Firestore cloud data on page reload.
- **⚙️ Version Header Display**: Bumped the visual subtitle version indicator in the application header to dynamically reflect the correct software release (`v1.7.0`).

### Changed
- **Cache-busting**: Bumped asset tags in `index.html` to `?v=1.7.0` to force browser cache refresh.
- **Docker Compose**: Bumped the production default image tag in `docker-compose.yml` to `1.7.0`.

### Fixed
- **🧠 Recommendation Engine Reference Error**: Resolved a `TypeError` on startup caused by the Smart Coach engine accessing `customProgram` directly on the recommendation engine class instead of via the `StateManager` state container.

---

## [1.6.1] - 2026-06-11
### Fixed
- **UI Sets Render Bug**: Fixed a bug where exercises with 2 prescribed sets (like JM Presses, Cable Flys, and Hammer Curls) rendered with 3 sets in the active logger. It now matches the prescribed target program sets count.
- **Cache-busting**: Bumped asset tags to `?v=1.6.1` to force browser cache refresh.

---

## [1.6.0] - 2026-06-10
### Added — Smart Training Coach (Progressive Overload Recommendation System)
- **🧠 RecommendationEngine Class**: New `RecommendationEngine` in `app.js` with 7 evidence-based detection algorithms for analyzing workout performance:
  - **Weight Deviation Detection**: Alerts when logged weight is 15%+ above target (warning) or 30%+ above (critical ego-lifting). Also detects when weight is 20%+ below target (sandbagging).
  - **Set Count Anomaly Detection**: Warns when fewer sets than prescribed are completed (volume loss) or excess sets are logged (junk volume).
  - **Rep Distribution Analysis**: Detects erratic rep performance (high variance across sets), indicating weight may be too heavy.
  - **Plateau Detection**: Identifies when performance stalls for 3+ consecutive sessions at the same weight and reps.
  - **Missed Progression Detection**: Alerts when user hits max reps on all sets for 2+ sessions without increasing weight.
  - **Overreaching Detection**: Critical alert when reps decline across 3+ consecutive sessions (fatigue accumulation), recommending a deload week.
- **📊 Dashboard Smart Coach Alerts Panel**: New glassmorphic panel at the top of the Dashboard tab showing persistent training alerts with severity color-coding (🔴 Critical, 🟡 Warning, 🟢 Info).
- **⚡ Modal Training Insights Section**: Enhanced overload recommendation modal now includes a "Training Insights" section showing real-time Smart Coach alerts alongside the existing progressive overload calculations.
- **🎨 Severity-Coded Alert Cards**: Individual alert cards with severity-specific styling (red border for critical, amber for warning, green for info), micro-animations (slide-in entry, pulse for critical alerts), and actionable recommendation boxes.

### Changed
- **`showOverloadModal()`**: Updated to accept a second `coachAlerts` parameter for displaying training insights alongside overload updates.
- **`saveSingleLift()` & `submitLoggedWorkout()`**: Both save paths now run the Smart Coach analysis engine after saving, collecting alerts to display in the modal.
- **`refreshAllUI()`**: Now includes `renderCoachAlerts()` call for dashboard alert updates.
- **Cache-busting**: All asset imports bumped to `?v=1.6.0`.
- **Docker**: Image tag bumped to `1.6.0`.

---

## [1.5.2] - 2026-06-10
### Fixed
- **🔒 Secured Auth Error Outputs**: Removed expected authorized email details from console logs and user interface error screens to prevent unauthorized email leaks.
- **⚙️ Updated Default Authorized User**: Changed the default authorized single-user email configuration and fallback to `[EMAIL_ADDRESS]`.
- **index.html updated**: Bumped version tag to `1.5.2` for browser cache busting.
- **docker-compose.yml updated**: Bumped image tag and default fallback to `1.5.2`.

---

## [1.5.1] - 2026-06-10
### Fixed
- **🔍 Improved Auth Error Transparency**: Updated login error messages to output the expected authorized email if an "Access Denied" or "Registration Restricted" check triggers. This ensures easy debugging of host environment configuration mismatches.
- **index.html updated**: Bumped version tag to `1.5.1` to break cache.
- **docker-compose.yml updated**: Bumped image tag to `1.5.1`.

---

## [1.5.0] - 2026-06-10
### Added
- **🔒 Compulsory Secure Login Gateway**: Replaced automated credential bypass with a fullscreen credential entry screen. Users must sign in to view the dashboard or interact with data.
- **🛡️ Secure Restricted Registration**: Registration is locked client-side to only allow registration of the pre-authorized administrator email (`SINGLE_USER_EMAIL`), preventing external signup vectors.
- **👁️ Password Visibility Switcher**: Added a toggle button in the password input field to securely show/hide passwords during entry.
- **🚪 Manual Sign-Out**: Added a logout button in the dashboard quick profile header to sign out securely at any time.

### Changed
- **app.js & index.html refactored**: Completely restructured the DOMContentLoaded rendering path to prevent unauthenticated data leaks, added dynamic loading spinners, validation warnings, and modal overlay state machines.
- **index.css styling updated**: Added high-fidelity glassmorphic overlay stylesheets, animated spinner keyframes, and input focus state glows.
- **docker-compose.yml updated**: Bumped image tag to `1.5.0`.

---

## [1.4.0] - 2026-06-10
### Added
- **🔒 Stable Single-User Authentication**: Replaced Firebase Anonymous Auth with an automated Email/Password login mechanism. The app now automatically signs in as a single permanent user, preventing the creation of multiple user profiles when the browser cache or history is cleared.
- **⚙️ Secure Customizable Credentials**: Added support for `SINGLE_USER_EMAIL` and `SINGLE_USER_PASSWORD` environment variables in Docker, Nginx, and GitHub Actions deployments, with automated fallback defaults.

### Changed
- **docker-compose.yml updated**: Added `SINGLE_USER_EMAIL` and `SINGLE_USER_PASSWORD` with default fallbacks, and bumped the image tag to `1.4.0`.
- **nginx/configure-firebase.sh updated**: Configured dynamic substitution for the new environment variables into the frontend config.
- **.github/workflows/deploy.yml updated**: Configured GitHub Secrets injection for authentication parameters during deploy.

---

## [1.3.0] - 2026-06-10
### Added
- **🔥 Firebase Firestore Integration**: Migrated data persistence from `localStorage` to Cloud Firestore (serverless NoSQL database). All workout history, exercise targets, weight logs, and profile data now persist in the cloud.
- **☁️ Cloud Sync Status Indicator**: Added a real-time sync status indicator in the header bar showing connection state (`Cloud Synced` / `Syncing...` / `Local Only` / `Offline`).
- **🔄 Automatic Data Migration**: First-time users with existing localStorage data get a seamless one-time migration to Firestore with zero data loss.
- **📴 Offline Support**: Built-in Firestore offline persistence — the app works fully offline and auto-syncs when connectivity returns.
- **🔒 Firebase Anonymous Auth**: Frictionless authentication with no login screen required. Data is user-scoped and secured via Firestore Security Rules.
- **💾 Dual-Write Architecture**: All save operations write to both localStorage (fast cache) and Firestore (cloud persistence) for maximum reliability.
- **🔑 Environment Variable Dynamic Injection**: Removed all hardcoded credentials from codebase and replaced them with placeholders injected dynamically from GitHub Secrets / Environment Variables at container startup.

### Changed
- **StateManager refactored**: Constructor now supports async Firebase initialization while maintaining synchronous localStorage loading for instant first paint.
- **Docker image & Nginx updated**: Integrated an entrypoint template processor script (`configure-firebase.sh`), mapped variables in `docker-compose.yml`, and updated the Nginx Content Security Policy (CSP) to permit Firestore connections and script loads from `gstatic.com`.
- **Docker image bumped**: Image tag updated to `1.3.0`.

### Infrastructure
- **New files**: `firebase-config.js` (Firebase SDK initialization), `db-service.js` (Firestore CRUD service layer).
- **Firebase SDK**: Added Firebase v10 compat CDN scripts (App, Auth, Firestore) to `index.html`.

---

## [1.2.2] - 2026-06-10
### Added
- **Workout Status Badge**: Added a dynamic completion badge (`IN PROGRESS` / `COMPLETED ✓`) next to the Workout Session selector dropdown to indicate logging status.
### Fixed
- **Accidental Double Submission**: Prevented duplicate logs and sync webhooks by disabling buttons immediately on click and implementing backend state validators in `StateManager`.
- **Deduplication of History Logs**: Added history parsing filters to automatically remove any duplicate daily session logs from local storage databases.

---

## [1.2.1] - 2026-06-10
### Fixed
- **Weight Logging Sync**: Fixed a bug where editing or logging a past daily weight incorrectly updated the active profile weight to that historical value instead of preserving the most recent chronological weight.

---

## [1.2.0] - 2026-06-10
### Added
- **Single Exercise Saving**: Added card-level "Save Exercise" buttons to save sets for each exercise independently, avoiding accidental logs.
- **Card-Level Locking**: Saved exercise cards now disable input fields, turn borders green, and display a "Saved" badge.
- **Log Re-editing**: Added an "Edit Log" option on saved cards that prompts a confirmation dialog to unlock inputs and allow revisions.
- **Isolated History Logs**: Relocated the training history database logs from settings into a dedicated, easily accessible "Training History" navigation tab.
- **Date Picker & Weekday Automation**: Defaults to local timezone date instead of UTC, and displays a dynamic weekday label (e.g. Wednesday) that syncs automatically.

### Fixed
- **Progressive Overload baseline**: Changed calculations to use user-entered manual weights instead of default suggestions.

---

## [1.1.0] - 2026-06-06
### Added
- **Docker Containerization**: Set up an Nginx 1.27 Alpine container configuration.
- **Security & Caching Rules**: Enforced custom secure response headers, compression, caching policies, and CSP rules.
- **GitHub Actions CI/CD**: Established workflows to automatically pull code, build docker container, and deploy to live server on git push.

### Fixed
- **Mobile Viewport Overlaps**: Refined responsive styling to resolve text overlaps on mobile screens.

---

## [1.0.0] - 2026-06-06
### Added
- Core progressive overload tracker with PPL split.
- Mifflin-St Jeor TDEE calorie target and macro splits calculator.
- Progress visualization charts (weight loss and total volume index).
- Google Sheets background webhook integration.
