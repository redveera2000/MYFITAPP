# Changelog

All notable changes to the AESTHETIX V-TRACK fitness tracker will be documented in this file.

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
