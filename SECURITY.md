# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 1.10.x  | ✅ Active support  |
| < 1.10  | ❌ No longer supported |

## Reporting a Vulnerability

We take the security of AESTHETIX V-Track seriously. If you discover a security vulnerability, please report it responsibly.

### How to Report

**⚠️ Do NOT open a public GitHub issue for security vulnerabilities.**

Instead, please report them via one of these channels:

1. **Email**: Send a detailed report to **veeradinesh219@gmail.com** with the subject line: `[SECURITY] V-Track Vulnerability Report`
2. **GitHub Security Advisories**: Use [GitHub's private vulnerability reporting](https://github.com/redveera2000/MYFITAPP/security/advisories/new) to submit a confidential report

### What to Include

- **Description** of the vulnerability
- **Steps to reproduce** the issue
- **Impact assessment** (what could an attacker achieve?)
- **Affected components** (e.g., Firebase Auth, Google Fit API, Docker config)
- **Suggested fix** (if you have one)

### What to Expect

- **Acknowledgment**: Within 48 hours of your report
- **Assessment**: We'll evaluate the severity within 1 week
- **Resolution**: Critical vulnerabilities will be patched as soon as possible
- **Credit**: You'll be credited in the release notes (unless you prefer anonymity)

## Security Considerations

This application handles sensitive data including:

- **User authentication credentials** (Firebase Auth)
- **Health and fitness data** (workout logs, body weight, step counts)
- **Google Fit OAuth tokens** (Google Health API integration)
- **Personal health metrics** (heart rate, calories, distance)

### For Contributors

When contributing to this project, please ensure:

- Never commit secrets, API keys, or credentials to the repository
- Use the `.env.example` template for environment variable references
- Follow the principle of least privilege for Firebase security rules
- Sanitize all user inputs before processing
- Review the `firestore.rules` file before modifying database access patterns
