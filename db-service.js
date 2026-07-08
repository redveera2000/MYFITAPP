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
   * Delete an exercise target from cloud database
   */
  async deleteExerciseTarget(exerciseName) {
    if (!this.isReady()) return;
    try {
      const docId = this._sanitizeDocId(exerciseName);
      await this.db.collection('users').doc(this.uid)
        .collection('exercise_targets').doc(docId).delete();
      console.log(`[DB] Exercise target deleted: ${exerciseName}`);
    } catch (error) {
      console.error(`[DB] Error deleting exercise target ${exerciseName}:`, error);
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

      // Write session document (Denormalized with exercises)
      await sessionRef.set({
        date: sessionData.date,
        workoutKey: sessionData.workoutKey,
        workoutName: sessionData.workoutName,
        status: status,
        totalVolume: totalVolume,
        durationSeconds: sessionData.durationSeconds || null,
        exercises: sessionData.exercises || [], // Denormalized for instant loading
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });

      setSyncStatus('synced');
      console.log(`[DB] Workout session saved: ${sessionData.workoutName} (${sessionData.date})`);
    } catch (error) {
      console.error('[DB] Error saving workout session:', error);
      setSyncStatus('error');
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

      // Use Promise.all to fetch subcollections concurrently (fixes N+1 sequential bottleneck)
      const history = await Promise.all(sessionsSnapshot.docs.map(async (sessionDoc) => {
        const sessionData = sessionDoc.data();
        let exercises = [];

        // 1. Fast Path: Check if data is denormalized (New Format)
        if (sessionData.exercises) {
           exercises = sessionData.exercises;
        } else {
           // 2. Fallback Path: Fetch legacy subcollection data (concurrently!)
           const logsSnapshot = await sessionDoc.ref.collection('exercise_logs').get();
           logsSnapshot.forEach(logDoc => {
             const logData = logDoc.data();
             exercises.push({
               name: logData.exerciseName || logData.name,
               sets: logData.sets || []
             });
           });
        }

        return {
          id: sessionDoc.id,
          date: sessionData.date,
          workoutKey: sessionData.workoutKey,
          workoutName: sessionData.workoutName,
          status: sessionData.status,
          totalVolume: sessionData.totalVolume,
          durationSeconds: sessionData.durationSeconds || null,
          exercises: exercises
        };
      }));

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
  // STEP LOGS (Daily Activity Tracking — Google Fit / Manual)
  // ─────────────────────────────────────────────────────────────

  /**
   * Save or update a step log entry
   * @param {Object} stepData - { date, steps, distance_km, calories, heartRate, source }
   */
  async saveStepLog(stepData) {
    if (!this.isReady()) return;
    try {
      const docId = stepData.date; // YYYY-MM-DD
      await this.db.collection('users').doc(this.uid)
        .collection('step_logs').doc(docId).set({
          date: stepData.date,
          steps: stepData.steps || 0,
          distance_km: stepData.distance_km || null,
          calories: stepData.calories || null,
          heartRate: stepData.heartRate || null,
          source: stepData.source || 'manual',
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

      console.log(`[DB] Step log saved: ${stepData.steps} steps on ${stepData.date}`);
    } catch (error) {
      console.error('[DB] Error saving step log:', error);
    }
  }

  /**
   * Load all step logs from Firestore
   * @returns {Array} Array of step log objects sorted chronologically
   */
  async loadStepLogs() {
    if (!this.isReady()) return null;
    try {
      const snapshot = await this.db.collection('users').doc(this.uid)
        .collection('step_logs')
        .orderBy('date', 'asc')
        .get();

      if (snapshot.empty) return [];

      const logs = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        logs.push({
          date: data.date,
          steps: data.steps || 0,
          distance_km: data.distance_km || null,
          calories: data.calories || null,
          heartRate: data.heartRate || null,
          source: data.source || 'manual'
        });
      });

      console.log(`[DB] ${logs.length} step logs loaded.`);
      return logs;
    } catch (error) {
      console.error('[DB] Error loading step logs:', error);
      return null;
    }
  }

  /**
   * Save all step logs in bulk (used during CSV import)
   */
  async saveAllStepLogs(stepLogs) {
    if (!this.isReady() || !stepLogs || stepLogs.length === 0) return;
    try {
      // Firestore batch limit is 500 operations
      const batchSize = 450;
      for (let i = 0; i < stepLogs.length; i += batchSize) {
        const batch = this.db.batch();
        const chunk = stepLogs.slice(i, i + batchSize);
        const logsRef = this.db.collection('users').doc(this.uid).collection('step_logs');

        chunk.forEach(log => {
          const docRef = logsRef.doc(log.date);
          batch.set(docRef, {
            date: log.date,
            steps: log.steps || 0,
            distance_km: log.distance_km || null,
            calories: log.calories || null,
            heartRate: log.heartRate || null,
            source: log.source || 'csv_import',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
        });

        await batch.commit();
      }
      console.log(`[DB] ${stepLogs.length} step logs saved in bulk.`);
    } catch (error) {
      console.error('[DB] Error bulk saving step logs:', error);
    }
  }

  /**
   * Delete a step log entry
   */
  async deleteStepLog(date) {
    if (!this.isReady()) return;
    try {
      await this.db.collection('users').doc(this.uid)
        .collection('step_logs').doc(date).delete();
      console.log(`[DB] Step log deleted: ${date}`);
    } catch (error) {
      console.error(`[DB] Error deleting step log ${date}:`, error);
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
    const program = (typeof appState !== 'undefined' && appState.customProgram)
      ? appState.customProgram[sessionData.workoutKey]
      : ((typeof DEFAULT_PROGRAM !== 'undefined') ? DEFAULT_PROGRAM[sessionData.workoutKey] : null);

    if (program) {
      const programExCount = program.exercises.length;
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
