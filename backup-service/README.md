# V-TRACK Automated Firestore Backup Service

This directory contains a lightweight, automated backup service that fetches your Firestore collections and saves them to a JSON file. It runs in a Docker container on your VPS as a daily cron job.

---

## 🚀 Setup Instructions

### 1. Download Firebase Service Account Key
To query Firestore securely from the server, you need a Service Account credentials key:
1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Click the ⚙️ gear icon next to **Project Overview** and select **Project settings**.
3. Go to the **Service accounts** tab.
4. Click **Generate new private key** (leave "Node.js" selected).
5. A JSON file will download. Rename this file to `service-account.json` and place it inside this `backup-service` folder.

### 2. Copy folder to your VPS
When this code is pushed to your production server via Git, the `backup-service` folder will be available on your VPS at `/opt/vtrack/backup-service` (or `/opt/vtrack-dev/backup-service` for development).
* *Note: Ensure your `service-account.json` is secure. The `.gitignore` file is configured to prevent committing this file to your public repository.*

### 3. Build the Docker Image
On your VPS terminal, navigate to the folder and build the Docker image:
```bash
cd /opt/vtrack/backup-service
docker build -t vtrack-db-backup .
```

### 4. Run a Test Backup
Execute the container once to verify it correctly connects to Firestore and writes the backup:
```bash
docker run --rm \
  -v /opt/vtrack-backups:/opt/vtrack-backups \
  -v $(pwd)/service-account.json:/app/service-account.json \
  vtrack-db-backup
```
Check if a timestamped backup file was created on the VPS at `/opt/vtrack-backups/`.

### 5. Schedule Daily Backups (Cron)
Open the Linux crontab editor on your VPS:
```bash
crontab -e
```
Add the following line to automatically run the backup container every night at 2:00 AM, keeping a running log at `/var/log/vtrack-backup.log`:
```cron
0 2 * * * docker run --rm -v /opt/vtrack-backups:/opt/vtrack-backups -v /opt/vtrack/backup-service/service-account.json:/app/service-account.json vtrack-db-backup >> /var/log/vtrack-backup.log 2>&1
```

---

## 🗄️ Backup Retention
By default, the script retains backups for **30 days**. Older backups are automatically deleted when a new backup runs.
* To adjust the retention window, you can pass a `RETAIN_DAYS` environment variable to the docker container:
```bash
-e RETAIN_DAYS=14
```
