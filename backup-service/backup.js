const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// 1. Load Firebase Service Account credentials
const credentialsPath = path.join(__dirname, 'service-account.json');
if (!fs.existsSync(credentialsPath)) {
  console.error('[Error] service-account.json not found in backup-service directory.');
  console.error('Please download it from Firebase Console -> Project Settings -> Service accounts and place it here.');
  process.exit(1);
}

const serviceAccount = require(credentialsPath);

// 2. Initialize Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const BACKUP_DIR = process.env.BACKUP_DIR || '/opt/vtrack-backups';
const RETAIN_DAYS = parseInt(process.env.RETAIN_DAYS || '30', 10);

async function runBackup() {
  try {
    const timestamp = new Date().toISOString();
    console.log(`[Backup] Starting Firestore backup at ${timestamp}...`);

    // Ensure backup directory exists
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }

    const backupData = {
      timestamp: timestamp,
      users: {}
    };

    // 1. Fetch all root user documents
    const usersSnapshot = await db.collection('users').get();
    
    if (usersSnapshot.empty) {
      console.log('[Backup] No users found in the database. Exporting empty backup.');
    }

    // 2. Traverse collections for each user
    for (const userDoc of usersSnapshot.docs) {
      const uid = userDoc.id;
      const userData = userDoc.data();
      
      console.log(`[Backup] Fetching data for user: ${uid} (${userData.name || 'Anonymous'})`);

      const userRecord = {
        profile: userData,
        exerciseTargets: [],
        weightLogs: [],
        workoutSessions: []
      };

      // A. Fetch Exercise Targets
      const targetsSnapshot = await db.collection('users').doc(uid).collection('exercise_targets').get();
      targetsSnapshot.forEach(doc => {
        userRecord.exerciseTargets.push({ id: doc.id, ...doc.data() });
      });

      // B. Fetch Weight Logs
      const weightsSnapshot = await db.collection('users').doc(uid).collection('weight_logs').get();
      weightsSnapshot.forEach(doc => {
        userRecord.weightLogs.push({ id: doc.id, ...doc.data() });
      });

      // C. Fetch Workout Sessions (including subcollection exercise_logs)
      const sessionsSnapshot = await db.collection('users').doc(uid).collection('workout_sessions').get();
      for (const sessionDoc of sessionsSnapshot.docs) {
        const sessionData = sessionDoc.data();
        const sessionRecord = {
          id: sessionDoc.id,
          ...sessionData,
          exerciseLogs: []
        };

        // Fetch subcollection exercise_logs for this session
        const logsSnapshot = await sessionDoc.ref.collection('exercise_logs').get();
        logsSnapshot.forEach(logDoc => {
          sessionRecord.exerciseLogs.push({ id: logDoc.id, ...logDoc.data() });
        });

        userRecord.workoutSessions.push(sessionRecord);
      }

      backupData.users[uid] = userRecord;
    }

    // 3. Write backup to a timestamped JSON file
    const dateStr = new Date().toISOString().split('T')[0];
    const fileName = `vtrack-firestore-backup-${dateStr}.json`;
    const filePath = path.join(BACKUP_DIR, fileName);

    fs.writeFileSync(filePath, JSON.stringify(backupData, null, 2), 'utf-8');
    console.log(`[Backup] Backup completed successfully! Written to ${filePath}`);

    // 4. Clean up backups older than RETAIN_DAYS
    cleanOldBackups();

  } catch (error) {
    console.error('[Backup Error]:', error);
    process.exit(1);
  }
}

function cleanOldBackups() {
  try {
    const files = fs.readdirSync(BACKUP_DIR);
    const now = Date.now();
    const expiryTime = RETAIN_DAYS * 24 * 60 * 60 * 1000;

    files.forEach(file => {
      const filePath = path.join(BACKUP_DIR, file);
      const stat = fs.statSync(filePath);
      const age = now - stat.mtimeMs;

      if (age > expiryTime && file.startsWith('vtrack-firestore-backup-')) {
        fs.unlinkSync(filePath);
        console.log(`[Backup Cleanup] Deleted old backup file: ${file}`);
      }
    });
  } catch (err) {
    console.error('[Backup Cleanup Error]:', err);
  }
}

runBackup();
