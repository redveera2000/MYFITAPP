# V-TRACK Automated Firestore Backup Service

This directory contains a lightweight, automated backup service that fetches your Firestore collections and saves them to a local JSON file. It runs in a Node.js Docker container on your system via a scheduled cron job (Ubuntu VPS or macOS).

---

## 🚀 Setup Instructions

### 1. Download Firebase Service Account Key
To query Firestore securely from the server, you need a Service Account credentials key:
1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Click the ⚙️ gear icon next to **Project Overview** and select **Project settings**.
3. Go to the **Service accounts** tab.
4. Click **Generate new private key** (leave "Node.js" selected).
5. A JSON file will download. Rename this file to `service-account.json` and place it inside this `backup-service` folder.

### 2. Copy the Folder to your Target System (VPS or Local Mac)
* **On VPS**: When this code is pushed to your development/production environment via Git, the `backup-service` folder is available at `/opt/vtrack/backup-service` (or `/opt/vtrack-dev/backup-service`).
* **On Mac**: Locate your workspace directory (e.g. `/Users/veeradinesh/Documents/Project-x/FITNESS TRACKER/backup-service`).
* *Note: Ensure your `service-account.json` is secure. The `.gitignore` file is configured to prevent committing this file to your public repository.*

### 3. Build the Docker Image
On your terminal, navigate to the `backup-service` folder and build the Docker image:
```bash
cd backup-service
docker build -t vtrack-db-backup .
```

### 4. Run a Test Backup
Execute the container once manually to verify it correctly connects to Firestore and writes the backup:
```bash
# For remote VPS / Linux systems:
docker run --rm \
  -v /opt/vtrack-backups:/opt/vtrack-backups \
  -v $(pwd)/service-account.json:/app/service-account.json \
  vtrack-db-backup

# For local macOS systems (saving to your user documents folder):
docker run --rm \
  -v ~/Documents/vtrack-backups:/opt/vtrack-backups \
  -v $(pwd)/service-account.json:/app/service-account.json \
  vtrack-db-backup
```
Check if a timestamped backup file was created inside the target backups folder.

---

## ⏱️ Scheduling Automated Backups

Depending on where you run the backup job, configure the cron scheduler as follows:

### Option A: On Remote Linux VPS (Ubuntu)
1. **Locate your absolute Docker executable path**:
   ```bash
   which docker
   ```
   *(Usually `/usr/bin/docker` or `/usr/local/bin/docker`)*
2. **Open the Crontab editor**:
   * For the current user (if added to the `docker` group): `crontab -e`
   * Under root (recommended if permissions are restricted): `sudo crontab -e`
3. **Add the hardened cron rule**:
   *(This example runs daily at 2:00 AM, using absolute path and saving logs to a safe home directory)*
   ```cron
   0 2 * * * /usr/bin/docker run --rm -v /opt/vtrack-backups:/opt/vtrack-backups -v /opt/vtrack/backup-service/service-account.json:/app/service-account.json vtrack-db-backup >> /home/ubuntu/vtrack-backup.log 2>&1
   ```
   *Make sure to substitute `/usr/bin/docker` with your output from step 1, and make sure `/opt/vtrack-backups` exists and has proper read/write permissions.*

---

### Option B: On Local Mac (macOS)
Due to security sandboxing in macOS Catalina and later, standard `cron` cannot access user directories unless explicitly granted system-wide permission.

#### Path 1: System Cron Hack (Quickest)
1. Open **System Settings** -> **Privacy & Security** -> **Full Disk Access**.
2. Click the `+` button and add the cron binary `/usr/sbin/cron` to the list. (To find it, press `Cmd + Shift + G` in the finder dialog and type `/usr/sbin/cron`).
3. Find your absolute docker path: `which docker` (usually `/usr/local/bin/docker` or `/opt/homebrew/bin/docker`).
4. Edit your user crontab:
   ```bash
   crontab -e
   ```
5. Add the cron rule pointing to a writable folder in your user space:
   ```cron
   0 2 * * * /usr/local/bin/docker run --rm -v /Users/veeradinesh/Documents/vtrack-backups:/opt/vtrack-backups -v /Users/veeradinesh/Documents/Project-x/FITNESS\ TRACKER/backup-service/service-account.json:/app/service-account.json vtrack-db-backup >> /Users/veeradinesh/Documents/vtrack-backups/vtrack-backup.log 2>&1
   ```

#### Path 2: Launchd Agent (macOS Standard)
Instead of cron, create a plist configuration to run it automatically at startup or periodically:
1. Create a file named `com.vtrack.dbbackup.plist` in `~/Library/LaunchAgents/`.
2. Add the following content:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
   <dict>
       <key>Label</key>
       <string>com.vtrack.dbbackup</string>
       <key>ProgramArguments</key>
       <array>
           <string>/usr/local/bin/docker</string>
           <string>run</string>
           <string>--rm</string>
           <string>-v</string>
           <string>/Users/veeradinesh/Documents/vtrack-backups:/opt/vtrack-backups</string>
           <string>-v</string>
           <string>/Users/veeradinesh/Documents/Project-x/FITNESS TRACKER/backup-service/service-account.json:/app/service-account.json</string>
           <string>vtrack-db-backup</string>
       </array>
       <key>StartCalendarInterval</key>
       <dict>
           <key>Hour</key>
           <integer>2</integer>
           <key>Minute</key>
           <integer>0</integer>
       </dict>
       <key>StandardOutPath</key>
       <string>/Users/veeradinesh/Documents/vtrack-backups/backup.log</string>
       <key>StandardErrorPath</key>
       <string>/Users/veeradinesh/Documents/vtrack-backups/error.log</string>
   </dict>
   </plist>
   ```
3. Load the agent:
   ```bash
   launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.vtrack.dbbackup.plist
   ```

---

## 🔍 Troubleshooting Cron Failures

If your cron job fails to create backups, verify these 4 potential error states:

### 1. Error: `docker: command not found`
* **Why**: The default cron environment path is limited to `PATH=/usr/bin:/bin`. It cannot find `docker` if it resides in `/usr/local/bin` or `/snap/bin`.
* **Fix**: Use the absolute docker path (e.g. `/usr/local/bin/docker` or `/opt/homebrew/bin/docker`) in the crontab configuration line.

### 2. Error: `Permission denied` when connecting to Docker daemon
* **Why**: The user running cron doesn't have privileges to access the Docker daemon socket (`/var/run/docker.sock`).
* **Fix**: Add the current user to the `docker` group:
  ```bash
  sudo usermod -aG docker $USER
  ```
  Then log out and log back in, or run the crontab with root privileges via `sudo crontab -e`.

### 3. Error: `Permission denied` on log redirection (e.g. `/var/log/vtrack-backup.log`)
* **Why**: Normal users cannot write directly to `/var/log/`. 
* **Fix**: Change the redirection path to a directory owned by your user, e.g., `/home/ubuntu/vtrack-backup.log` on Linux or `/Users/veeradinesh/vtrack-backup.log` on macOS.

### 4. Error: `Error: EISDIR: illegal operation on a directory, read`
* **Why**: The host path mounted as `service-account.json` does not exist on the host filesystem when Docker starts. Docker then automatically initializes a **directory** with that name and mounts it.
* **Fix**: Make sure you have placed the actual downloaded `service-account.json` file on your host filesystem at the specified host path *before* starting the docker cron container.

---

## 🗄️ Backup Retention
By default, the script retains backups for **30 days**. Older backups are automatically deleted when a new backup completes.
* To adjust the retention window, you can pass a `RETAIN_DAYS` environment variable to the docker container:
  ```bash
  -e RETAIN_DAYS=14
  ```
