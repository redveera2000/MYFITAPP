/**
 * V-TRACK Firestore Database Service
 * ====================================
 * Provides CRUD operations for all V-TRACK data collections in Cloud Firestore.
 * Handles: Profile, Exercise Targets, Workout Sessions, Exercise Logs, Weight Logs.
 * Includes one-time migration from localStorage → Firestore.
 */

class FirestoreService {
  constructor() {
    this.db = null;
    this.uid = null;
  }

  /**
   * Initialize with Firestore instance and authenticated user ID
   */
  init(db, uid) {
    this.db = db;
    this.uid = uid;
  }

  /**
   * Check if service is ready
   */
  isReady() {
    return this.db !== null && this.uid !== null;
  }

  // ─────────────────────────────────────────────────────────────
  // PROFILE OPERATIONS
  // ─────────────────────────────────────────────────────────────

  /**
   * Save user profile to Firestore
   */
  async saveProfile(profileData) {
    if (!this.isReady()) return;
    try {
      setSyncStatus('syncing');
      await this.db.collection('users').doc(this.uid).set({
        ...profileData,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      setSyncStatus('synced');
      console.log('[DB] Profile saved to Firestore.');
    } catch (error) {
      console.error('[DB] Error saving profile:', error);
      setSyncStatus('error');
    }
  }

  /**
   * Load user profile from Firestore
   * @returns {Object|null} Profile data or null if not found
   */
  async loadProfile() {
    if (!this.isReady()) return null;
    try {
      const doc = await this.db.collection('users').doc(this.uid).get();
      if (doc.exists) {
        const data = doc.data();
        // Remove Firestore-specific fields before returning
        delete data.updatedAt;
        delete data.createdAt;
        console.log('[DB] Profile loaded from Firestore.');
        return data;
      }
      return null;
    } catch (error) {
      console.error('[DB] Error loading profile:', error);
      return null;
    }
  }

  // ─────────────────────────────────────────────────────────────
  // EXERCISE TARGETS (Current Weights / Progressive Overload)
  // ─────────────────────────────────────────────────────────────

  /**
   * Save all exercise targets to Firestore
   * Uses a batch write for atomicity and efficiency
   * @param {Object} weightsMap - Map of exerciseName → target data
   */
  async saveExerciseTargets(weightsMap) {
    if (!this.isReady()) return;
    try {
      setSyncStatus('syncing');
      const batch = this.db.batch();
      const targetsRef = this.db.collection('users').doc(this.uid).collection('exercise_targets');

      Object.entries(weightsMap).forEach(([exerciseName, data]) => {
        // Use a sanitized exercise name as doc ID for easy lookups
        const docId = this._sanitizeDocId(exerciseName);
        const docRef = targetsRef.doc(docId);
        batch.set(docRef, {
          exerciseName: exerciseName,
          currentWeight: data.weight,
          minReps: data.minReps,
          maxReps: data.maxReps,
          sets: data.sets,
          equipmentType: data.type || 'unknown',
          failureOnly: data.failureOnly || false,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      });

      await batch.commit();
      setSyncStatus('synced');
      console.log(`[DB] ${Object.keys(weightsMap).length} exercise targets saved.`);
    } catch (error) {
      console.error('[DB] Error saving exercise targets:', error);
      setSyncStatus('error');
    }
  }

  /**
   * Save a single exercise target (after progressive overload update)
   */
  async saveSingleExerciseTarget(exerciseName, data) {
    if (!this.isReady()) return;
    try {
      const docId = this._sanitizeDocId(exerciseName);
      await this.db.collection('users').doc(this.uid)
        .collection('exercise_targets').doc(docId).set({
          exerciseName: exerciseName,
          currentWeight: data.weight,
          minReps: data.minReps,
          maxReps: data.maxReps,
          sets: data.sets,
          equipmentType: data.type || 'unknown',
          failureOnly: data.failureOnly || false,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      console.log(`[DB] Exercise target updated: ${exerciseName}`);
    } catch (error) {
      console.error(`[DB] Error saving exercise target ${exerciseName}:`, error);
    }
  }

  /**
   * Load all exercise targets from Firestore
   * @returns {Object} Map of exerciseName → target data (same format as localStorage)
   */
  async loadExerciseTargets() {
    if (!this.isReady()) return null;
    try {
      const snapshot = await this.db.collection('users').doc(this.uid)
        .collection('exercise_targets').get();

      if (snapshot.empty) return null;

      const weightsMap = {};
      snapshot.forEach(doc => {
        const data = doc.data();
        weightsMap[data.exerciseName] = {
          weight: data.currentWeight,
          minReps: data.minReps,
          maxReps: data.maxReps,
          sets: data.sets,
          type: data.equipmentType,
          failureOnly: data.failureOnly || false
        };
      });

      console.log(`[DB] ${Object.keys(weightsMap).length} exercise targets loaded.`);
      return weightsMap;
    } catch (error) {
      console.error('[DB] Error loading exercise targets:', error);
      return null;
    }
  }

  // ─────────────────────────────────────────────────────────────
  // WORKOUT SESSIONS & EXERCISE LOGS
  // ─────────────────────────────────────────────────────────────

  /**
   * Save a workout session with its exercise logs to Firestore
   * @param {Object} sessionData - Session object from history array
   */
  async saveWorkoutSession(sessionData) {
    if (!this.isReady()) return;
    try {
      setSyncStatus('syncing');
      const sessionRef = this.db.collection('users').doc(this.uid)
        .collection('workout_sessions').doc(sessionData.id);

      // Calculate total volume
      let totalVolume = 0;
      if (sessionData.exercises) {
        sessionData.exercises.forEach(ex => {
          if (ex.sets) {
            ex.sets.forEach(set => {
              if (set.reps && set.weight) {
                totalVolume += (set.reps * set.weight);
              }
            });
          }
        });
      }

      // Determine status
      const status = this._getSessionStatus(sessionData);

      // Write session document
      await sessionRef.set({
        date: sessionData.date,
        workoutKey: sessionData.workoutKey,
        workoutName: sessionData.workoutName,
        status: status,
        totalVolume: totalVolume,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });

      // Write exercise logs as subcollection documents
      if (sessionData.exercises && sessionData.exercises.length > 0) {
        const batch = this.db.batch();
        sessionData.exercises.forEach(ex => {
          const logDocId = this._sanitizeDocId(ex.name);
          const logRef = sessionRef.collection('exercise_logs').doc(logDocId);
          batch.set(logRef, {
            exerciseName: ex.name,
            date: sessionData.date,
            workoutKey: sessionData.workoutKey,
            sets: ex.sets || [],
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
        });
        await batch.commit();
      }

      setSyncStatus('synced');
      console.log(`[DB] Workout session saved: ${sessionData.workoutName} (${sessionData.date})`);
    } catch (error) {
      console.error('[DB] Error saving workout session:', error);
      setSyncStatus('error');
    }
  }

  /**
   * Save a single exercise log within an existing session
   */
  async saveExerciseLog(sessionId, date, workoutKey, exerciseLog) {
    if (!this.isReady()) return;
    try {
      const sessionRef = this.db.collection('users').doc(this.uid)
        .collection('workout_sessions').doc(sessionId);

      const logDocId = this._sanitizeDocId(exerciseLog.name);
      await sessionRef.collection('exercise_logs').doc(logDocId).set({
        exerciseName: exerciseLog.name,
        date: date,
        workoutKey: workoutKey,
        sets: exerciseLog.sets || [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });

      // Also update session's updatedAt timestamp
      await sessionRef.set({
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });

      console.log(`[DB] Exercise log saved: ${exerciseLog.name}`);
    } catch (error) {
      console.error(`[DB] Error saving exercise log ${exerciseLog.name}:`, error);
    }
  }

  /**
   * Remove a single exercise log from a session
   */
  async removeExerciseLog(sessionId, exerciseName) {
    if (!this.isReady()) return;
    try {
      const logDocId = this._sanitizeDocId(exerciseName);
      await this.db.collection('users').doc(this.uid)
        .collection('workout_sessions').doc(sessionId)
        .collection('exercise_logs').doc(logDocId).delete();

      console.log(`[DB] Exercise log removed: ${exerciseName}`);
    } catch (error) {
      console.error(`[DB] Error removing exercise log ${exerciseName}:`, error);
    }
  }

  /**
   * Load all workout session history from Firestore
   * @param {number} limitCount - Max sessions to load (default: 100)
   * @returns {Array} Array of session objects with embedded exercise logs
   */
  async loadWorkoutHistory(limitCount = 100) {
    if (!this.isReady()) return null;
    try {
      const sessionsSnapshot = await this.db.collection('users').doc(this.uid)
        .collection('workout_sessions')
        .orderBy('date', 'asc')
        .limit(limitCount)
        .get();

      if (sessionsSnapshot.empty) return [];

      const history = [];
      for (const sessionDoc of sessionsSnapshot.docs) {
        const sessionData = sessionDoc.data();

        // Load exercise logs for this session
        const logsSnapshot = await sessionDoc.ref
          .collection('exercise_logs').get();

        const exercises = [];
        logsSnapshot.forEach(logDoc => {
          const logData = logDoc.data();
          exercises.push({
            name: logData.exerciseName,
            sets: logData.sets || []
          });
        });

        history.push({
          id: sessionDoc.id,
          date: sessionData.date,
          workoutKey: sessionData.workoutKey,
          workoutName: sessionData.workoutName,
          exercises: exercises
        });
      }

      console.log(`[DB] ${history.length} workout sessions loaded.`);
      return history;
    } catch (error) {
      console.error('[DB] Error loading workout history:', error);
      return null;
    }
  }

  /**
   * Delete a workout session and all its exercise logs
   */
  async deleteWorkoutSession(sessionId) {
    if (!this.isReady()) return;
    try {
      setSyncStatus('syncing');
      const sessionRef = this.db.collection('users').doc(this.uid)
        .collection('workout_sessions').doc(sessionId);

      // Delete all exercise logs in subcollection first
      const logsSnapshot = await sessionRef.collection('exercise_logs').get();
      const batch = this.db.batch();
      logsSnapshot.forEach(doc => {
        batch.delete(doc.ref);
      });
      // Delete the session document itself
      batch.delete(sessionRef);
      await batch.commit();

      setSyncStatus('synced');
      console.log(`[DB] Workout session deleted: ${sessionId}`);
    } catch (error) {
      console.error('[DB] Error deleting workout session:', error);
      setSyncStatus('error');
    }
  }

  // ─────────────────────────────────────────────────────────────
  // WEIGHT LOGS (Body Weight Tracking)
  // ─────────────────────────────────────────────────────────────

  /**
   * Save or update a weight log entry
   */
  async saveWeightLog(date, weight) {
    if (!this.isReady()) return;
    try {
      // Use date as document ID for easy upsert
      const docId = date; // YYYY-MM-DD format is safe for Firestore doc IDs
      await this.db.collection('users').doc(this.uid)
        .collection('weight_logs').doc(docId).set({
          date: date,
          weight: weight,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

      console.log(`[DB] Weight log saved: ${weight}kg on ${date}`);
    } catch (error) {
      console.error('[DB] Error saving weight log:', error);
    }
  }

  /**
   * Load all weight logs from Firestore
   * @returns {Array} Array of {date, weight} objects sorted chronologically
   */
  async loadWeightLogs() {
    if (!this.isReady()) return null;
    try {
      const snapshot = await this.db.collection('users').doc(this.uid)
        .collection('weight_logs')
        .orderBy('date', 'asc')
        .get();

      if (snapshot.empty) return [];

      const logs = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        logs.push({
          date: data.date,
          weight: data.weight
        });
      });

      console.log(`[DB] ${logs.length} weight logs loaded.`);
      return logs;
    } catch (error) {
      console.error('[DB] Error loading weight logs:', error);
      return null;
    }
  }

  /**
   * Save all weight logs in bulk (used during migration)
   */
  async saveAllWeightLogs(weightLogs) {
    if (!this.isReady() || !weightLogs || weightLogs.length === 0) return;
    try {
      const batch = this.db.batch();
      const logsRef = this.db.collection('users').doc(this.uid).collection('weight_logs');

      weightLogs.forEach(log => {
        const docRef = logsRef.doc(log.date);
        batch.set(docRef, {
          date: log.date,
          weight: log.weight,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      });

      await batch.commit();
      console.log(`[DB] ${weightLogs.length} weight logs migrated.`);
    } catch (error) {
      console.error('[DB] Error bulk saving weight logs:', error);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // DATA MIGRATION (localStorage → Firestore)
  // ─────────────────────────────────────────────────────────────

  /**
   * Migrate all localStorage data to Firestore (one-time operation)
   * @param {Object} localData - { profile, currentWeights, history, weightLogs }
   * @returns {boolean} True if migration succeeded
   */
  async migrateFromLocalStorage(localData) {
    if (!this.isReady()) return false;

    console.log('[DB] Starting localStorage → Firestore migration...');
    setSyncStatus('syncing');

    try {
      // 1. Migrate Profile
      if (localData.profile) {
        await this.saveProfile({
          ...localData.profile,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('[DB] ✓ Profile migrated.');
      }

      // 2. Migrate Exercise Targets
      if (localData.currentWeights && Object.keys(localData.currentWeights).length > 0) {
        await this.saveExerciseTargets(localData.currentWeights);
        console.log('[DB] ✓ Exercise targets migrated.');
      }

      // 3. Migrate Weight Logs
      if (localData.weightLogs && localData.weightLogs.length > 0) {
        await this.saveAllWeightLogs(localData.weightLogs);
        console.log('[DB] ✓ Weight logs migrated.');
      }

      // 4. Migrate Workout History (sessions + exercise logs)
      if (localData.history && localData.history.length > 0) {
        // Firestore batch limit is 500 operations, so we process sessions sequentially
        for (const session of localData.history) {
          await this.saveWorkoutSession(session);
        }
        console.log(`[DB] ✓ ${localData.history.length} workout sessions migrated.`);
      }

      // 5. Mark migration as complete
      await this.db.collection('users').doc(this.uid).set({
        migrationCompleted: true,
        migratedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });

      setSyncStatus('synced');
      console.log('[DB] ✅ Migration complete! All localStorage data is now in Firestore.');
      return true;

    } catch (error) {
      console.error('[DB] ❌ Migration failed:', error);
      setSyncStatus('error');
      return false;
    }
  }

  /**
   * Check if a migration has already been completed for this user
   */
  async isMigrationDone() {
    if (!this.isReady()) return false;
    try {
      const doc = await this.db.collection('users').doc(this.uid).get();
      return doc.exists && doc.data().migrationCompleted === true;
    } catch {
      return false;
    }
  }

  /**
   * Check if Firestore has any data for this user
   */
  async hasFirestoreData() {
    if (!this.isReady()) return false;
    try {
      const doc = await this.db.collection('users').doc(this.uid).get();
      return doc.exists;
    } catch {
      return false;
    }
  }

  // ─────────────────────────────────────────────────────────────
  // INTERNAL HELPERS
  // ─────────────────────────────────────────────────────────────

  /**
   * Sanitize a string for use as a Firestore document ID
   * Firestore doc IDs cannot contain: / . # $ [ ]
   */
  _sanitizeDocId(str) {
    return str
      .replace(/[\/\.#$\[\]]/g, '_')
      .replace(/\s+/g, '_')
      .toLowerCase()
      .substring(0, 100); // Firestore doc IDs have a max length of 1500 bytes
  }

  /**
   * Determine if a workout session is fully completed
   */
  _getSessionStatus(sessionData) {
    if (!sessionData.exercises || sessionData.exercises.length === 0) {
      return 'in_progress';
    }

    // Check if all exercises from the program are logged
    if (typeof DEFAULT_PROGRAM !== 'undefined' && DEFAULT_PROGRAM[sessionData.workoutKey]) {
      const programExCount = DEFAULT_PROGRAM[sessionData.workoutKey].exercises.length;
      const loggedExCount = sessionData.exercises.filter(ex =>
        ex.sets && ex.sets.some(s => s.reps !== null && s.reps !== undefined && s.reps !== "")
      ).length;
      return loggedExCount >= programExCount ? 'completed' : 'in_progress';
    }

    return 'in_progress';
  }
}

// Create global instance
const firestoreService = new FirestoreService();
