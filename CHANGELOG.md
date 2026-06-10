# Changelog

All notable changes to the AESTHETIX V-TRACK fitness tracker will be documented in this file.

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
