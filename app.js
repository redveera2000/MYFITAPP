/**
 * AESTHETIX / V-TRACK - Workout Tracker & Progressive Overload Engine
 * Built specifically for Veeradinesh
 * Height: 175 cm (5'9"), Start Weight: 112.8 kg
 */

// --- Default Program Configuration (Push-Pull-Legs 6-Day Split) ---
// Training Categories: "strength" (1-6 reps, 80-100% 1RM), "power-hypertrophy" (6-8 reps, 75-85% 1RM),
//                      "hypertrophy" (8-15 reps, 65-80% 1RM), "endurance" (15-25+ reps, <60% 1RM)
const DEFAULT_PROGRAM = {
  push1: {
    name: "Push Day 1",
    exercises: [
      { name: "Incline DB Press", sets: 3, minReps: 10, maxReps: 15, defaultWeight: 12.5, type: "dumbbell", category: "hypertrophy", restSeconds: 90 },
      { name: "DB Lateral Raises", sets: 3, minReps: 8, maxReps: 15, defaultWeight: 5.0, type: "dumbbell", category: "hypertrophy", restSeconds: 90 },
      { name: "Tricep Pushdowns", sets: 3, minReps: 8, maxReps: 15, defaultWeight: 15.0, type: "cable", category: "hypertrophy", restSeconds: 90 },
      { name: "Pec Flys/Cable Flys", sets: 3, minReps: 8, maxReps: 15, defaultWeight: 20.0, type: "machine", category: "hypertrophy", restSeconds: 90 },
      { name: "Skullcrushers/Cable OH Extensions", sets: 3, minReps: 10, maxReps: 15, defaultWeight: 10.0, type: "barbell", category: "hypertrophy", restSeconds: 90 }
    ]
  },
  pull1: {
    name: "Pull Day 1",
    exercises: [
      { name: "Lat Pulldowns/Pull Ups", sets: 3, minReps: 8, maxReps: 12, defaultWeight: 35.0, type: "machine", category: "hypertrophy", restSeconds: 90 },
      { name: "Barbell Rows", sets: 3, minReps: 8, maxReps: 12, defaultWeight: 30.0, type: "barbell", category: "hypertrophy", restSeconds: 90 },
      { name: "Meadows Curls", sets: 3, minReps: 8, maxReps: 12, defaultWeight: 7.5, type: "dumbbell", category: "hypertrophy", restSeconds: 90 },
      { name: "Reverse Pec Dec Flys/Single Arm Rear Delt Flys", sets: 2, minReps: 6, maxReps: 12, defaultWeight: 15.0, type: "machine", category: "power-hypertrophy", restSeconds: 120 },
      { name: "Chest Supported Upper Back Rows", sets: 2, minReps: 8, maxReps: 15, defaultWeight: 20.0, type: "machine", category: "hypertrophy", restSeconds: 90 },
      { name: "Meadows or Normal Hammer Curls", sets: 3, minReps: 8, maxReps: 15, defaultWeight: 7.5, type: "dumbbell", category: "hypertrophy", restSeconds: 90 }
    ]
  },
  legs1: {
    name: "Leg Day 1",
    exercises: [
      { name: "Leg Extensions", sets: 3, minReps: 6, maxReps: 12, defaultWeight: 15.0, type: "machine", category: "power-hypertrophy", restSeconds: 120 },
      { name: "Leg Press", sets: 3, minReps: 6, maxReps: 12, defaultWeight: 60.0, type: "machine", category: "power-hypertrophy", restSeconds: 150 },
      { name: "Hamstring Curls", sets: 2, minReps: 6, maxReps: 10, defaultWeight: 15.0, type: "machine", category: "power-hypertrophy", restSeconds: 120 },
      { name: "Calf Raises", sets: 3, minReps: 8, maxReps: 15, defaultWeight: 0.0, type: "bodyweight", category: "hypertrophy", restSeconds: 60 },
      { name: "Leg Raises & Machine Crunches", sets: 2, minReps: 10, maxReps: 25, defaultWeight: 0.0, type: "bodyweight", category: "endurance", restSeconds: 45, failureOnly: true }
    ]
  },
  push2: {
    name: "Push Day 2",
    exercises: [
      { name: "Seated DB OHP", sets: 3, minReps: 6, maxReps: 12, defaultWeight: 10.0, type: "dumbbell", category: "power-hypertrophy", restSeconds: 150 },
      { name: "Cable Lateral Raise", sets: 3, minReps: 10, maxReps: 15, defaultWeight: 5.0, type: "cable", category: "hypertrophy", restSeconds: 90 },
      { name: "JM Presses", sets: 2, minReps: 6, maxReps: 12, defaultWeight: 15.0, type: "barbell", category: "power-hypertrophy", restSeconds: 120 },
      { name: "Cable High to Low, Low to High Flys", sets: 2, minReps: 10, maxReps: 15, defaultWeight: 7.5, type: "cable", category: "hypertrophy", restSeconds: 90 },
      { name: "Single Arm Tricep Pushdowns", sets: 2, minReps: 10, maxReps: 15, defaultWeight: 7.5, type: "cable", category: "hypertrophy", restSeconds: 90 }
    ]
  },
  pull2: {
    name: "Pull Day 2",
    exercises: [
      { name: "Preacher Curls", sets: 3, minReps: 6, maxReps: 12, defaultWeight: 7.5, type: "dumbbell", category: "power-hypertrophy", restSeconds: 120 },
      { name: "Single Arm Rear Delt Flys", sets: 2, minReps: 8, maxReps: 15, defaultWeight: 5.0, type: "dumbbell", category: "hypertrophy", restSeconds: 90 },
      { name: "Lat Pulldowns/Pull Ups", sets: 3, minReps: 6, maxReps: 12, defaultWeight: 35.0, type: "machine", category: "power-hypertrophy", restSeconds: 120 },
      { name: "Chest Supported DB Rows/Cable Rows", sets: 3, minReps: 6, maxReps: 12, defaultWeight: 15.0, type: "machine", category: "power-hypertrophy", restSeconds: 120 },
      { name: "Incline or Normal Hammer Curls", sets: 2, minReps: 8, maxReps: 12, defaultWeight: 7.5, type: "dumbbell", category: "hypertrophy", restSeconds: 90 },
      { name: "Facepulls", sets: 1, minReps: 8, maxReps: 12, defaultWeight: 10.0, type: "cable", category: "hypertrophy", restSeconds: 60 }
    ]
  },
  legs2: {
    name: "Leg Day 2",
    exercises: [
      { name: "Barbell Squats", sets: 3, minReps: 5, maxReps: 8, defaultWeight: 30.0, type: "barbell", category: "strength", restSeconds: 240 },
      { name: "Romanian Deadlifts", sets: 2, minReps: 5, maxReps: 8, defaultWeight: 30.0, type: "barbell", category: "strength", restSeconds: 240 },
      { name: "Leg Extensions", sets: 2, minReps: 6, maxReps: 12, defaultWeight: 15.0, type: "machine", category: "power-hypertrophy", restSeconds: 120 },
      { name: "Abductors & Adductors", sets: 2, minReps: 8, maxReps: 15, defaultWeight: 20.0, type: "machine", category: "hypertrophy", restSeconds: 90 },
      { name: "Calf Raises", sets: 3, minReps: 8, maxReps: 15, defaultWeight: 0.0, type: "bodyweight", category: "hypertrophy", restSeconds: 60 },
      { name: "Hyperextensions", sets: 2, minReps: 8, maxReps: 15, defaultWeight: 0.0, type: "bodyweight", category: "hypertrophy", restSeconds: 60 },
      { name: "Leg Raises & Machine Crunches", sets: 2, minReps: 10, maxReps: 25, defaultWeight: 0.0, type: "bodyweight", category: "endurance", restSeconds: 45, failureOnly: true }
    ]
  }
};

// --- Application State Manager ---
class StateManager {
  constructor() {
    this.keyPrefix = "v_track_";
    this.firebaseInitialized = false;
    this.loadState(); // Synchronous: loads from localStorage (fast initial render)
  }

  loadState() {
    const profile = localStorage.getItem(this.keyPrefix + "profile");
    const weights = localStorage.getItem(this.keyPrefix + "current_weights");
    const history = localStorage.getItem(this.keyPrefix + "history");
    const weightLogs = localStorage.getItem(this.keyPrefix + "weight_logs");

    // Default Profile for Veeradinesh
    this.profile = profile ? JSON.parse(profile) : {
      name: "Veeradinesh",
      height: 175,
      weight: 112.8,
      age: 28,
      gender: "male",
      targetDeficit: 700,
      activityLevel: "1.5", // 1.2: Sedentary, 1.375: Lightly active, 1.5: Moderately active, 1.725: Very active
      sheetsUrl: ""
    };
    if (this.profile.sheetsUrl === undefined) {
      this.profile.sheetsUrl = "";
    }

    // Initialize Custom Program with defensive validation
    let loadedProgram = null;
    const customProgramJson = localStorage.getItem(this.keyPrefix + "custom_program");
    if (customProgramJson && customProgramJson !== "null" && customProgramJson !== "undefined") {
      try {
        loadedProgram = JSON.parse(customProgramJson);
      } catch (e) {
        console.error("Failed to parse custom program from local storage:", e);
      }
    }
    if (!loadedProgram && this.profile && this.profile.customProgram) {
      loadedProgram = this.profile.customProgram;
    }
    const requiredKeys = ["push1", "pull1", "legs1", "push2", "pull2", "legs2"];
    const isValidProgram = loadedProgram && typeof loadedProgram === "object" && requiredKeys.every(k => loadedProgram[k] && Array.isArray(loadedProgram[k].exercises));
    if (isValidProgram) {
      this.customProgram = loadedProgram;
    } else {
      console.warn("Custom program missing or invalid. Falling back to default program.");
      this.customProgram = JSON.parse(JSON.stringify(DEFAULT_PROGRAM));
      localStorage.setItem(this.keyPrefix + "custom_program", JSON.stringify(this.customProgram));
    }

    // Initialize Weight Logs
    this.weightLogs = weightLogs ? JSON.parse(weightLogs) : [
      { date: "2026-06-06", weight: 112.8 }
    ];

    // Initialize Exercise Weights
    if (weights) {
      this.currentWeights = JSON.parse(weights);
    } else {
      this.currentWeights = {};
      Object.keys(this.customProgram).forEach(dayKey => {
        this.customProgram[dayKey].exercises.forEach(ex => {
          this.currentWeights[ex.name] = {
            weight: ex.defaultWeight,
            minReps: ex.minReps,
            maxReps: ex.maxReps,
            sets: ex.sets,
            type: ex.type,
            failureOnly: !!ex.failureOnly
          };
        });
      });
      this.saveWeights();
    }

    // Initialize Workout Logs History
    this.history = history ? JSON.parse(history) : [];

    // Clean up duplicate workout records from history if any exist (same date and same workoutKey)
    if (this.history && this.history.length > 0) {
      const seen = new Set();
      this.history = this.history.filter(log => {
        const uniqueKey = `${log.date}_${log.workoutKey}`;
        if (seen.has(uniqueKey)) return false;
        seen.add(uniqueKey);
        return true;
      });
    }

    // Initialize Active Timers
    this.activeTimers = JSON.parse(localStorage.getItem(this.keyPrefix + "active_timers")) || {};
  }

  /**
   * Async initialization: Connect to Firebase, load cloud data, migrate if needed
   * Called after DOMContentLoaded and initial synchronous load
   */
  async initAsync() {
    // Check if Firebase is configured (not placeholder values)
    if (typeof isFirebaseConfigured === 'function' && !isFirebaseConfigured()) {
      console.log('[StateManager] Firebase not configured. Running in local-only mode.');
      updateSyncStatusUI('local-only', 'Local Only');
      document.getElementById('login-container').style.display = 'none';
      document.querySelector('.app-container').style.display = 'block';
      return;
    }

    // Try to initialize Firebase
    if (typeof initFirebase === 'function') {
      try {
        updateSyncStatusUI('initializing', 'Connecting...');
        
        // initFirebase returns a Promise that resolves with initial UID or null
        await initFirebase();

        // Listen for authentication changes to drive the app data flow
        firebaseAuth.onAuthStateChanged(async (user) => {
          if (user) {
            const authorizedEmail = typeof getAuthorizedEmail === 'function' ? getAuthorizedEmail() : 'singleuser@vtrack.app';
            if (user.email && user.email.toLowerCase() === authorizedEmail) {
              console.log(`[StateManager] Authenticated as authorized user: ${user.email}`);
              
              // IMMEDIATE UNBLOCK: Switch layout visibility to hide login overlay and show app container instantly
              document.getElementById('login-container').style.display = 'none';
              document.querySelector('.app-container').style.display = 'block';
              
              if (typeof firestoreService !== 'undefined') {
                firestoreService.init(getFirestoreDb(), user.uid);
                
                // Register sync status listener
                onSyncStatusChange((status) => {
                  const labels = {
                    'synced': 'Cloud Synced',
                    'syncing': 'Syncing...',
                    'offline': 'Offline',
                    'error': 'Sync Error',
                    'initializing': 'Connecting...'
                  };
                  updateSyncStatusUI(status, labels[status] || status);
                });

                // Check if we need to migrate localStorage data to Firestore
                const hasCloud = await firestoreService.hasFirestoreData();
                const migrationDone = await firestoreService.isMigrationDone();

                if (!hasCloud && !migrationDone && this.hasLocalData()) {
                  console.log('[StateManager] First-time migration: uploading localStorage to Firestore...');
                  updateSyncStatusUI('syncing', 'Migrating...');
                  const success = await firestoreService.migrateFromLocalStorage({
                    profile: this.profile,
                    currentWeights: this.currentWeights,
                    history: this.history,
                    weightLogs: this.weightLogs
                  });
                  if (success) {
                    console.log('[StateManager] Migration complete!');
                    updateSyncStatusUI('synced', 'Cloud Synced');
                  }
                } else if (hasCloud) {
                  console.log('[StateManager] Loading data from Firestore...');
                  updateSyncStatusUI('syncing', 'Loading...');
                  await this.loadFromFirestore();
                  updateSyncStatusUI('synced', 'Cloud Synced');
                }

                this.firebaseInitialized = true;
              }
              
              // Ensure we check for missing weight log globally once data is fully loaded
              checkMissingWeightBanner();
            } else {
              console.warn(`[StateManager] Blocked unauthorized sign-in: ${user.email}`);
              if (typeof signOutUser === 'function') {
                await signOutUser();
              }
              const loginErrorAlert = document.getElementById('login-error-alert');
              if (loginErrorAlert) {
                loginErrorAlert.textContent = "Access denied. This email is not authorized to access this fitness engine.";
                loginErrorAlert.style.display = 'block';
              }
            }
          } else {
            console.log('[StateManager] User is logged out. Showing login gateway.');
            this.firebaseInitialized = false;
            if (typeof firestoreService !== 'undefined') {
              firestoreService.init(null, null);
            }
            // Switch layout visibility: hide app and show login overlay
            document.querySelector('.app-container').style.display = 'none';
            document.getElementById('login-container').style.display = 'flex';
            updateSyncStatusUI('offline', 'Offline');
          }
        });

      } catch (error) {
        console.error('[StateManager] Firebase async init failed:', error);
        updateSyncStatusUI('error', 'Sync Error');
      }
    } else {
      updateSyncStatusUI('local-only', 'Local Only');
      document.getElementById('login-container').style.display = 'none';
      document.querySelector('.app-container').style.display = 'block';
    }
  }

  /**
   * Load all data from Firestore and update local state + localStorage cache
   */
  async loadFromFirestore() {
    if (!firestoreService || !firestoreService.isReady()) return;

    try {
      // Fetch all data concurrently to prevent sequential bottlenecks
      const [cloudProfile, cloudWeights, cloudHistory, cloudWeightLogs] = await Promise.all([
        firestoreService.loadProfile(),
        firestoreService.loadExerciseTargets(),
        firestoreService.loadWorkoutHistory(),
        firestoreService.loadWeightLogs()
      ]);

      // Process profile
      if (cloudProfile) {
        this.profile = { ...this.profile, ...cloudProfile };
        if (cloudProfile.customProgram) {
          const requiredKeys = ["push1", "pull1", "legs1", "push2", "pull2", "legs2"];
          const isCloudValid = typeof cloudProfile.customProgram === "object" && requiredKeys.every(k => cloudProfile.customProgram[k] && Array.isArray(cloudProfile.customProgram[k].exercises));
          if (isCloudValid) {
            this.customProgram = cloudProfile.customProgram;
            localStorage.setItem(this.keyPrefix + "custom_program", JSON.stringify(this.customProgram));
          } else {
            console.warn("Cloud custom program structure is invalid. Skipping sync.");
          }
        }
        this.saveProfile();
      }

      // Process exercise targets
      if (cloudWeights && Object.keys(cloudWeights).length > 0) {
        this.currentWeights = { ...this.currentWeights, ...cloudWeights };
        this.saveWeights();
      }

      // Process workout history
      if (cloudHistory && cloudHistory.length > 0) {
        this.history = cloudHistory;
        this.saveHistory();
      }

      // Process weight logs
      if (cloudWeightLogs && cloudWeightLogs.length > 0) {
        this.weightLogs = cloudWeightLogs;
        this.saveWeightLogs();
      }

      console.log('[StateManager] All data loaded from Firestore.');

      // Re-render UI with fresh cloud data
      refreshAllUI();
    } catch (error) {
      console.error('[StateManager] Error loading from Firestore:', error);
    }
  }

  /**
   * Check if localStorage has any meaningful data worth migrating
   */
  hasLocalData() {
    return (this.history && this.history.length > 0) ||
           (this.weightLogs && this.weightLogs.length > 1) ||
           (this.profile && this.profile.name);
  }

  saveProfile() {
    this.profile.customProgram = this.customProgram;
    localStorage.setItem(this.keyPrefix + "profile", JSON.stringify(this.profile));
    // Dual-write to Firestore
    if (this.firebaseInitialized && firestoreService && firestoreService.isReady()) {
      firestoreService.saveProfile(this.profile).catch(err => console.error('[Sync] Profile save error:', err));
    }
  }

  saveWeights() {
    localStorage.setItem(this.keyPrefix + "current_weights", JSON.stringify(this.currentWeights));
    // Dual-write to Firestore
    if (this.firebaseInitialized && firestoreService && firestoreService.isReady()) {
      firestoreService.saveExerciseTargets(this.currentWeights).catch(err => console.error('[Sync] Weights save error:', err));
    }
  }

  saveHistory() {
    localStorage.setItem(this.keyPrefix + "history", JSON.stringify(this.history));
  }

  saveWeightLogs() {
    localStorage.setItem(this.keyPrefix + "weight_logs", JSON.stringify(this.weightLogs));
  }

  saveActiveTimers() {
    localStorage.setItem(this.keyPrefix + "active_timers", JSON.stringify(this.activeTimers));
  }

  logWorkout(workoutKey, dateStr, loggedExercises) {
    const record = {
      id: Date.now().toString(),
      date: dateStr,
      workoutKey: workoutKey,
      workoutName: this.customProgram[workoutKey].name,
      exercises: loggedExercises
    };

    // Append to history
    this.history.push(record);
    this.saveHistory();

    // Sync to Firestore
    if (this.firebaseInitialized && firestoreService && firestoreService.isReady()) {
      firestoreService.saveWorkoutSession(record).catch(err => console.error('[Sync] Workout session save error:', err));
    }

    // Process Progressive Overloading Rules
    const overloadReport = [];
    loggedExercises.forEach(loggedEx => {
      const current = this.currentWeights[loggedEx.name];
      if (!current) return;

      const result = this.calculateNextStep(loggedEx.name, loggedEx.sets);
      if (result) {
        // Update current tracking weight
        this.currentWeights[loggedEx.name].weight = result.nextWeight;
        overloadReport.push({
          name: loggedEx.name,
          oldWeight: result.prevWeight,
          newWeight: result.nextWeight,
          status: result.status,
          reason: result.reason
        });
      }
    });

    this.saveWeights();
    return overloadReport;
  }

  calculateNextStep(exName, loggedSets) {
    const current = this.currentWeights[exName];
    if (!current) return null;

    if (current.failureOnly) {
      // Bodyweight to failure movements are not overloaded with weight, just logged
      return {
        prevWeight: 0,
        nextWeight: 0,
        status: "maintain",
        reason: "Bodyweight movement. Keep pushing to failures."
      };
    }

    const minReps = current.minReps;
    const maxReps = current.maxReps;
    const targetSets = loggedSets.length;
    
    // Fix: Base the progressive overload calculations on the manual weight entered by the user
    // in this session instead of the default suggested weight from state.
    const validLog = loggedSets.find(s => s.weight !== undefined && s.weight !== null && !isNaN(s.weight));
    const prevWeight = validLog ? parseFloat(validLog.weight) : current.weight;

    if (targetSets === 0) {
      return null; // Exercise was skipped/deleted entirely
    }

    const completedSets = loggedSets.filter(s => s.reps !== null && s.reps !== undefined && s.reps !== "");
    if (completedSets.length < targetSets) {
      return {
        prevWeight,
        nextWeight: prevWeight,
        status: "maintain",
        reason: `Completed ${completedSets.length}/${targetSets} sets. Target not fully logged.`
      };
    }

    const allMaxed = completedSets.every(s => s.reps >= maxReps);
    const anyUnderMin = completedSets.some(s => s.reps < minReps);

    let nextWeight = prevWeight;
    let status = "maintain";
    let reason = "";

    // Increment selection: Barbell & heavy leg machines increase by 5kg, dumbbells/cables/isolation by 2.5kg
    const heavyLifts = ["Barbell Squats", "Romanian Deadlifts", "Leg Press", "Lat Pulldowns", "Barbell Rows", "Chest Supported DB Rows/Cable Rows", "Chest Supported Upper Back Rows"];
    const isHeavy = heavyLifts.some(l => exName.toLowerCase().includes(l.toLowerCase()));
    const increment = isHeavy ? 5.0 : 2.5;

    if (allMaxed) {
      nextWeight = prevWeight + increment;
      status = "increase";
      reason = `✅ Hit top target of ${maxReps} reps on all sets. Increase weight to ${nextWeight} kg!`;
    } else if (anyUnderMin) {
      // Safe deload by 10%, rounded to nearest 2.5kg. Let's make sure it doesn't go below 0 or safe minimum
      let deloadWeight = prevWeight * 0.9;
      deloadWeight = Math.round(deloadWeight / 2.5) * 2.5;
      nextWeight = Math.max(2.5, deloadWeight);
      status = "deload";
      reason = `⚠️ Reps fell below minimum (${minReps}). Safe deload by 10% to ${nextWeight} kg for form.`;
    } else {
      status = "maintain";
      reason = `💪 Hit within ${minReps}-${maxReps} range. Keep at ${prevWeight} kg next session and push for max reps.`;
    }

    return {
      prevWeight,
      nextWeight,
      status,
      reason
    };
  }

  addCustomExercise(dayKey, name, sets, minReps, maxReps, weight, type, failureOnly, restSeconds) {
    const sanitizedName = name.trim();
    let exists = false;
    Object.keys(this.customProgram).forEach(key => {
      const found = this.customProgram[key].exercises.some(ex => ex.name.toLowerCase() === sanitizedName.toLowerCase());
      if (found) exists = true;
    });

    if (exists) {
      alert(`An exercise named "${sanitizedName}" already exists in the routine program.`);
      return false;
    }

    // 1. Add to custom program config
    this.customProgram[dayKey].exercises.push({
      name: sanitizedName,
      sets: sets,
      minReps: minReps,
      maxReps: maxReps,
      defaultWeight: weight,
      type: type,
      category: "hypertrophy",
      restSeconds: restSeconds,
      failureOnly: failureOnly
    });

    // 2. Initialize in currentWeights
    this.currentWeights[sanitizedName] = {
      weight: weight,
      minReps: minReps,
      maxReps: maxReps,
      sets: sets,
      type: type,
      failureOnly: failureOnly
    };

    // 3. Save profile and weights (which syncs to Cloud Firestore automatically)
    this.saveProfile();
    this.saveWeights();
    
    console.log(`[Program] Custom exercise added: ${sanitizedName} on ${dayKey}`);
    return true;
  }

  removeExerciseFromPlan(dayKey, exName) {
    if (!this.customProgram || !this.customProgram[dayKey]) {
      console.error(`[Program] Invalid dayKey: ${dayKey}`);
      return false;
    }

    // 1. Filter out the exercise from custom program config
    const originalCount = this.customProgram[dayKey].exercises.length;
    this.customProgram[dayKey].exercises = this.customProgram[dayKey].exercises.filter(
      ex => ex.name !== exName
    );

    if (this.customProgram[dayKey].exercises.length === originalCount) {
      console.warn(`[Program] Exercise "${exName}" not found on day ${dayKey}`);
      return false;
    }

    // 2. Remove from currentWeights to keep schema clean (only if not used in other days)
    let isUsedElsewhere = false;
    Object.keys(this.customProgram).forEach(key => {
      if (this.customProgram[key].exercises.some(ex => ex.name === exName)) {
        isUsedElsewhere = true;
      }
    });

    if (!isUsedElsewhere && this.currentWeights[exName]) {
      delete this.currentWeights[exName];
      this.saveWeights();
      if (this.firebaseInitialized && firestoreService && firestoreService.isReady()) {
        firestoreService.deleteExerciseTarget(exName).catch(err => console.error('[Sync] Target delete error:', err));
      }
    }

    // 3. Save profile and sync to cloud
    this.saveProfile();
    console.log(`[Program] Exercise removed: ${exName} from ${dayKey}`);
    return true;
  }

  // Check if an exercise has already been logged for a specific date/session
  isExerciseLogged(workoutKey, dateStr, exName) {
    const record = this.history.find(log => log.date === dateStr && log.workoutKey === workoutKey);
    if (!record) return false;
    const ex = record.exercises.find(e => e.name === exName);
    if (!ex) return false;
    return ex.sets.some(s => s.reps !== null && s.reps !== undefined && s.reps !== "");
  }

  // Remove a single exercise from a specific daily log in history
  removeExerciseFromHistory(workoutKey, dateStr, exName) {
    const record = this.history.find(log => log.date === dateStr && log.workoutKey === workoutKey);
    if (!record) return;

    // Sync removal to Firestore
    if (this.firebaseInitialized && firestoreService && firestoreService.isReady()) {
      firestoreService.removeExerciseLog(record.id, exName).catch(err => console.error('[Sync] Exercise log remove error:', err));
    }

    record.exercises = record.exercises.filter(e => e.name !== exName);
    if (record.exercises.length === 0) {
      // Delete the entire session from Firestore too
      if (this.firebaseInitialized && firestoreService && firestoreService.isReady()) {
        firestoreService.deleteWorkoutSession(record.id).catch(err => console.error('[Sync] Session delete error:', err));
      }
      this.history = this.history.filter(log => log.id !== record.id);
    }
    this.saveHistory();
  }

  // Log a single exercise's sets and update history and progressive overload weight
  logSingleExercise(workoutKey, dateStr, exName, loggedSets) {
    // Prevent duplicate logs of the same exercise on the same date
    if (this.isExerciseLogged(workoutKey, dateStr, exName)) {
      console.warn(`Exercise "${exName}" is already logged for ${dateStr}. Ignoring duplicate save.`);
      return null;
    }

    // 1. Find or create daily session log
    let record = this.history.find(log => log.date === dateStr && log.workoutKey === workoutKey);
    let isNewSession = false;
    if (!record) {
      record = {
        id: Date.now().toString(),
        date: dateStr,
        workoutKey: workoutKey,
        workoutName: this.customProgram[workoutKey].name,
        exercises: []
      };
      this.history.push(record);
      isNewSession = true;
    }

    // 2. Add or update the single exercise inside that daily session
    const exIndex = record.exercises.findIndex(e => e.name === exName);
    const exerciseRecord = {
      name: exName,
      sets: loggedSets
    };

    if (exIndex !== -1) {
      record.exercises[exIndex] = exerciseRecord;
    } else {
      record.exercises.push(exerciseRecord);
    }

    this.saveHistory();

    // Sync to Firestore
    if (this.firebaseInitialized && firestoreService && firestoreService.isReady()) {
      if (isNewSession) {
        firestoreService.saveWorkoutSession(record).catch(err => console.error('[Sync] Workout session save error:', err));
      } else {
        firestoreService.saveExerciseLog(record.id, dateStr, workoutKey, exerciseRecord)
          .catch(err => console.error('[Sync] Exercise log save error:', err));
      }
    }

    // 3. Process Progressive Overloading Rules for this single exercise
    const current = this.currentWeights[exName];
    let overloadReportItem = null;

    if (current) {
      const result = this.calculateNextStep(exName, loggedSets);
      if (result) {
        this.currentWeights[exName].weight = result.nextWeight;
        overloadReportItem = {
          name: exName,
          oldWeight: result.prevWeight,
          newWeight: result.nextWeight,
          status: result.status,
          reason: result.reason
        };
      }
      this.saveWeights();
    }

    // 4. Sync only this single exercise log payload to Google Sheets (formatted like a standard daily log but with only 1 exercise)
    if (this.profile.sheetsUrl) {
      const singleSyncPayload = {
        date: dateStr,
        workoutKey: workoutKey,
        workoutName: record.workoutName,
        exercises: [exerciseRecord]
      };
      syncToGoogleSheets(singleSyncPayload, this.profile.sheetsUrl);
    }

    return overloadReportItem;
  }

  // Finalize the daily session by calculating and attaching the timer duration
  finalizeWorkoutSession(workoutKey, dateStr) {
    const timerKey = `${dateStr}_${workoutKey}`;
    const timerData = this.activeTimers[timerKey];
    
    if (!timerData) return; // No timer was running

    let elapsedMs = timerData.accruedMs || 0;
    if (timerData.isRunning && timerData.startTime) {
      elapsedMs += (Date.now() - timerData.startTime);
    }
    const durationSeconds = Math.floor(elapsedMs / 1000);

    let record = this.history.find(log => log.date === dateStr && log.workoutKey === workoutKey);
    if (record) {
      record.durationSeconds = durationSeconds;
      this.saveHistory();

      // Sync to Firestore
      if (this.firebaseInitialized && firestoreService && firestoreService.isReady()) {
        firestoreService.saveWorkoutSession(record).catch(err => console.error('[Sync] Workout duration save error:', err));
      }
    }

    // Clear the active timer
    delete this.activeTimers[timerKey];
    this.saveActiveTimers();
  }

  addWeightLog(weightVal, dateStr) {
    // Check if entry for today exists
    const idx = this.weightLogs.findIndex(l => l.date === dateStr);
    if (idx !== -1) {
      this.weightLogs[idx].weight = parseFloat(weightVal);
    } else {
      this.weightLogs.push({ date: dateStr, weight: parseFloat(weightVal) });
    }
    // Sort chronologically
    this.weightLogs.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Always set profile weight to the chronologically latest log entry
    if (this.weightLogs.length > 0) {
      this.profile.weight = this.weightLogs[this.weightLogs.length - 1].weight;
    } else {
      this.profile.weight = parseFloat(weightVal);
    }
    this.saveWeightLogs();
    this.saveProfile();

    // Sync individual weight log to Firestore
    if (this.firebaseInitialized && firestoreService && firestoreService.isReady()) {
      firestoreService.saveWeightLog(dateStr, parseFloat(weightVal))
        .catch(err => console.error('[Sync] Weight log save error:', err));
    }
  }

  getTDEEData() {
    // Mifflin-St Jeor Equation
    // Men: BMR = 10 * weight (kg) + 6.25 * height (cm) - 5 * age (y) + 5
    const weight = this.profile.weight;
    const height = this.profile.height;
    const age = this.profile.age;
    const multiplier = parseFloat(this.profile.activityLevel);

    const bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    const tdee = bmr * multiplier;
    const targetCalories = tdee - this.profile.targetDeficit;

    // Macro splits: 
    // Protein: 1.8g per kg (or ~180g as a stable baseline for strength maintenance)
    // Fat: 25% of target calories
    // Carbs: Remaining calories
    const proteinGrams = Math.round(weight * 1.6); // ~180g at 112.8kg, very reasonable and highly effective
    const fatGrams = Math.round((targetCalories * 0.25) / 9);
    const proteinCalories = proteinGrams * 4;
    const fatCalories = fatGrams * 9;
    const carbCalories = targetCalories - proteinCalories - fatCalories;
    const carbGrams = Math.round(carbCalories / 4);

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      protein: proteinGrams,
      carb: carbGrams,
      fat: fatGrams
    };
  }
}

// Instantiate state
const appState = new StateManager();

// --- Progressive Overload Recommendation Engine (Smart Training Coach) ---
class RecommendationEngine {
  constructor(stateManager) {
    this.state = stateManager;
    // Deviation thresholds (percentage-based, from progressive overload research)
    this.WEIGHT_WARNING_THRESHOLD = 0.15;   // 15% above/below target
    this.WEIGHT_CRITICAL_THRESHOLD = 0.30;  // 30% above target (ego-lifting)
    this.WEIGHT_LIGHT_THRESHOLD = 0.20;     // 20% below target (sandbagging)
    this.PLATEAU_SESSION_THRESHOLD = 3;     // 3+ sessions of stagnation
    this.MISSED_PROGRESSION_THRESHOLD = 2;  // 2+ sessions at max reps without weight increase
    this.OVERREACHING_SESSION_THRESHOLD = 3; // 3+ sessions of declining reps
    this.REP_VARIANCE_THRESHOLD = 3;        // Standard deviation of reps across sets
    this.MAX_EXTRA_SETS = 2;                // Extra sets beyond prescribed before warning
    this.HISTORY_LOOKBACK = 5;              // Number of historical sessions to analyze
  }

  /**
   * Retrieve the last N logged sessions for a specific exercise+workoutKey combination
   */
  getExerciseHistory(exName, workoutKey, limit) {
    const lookback = limit || this.HISTORY_LOOKBACK;
    const relevantLogs = this.state.history
      .filter(log => log.workoutKey === workoutKey)
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // chronological

    const entries = [];
    relevantLogs.forEach(log => {
      const ex = log.exercises.find(e => e.name === exName);
      if (ex && ex.sets && ex.sets.length > 0) {
        const completedSets = ex.sets.filter(s => s.reps !== null && s.reps !== undefined && s.reps !== "");
        if (completedSets.length > 0) {
          entries.push({
            date: log.date,
            sets: completedSets,
            avgWeight: completedSets.reduce((sum, s) => sum + (s.weight || 0), 0) / completedSets.length,
            avgReps: completedSets.reduce((sum, s) => sum + s.reps, 0) / completedSets.length,
            totalVolume: completedSets.reduce((sum, s) => sum + ((s.weight || 0) * s.reps), 0),
            setCount: completedSets.length
          });
        }
      }
    });

    return entries.slice(-lookback);
  }

  /**
   * Detect if logged weight deviates significantly from the target weight
   * Covers: "Wrong weight" scenarios
   */
  detectWeightDeviation(exName, loggedSets, originalTargetWeight) {
    const target = this.state.currentWeights[exName];
    if (!target || target.failureOnly) return null;

    const targetWeight = (originalTargetWeight !== undefined && originalTargetWeight !== null)
      ? originalTargetWeight
      : target.weight;
    if (targetWeight <= 0) return null;

    // Use the weight from the first valid set (user typically enters same weight for all sets)
    const validSet = loggedSets.find(s => s.weight !== undefined && s.weight !== null && !isNaN(s.weight) && s.weight > 0);
    if (!validSet) return null;

    const loggedWeight = parseFloat(validSet.weight);
    const deviation = (loggedWeight - targetWeight) / targetWeight;
    const absDeviation = Math.abs(deviation);
    const deviationPct = Math.round(absDeviation * 100);

    if (deviation > this.WEIGHT_CRITICAL_THRESHOLD) {
      // Weight is 30%+ above target — critical ego-lifting warning
      const safeWeight = targetWeight + (targetWeight * 0.10); // suggest 10% above max
      return {
        type: 'wrong-weight',
        severity: 'critical',
        exercise: exName,
        title: '🚨 Weight Dangerously Heavy',
        message: `You logged ${loggedWeight}kg but your target is ${targetWeight}kg (${deviationPct}% above target). This jump far exceeds safe progressive overload limits and significantly increases injury risk.`,
        recommendation: `Immediately reduce weight to ${Math.round(safeWeight / 2.5) * 2.5}kg. Progressive overload recommends max 5-10% weight increases per progression cycle.`,
        dataPoints: { targetWeight, loggedWeight, deviation: deviationPct, direction: 'heavy' }
      };
    } else if (deviation > this.WEIGHT_WARNING_THRESHOLD) {
      // Weight is 15-30% above target — warning
      return {
        type: 'wrong-weight',
        severity: 'warning',
        exercise: exName,
        title: '⚠️ Weight Above Target',
        message: `You logged ${loggedWeight}kg but your progressive overload target is ${targetWeight}kg (${deviationPct}% above). Using a weight beyond your current progression level may compromise form.`,
        recommendation: `Consider reducing to ${targetWeight}kg and focusing on hitting ${target.maxReps} reps on all sets before progressing. Double Progression demands mastery at the current level first.`,
        dataPoints: { targetWeight, loggedWeight, deviation: deviationPct, direction: 'heavy' }
      };
    } else if (deviation < -this.WEIGHT_LIGHT_THRESHOLD) {
      // Weight is 20%+ below target — sandbagging
      return {
        type: 'wrong-weight',
        severity: 'warning',
        exercise: exName,
        title: '⚠️ Weight Below Target',
        message: `You logged ${loggedWeight}kg but your target is ${targetWeight}kg (${deviationPct}% below). Training significantly below your progression target may not provide sufficient stimulus for muscle growth.`,
        recommendation: `Increase weight to ${targetWeight}kg for your next session. If the target weight feels too heavy, try ${Math.round((targetWeight * 0.9) / 2.5) * 2.5}kg (10% deload) to rebuild.`,
        dataPoints: { targetWeight, loggedWeight, deviation: deviationPct, direction: 'light' }
      };
    }

    return null;
  }

  /**
   * Detect if the number of logged sets deviates from the prescribed count
   * Covers: "Wrong sets" scenarios
   */
  detectSetCountAnomaly(exName, loggedSets) {
    const target = this.state.currentWeights[exName];
    if (!target || target.failureOnly) return null;

    const targetSets = target.sets;
    const completedSets = loggedSets.filter(s => s.reps !== null && s.reps !== undefined && s.reps !== "");
    const loggedCount = completedSets.length;

    if (loggedCount < targetSets) {
      const missingCount = targetSets - loggedCount;
      const volumeLoss = Math.round((missingCount / targetSets) * 100);
      return {
        type: 'wrong-sets',
        severity: 'warning',
        exercise: exName,
        title: '⚠️ Incomplete Volume',
        message: `You completed ${loggedCount} of ${targetSets} prescribed sets (${volumeLoss}% volume loss). Incomplete set coverage reduces training stimulus and may slow your progressive overload.`,
        recommendation: `Aim to complete all ${targetSets} sets. If fatigue is causing early stops, consider a 10% deload to maintain full volume across all sets.`,
        dataPoints: { targetSets, loggedCount, volumeLoss }
      };
    } else if (loggedCount > targetSets + this.MAX_EXTRA_SETS) {
      return {
        type: 'wrong-sets',
        severity: 'info',
        exercise: exName,
        title: 'ℹ️ Excessive Volume (Junk Sets)',
        message: `You logged ${loggedCount} sets but only ${targetSets} are prescribed. Beyond ${targetSets + this.MAX_EXTRA_SETS} sets, additional volume may be "junk volume" — adding fatigue without proportional muscle growth benefit.`,
        recommendation: `Stick to ${targetSets} high-quality sets. If you feel energized, focus on pushing reps higher within the target range rather than adding sets.`,
        dataPoints: { targetSets, loggedCount }
      };
    }

    return null;
  }

  /**
   * Detect erratic rep distribution across sets (high variance = inconsistent performance)
   */
  detectRepDistributionIssue(exName, loggedSets) {
    const target = this.state.currentWeights[exName];
    if (!target || target.failureOnly) return null;

    const completedSets = loggedSets.filter(s => s.reps !== null && s.reps !== undefined && s.reps !== "");
    if (completedSets.length < 2) return null;

    const reps = completedSets.map(s => parseInt(s.reps));
    const mean = reps.reduce((a, b) => a + b, 0) / reps.length;
    const variance = reps.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / reps.length;
    const stdDev = Math.sqrt(variance);

    if (stdDev > this.REP_VARIANCE_THRESHOLD) {
      const maxReps = Math.max(...reps);
      const minReps = Math.min(...reps);
      return {
        type: 'form-warning',
        severity: 'warning',
        exercise: exName,
        title: '⚠️ Erratic Rep Performance',
        message: `Your reps varied widely across sets (${minReps} to ${maxReps} reps, std dev: ${stdDev.toFixed(1)}). This usually indicates the weight is too heavy to sustain consistent performance, or rest periods are insufficient.`,
        recommendation: `Consider reducing weight by 5-10% to achieve consistent reps across all sets. Target a stable ${target.minReps}-${target.maxReps} range on every set. Ensure you are resting ${this._getRestForExercise(exName)} between sets.`,
        dataPoints: { reps, stdDev: stdDev.toFixed(1), minReps, maxReps }
      };
    }

    return null;
  }

  /**
   * Detect training plateau: same weight + stagnant reps for 3+ consecutive sessions
   */
  detectPlateau(exName, workoutKey) {
    const history = this.getExerciseHistory(exName, workoutKey);
    if (history.length < this.PLATEAU_SESSION_THRESHOLD) return null;

    const recent = history.slice(-this.PLATEAU_SESSION_THRESHOLD);
    const firstEntry = recent[0];

    // Check if weight and average reps are essentially unchanged across all recent sessions
    const allSameWeight = recent.every(h => Math.abs(h.avgWeight - firstEntry.avgWeight) < 1.0);
    const allSameReps = recent.every(h => Math.abs(h.avgReps - firstEntry.avgReps) < 1.0);

    if (allSameWeight && allSameReps) {
      const target = this.state.currentWeights[exName];
      const avgReps = Math.round(firstEntry.avgReps);
      const weight = Math.round(firstEntry.avgWeight * 10) / 10;
      const sessionCount = recent.length;

      // Are they stuck below max reps?
      const belowMax = target && avgReps < target.maxReps;

      return {
        type: 'plateau',
        severity: 'warning',
        exercise: exName,
        title: '📊 Plateau Detected',
        message: `You've been at ${weight}kg for ~${avgReps} reps across ${sessionCount} consecutive sessions. Your performance has stalled — this is a classic training plateau.`,
        recommendation: belowMax
          ? `Try these strategies: (1) Add 1 rep per set each session until you hit ${target.maxReps} reps across all sets. (2) If stalled for 4+ weeks, schedule a deload week at 60% intensity. (3) Consider micro-loading (+1.25kg) instead of standard jumps.`
          : `You are hitting max reps consistently. You should be ready to progress weight! Try increasing by the minimum increment (2.5kg).`,
        dataPoints: { weight, avgReps, sessionCount, sessions: recent.map(h => h.date) }
      };
    }

    return null;
  }

  /**
   * Detect missed progression: hitting max reps on all sets for 2+ sessions without weight increase
   */
  detectMissedProgression(exName, workoutKey) {
    const target = this.state.currentWeights[exName];
    if (!target || target.failureOnly) return null;

    const history = this.getExerciseHistory(exName, workoutKey);
    if (history.length < this.MISSED_PROGRESSION_THRESHOLD) return null;

    const recent = history.slice(-this.MISSED_PROGRESSION_THRESHOLD);

    // Check if all recent sessions had all sets at or above max reps, at the same weight
    const allMaxed = recent.every(h => {
      const sameWeight = Math.abs(h.avgWeight - recent[0].avgWeight) < 1.0;
      const hitsMax = h.sets.every(s => s.reps >= target.maxReps);
      return sameWeight && hitsMax;
    });

    if (allMaxed) {
      const currentWeight = Math.round(recent[0].avgWeight * 10) / 10;
      // Determine appropriate increment
      const heavyLifts = ["Barbell Squats", "Romanian Deadlifts", "Leg Press", "Lat Pulldowns", "Barbell Rows", "Chest Supported DB Rows/Cable Rows", "Chest Supported Upper Back Rows"];
      const isHeavy = heavyLifts.some(l => exName.toLowerCase().includes(l.toLowerCase()));
      const increment = isHeavy ? 5.0 : 2.5;
      const nextWeight = currentWeight + increment;

      return {
        type: 'missed-progression',
        severity: 'info',
        exercise: exName,
        title: '🚀 Ready to Progress!',
        message: `You've hit ${target.maxReps} reps on ALL sets for ${recent.length} consecutive sessions at ${currentWeight}kg. You have mastered this weight — it's time to progress!`,
        recommendation: `Increase weight to ${nextWeight}kg next session. Your reps will naturally drop back to ~${target.minReps} — that's expected. Build back up to ${target.maxReps} reps at the new weight before progressing again (Double Progression).`,
        dataPoints: { currentWeight, nextWeight, increment, sessionsAtMax: recent.length }
      };
    }

    return null;
  }

  /**
   * Detect overreaching: reps declining across 3+ consecutive sessions (fatigue accumulation)
   */
  detectOverreaching(exName, workoutKey) {
    const history = this.getExerciseHistory(exName, workoutKey);
    if (history.length < this.OVERREACHING_SESSION_THRESHOLD) return null;

    const recent = history.slice(-this.OVERREACHING_SESSION_THRESHOLD);

    // Check for strictly declining average reps across consecutive sessions
    let declining = true;
    for (let i = 1; i < recent.length; i++) {
      if (recent[i].avgReps >= recent[i - 1].avgReps) {
        declining = false;
        break;
      }
    }

    if (declining) {
      const repTrend = recent.map(h => Math.round(h.avgReps * 10) / 10);
      const totalDrop = Math.round((repTrend[0] - repTrend[repTrend.length - 1]) * 10) / 10;

      return {
        type: 'overreaching',
        severity: 'critical',
        exercise: exName,
        title: '🔴 Overreaching Detected',
        message: `Your reps have been declining for ${recent.length} consecutive sessions (${repTrend.join(' → ')} avg reps). A drop of ${totalDrop} reps signals accumulated fatigue — your body is not recovering between sessions.`,
        recommendation: `Schedule a deload week: reduce training volume by 40-50% (fewer sets, lighter weight at RPE 5-6). After the deload, resume at your current weight — you should see an immediate performance rebound.`,
        dataPoints: { repTrend, totalDrop, sessionCount: recent.length }
      };
    }

    return null;
  }

  /**
   * Helper: Get rest period for an exercise from program config
   */
  _getRestForExercise(exName) {
    if (!this.state.customProgram) return '90s';
    for (const dayKey of Object.keys(this.state.customProgram)) {
      if (!this.state.customProgram[dayKey] || !this.state.customProgram[dayKey].exercises) continue;
      const ex = this.state.customProgram[dayKey].exercises.find(e => e.name === exName);
      if (ex) {
        const secs = ex.restSeconds || 90;
        if (secs >= 60) {
          const mins = Math.floor(secs / 60);
          const rem = secs % 60;
          return rem > 0 ? `${mins}m ${rem}s` : `${mins} min`;
        }
        return `${secs}s`;
      }
    }
    return '90s';
  }

  /**
   * Main analysis: run ALL detectors for a single exercise after it's logged
   * Returns { alerts: [], insights: [] }
   */
  analyzeExercise(exName, loggedSets, workoutKey, originalTargetWeight) {
    const alerts = [];

    // 1. Weight deviation check
    const weightAlert = this.detectWeightDeviation(exName, loggedSets, originalTargetWeight);
    if (weightAlert) alerts.push(weightAlert);

    // 2. Set count anomaly check
    const setAlert = this.detectSetCountAnomaly(exName, loggedSets);
    if (setAlert) alerts.push(setAlert);

    // 3. Rep distribution check
    const repAlert = this.detectRepDistributionIssue(exName, loggedSets);
    if (repAlert) alerts.push(repAlert);

    // 4. Plateau detection (historical)
    const plateauAlert = this.detectPlateau(exName, workoutKey);
    if (plateauAlert) alerts.push(plateauAlert);

    // 5. Missed progression detection (historical)
    const progressionAlert = this.detectMissedProgression(exName, workoutKey);
    if (progressionAlert) alerts.push(progressionAlert);

    // 6. Overreaching detection (historical)
    const overreachAlert = this.detectOverreaching(exName, workoutKey);
    if (overreachAlert) alerts.push(overreachAlert);

    // Sort by severity: critical > warning > info
    const severityOrder = { critical: 0, warning: 1, info: 2 };
    alerts.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

    return { alerts };
  }

  /**
   * Full dashboard scan: analyze ALL exercises across all workout days
   * Returns a flat array of alerts for the dashboard Smart Coach panel
   */
  generateDashboardAlerts() {
    const allAlerts = [];
    if (!this.state.customProgram) {
      console.warn("generateDashboardAlerts: customProgram is not initialized.");
      return [];
    }

    Object.keys(this.state.customProgram).forEach(dayKey => {
      if (!this.state.customProgram[dayKey] || !this.state.customProgram[dayKey].exercises) return;
      this.state.customProgram[dayKey].exercises.forEach(ex => {
        if (ex.failureOnly) return;

        const history = this.getExerciseHistory(ex.name, dayKey);
        if (history.length < 2) return; // Need at least 2 sessions for trend analysis

        // Run historical detectors only (not per-session weight/set checks)
        const plateauAlert = this.detectPlateau(ex.name, dayKey);
        if (plateauAlert) allAlerts.push(plateauAlert);

        const progressionAlert = this.detectMissedProgression(ex.name, dayKey);
        if (progressionAlert) allAlerts.push(progressionAlert);

        const overreachAlert = this.detectOverreaching(ex.name, dayKey);
        if (overreachAlert) allAlerts.push(overreachAlert);
      });
    });

    // Sort by severity, then deduplicate by exercise name + type
    const severityOrder = { critical: 0, warning: 1, info: 2 };
    allAlerts.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

    // Deduplicate: keep the highest severity alert per exercise
    const seen = new Set();
    return allAlerts.filter(alert => {
      const key = `${alert.exercise}_${alert.type}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  /**
   * Analyze Progressive Overload Volume for the last N sessions.
   * Returns data for charting and a trend classification.
   */
  analyzeVolumeTrend(lastN = 8) {
    if (!this.state.history || this.state.history.length === 0) {
      return { labels: [], data: [], trend: 'insufficient_data' };
    }

    const sortedLogs = [...this.state.history].sort((a, b) => new Date(a.date) - new Date(b.date));
    const recentLogs = sortedLogs.slice(-lastN);

    const labels = [];
    const data = [];

    recentLogs.forEach(log => {
      let totalVolume = 0;
      log.exercises.forEach(ex => {
        if (ex.sets) {
          ex.sets.forEach(set => {
            if (set.reps && set.weight) {
              totalVolume += (set.reps * set.weight);
            }
          });
        }
      });
      
      const dateShort = new Date(log.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      labels.push(`${log.workoutName} (${dateShort})`);
      data.push(totalVolume);
    });

    let trend = 'flat';
    if (data.length >= 3) {
      const firstHalfAvg = data.slice(0, Math.floor(data.length / 2)).reduce((a, b) => a + b, 0) / Math.floor(data.length / 2);
      const secondHalfAvg = data.slice(Math.floor(data.length / 2)).reduce((a, b) => a + b, 0) / Math.ceil(data.length / 2);
      
      if (secondHalfAvg > firstHalfAvg * 1.05) trend = 'increasing';
      else if (secondHalfAvg < firstHalfAvg * 0.95) trend = 'decreasing';
    }

    return { labels, data, trend };
  }

  /**
   * Analyze recovery and CNS fatigue based on consecutive days trained
   * and specific heavy sessions (Leg Days).
   */
  analyzeRecoveryStatus() {
    if (!this.state.history || this.state.history.length === 0) {
      return { severity: 'info', icon: '✅', title: 'Fresh Start', desc: 'Ready to train. Go crush your workout!' };
    }

    const sortedLogs = [...this.state.history].sort((a, b) => new Date(a.date) - new Date(b.date));
    const lastLog = sortedLogs[sortedLogs.length - 1];
    
    // Calculate consecutive days
    let consecutiveDays = 1;
    for (let i = sortedLogs.length - 2; i >= 0; i--) {
      const d1 = new Date(sortedLogs[i+1].date);
      const d2 = new Date(sortedLogs[i].date);
      const diffTime = Math.abs(d1 - d2);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        consecutiveDays++;
      } else if (diffDays === 0) {
        // Same day log, ignore in consecutive days count
      } else {
        break; // Gap found
      }
    }

    const lastLogDate = new Date(lastLog.date);
    const today = new Date();
    const daysSinceLastWorkout = Math.floor((today - lastLogDate) / (1000 * 60 * 60 * 24));

    if (daysSinceLastWorkout >= 2) {
      return { severity: 'info', icon: '🔋', title: 'Fully Recovered', desc: 'You are well-rested. Prime time for a heavy session.' };
    }

    if (consecutiveDays >= 6) {
      return { severity: 'critical', icon: '🚨', title: 'High CNS Fatigue Risk', desc: `You've trained ${consecutiveDays} days in a row. It is highly recommended to take a REST DAY tomorrow. Muscle grows during recovery, not training.` };
    }

    if (lastLog.workoutKey === 'legs1' || lastLog.workoutKey === 'legs2') {
      if (daysSinceLastWorkout < 2) {
        return { severity: 'warning', icon: '🦵', title: 'Leg Day Recovery', desc: 'You recently completed a heavy lower body session. Expect systemic CNS fatigue. Focus on upper body or active recovery today.' };
      }
    }

    if (consecutiveDays >= 4) {
      return { severity: 'warning', icon: '🔋', title: 'Accumulating Fatigue', desc: `You're on a ${consecutiveDays}-day streak. Keep pushing, but listen to your joints.` };
    }

    return { severity: 'info', icon: '⚡', title: 'Optimal Training Window', desc: 'Recovery is on track. Keep following the program.' };
  }

  /**
   * Cross-reference body weight trends with workout volume
   * to determine if recomposition, fat loss, or muscle loss is occurring.
   */
  generateHolisticInsights(volumeTrend) {
    if (!this.state.weightLogs || this.state.weightLogs.length < 3 || volumeTrend.trend === 'insufficient_data') {
      return { title: 'Gathering Data', desc: 'Keep logging your body weight and workouts for a few more days to unlock holistic analysis.' };
    }

    const sortedWeights = [...this.state.weightLogs].sort((a, b) => new Date(a.date) - new Date(b.date));
    const recentWeights = sortedWeights.slice(-7); // Look at last 7 logs

    const startWeight = recentWeights[0].weight;
    const endWeight = recentWeights[recentWeights.length - 1].weight;
    
    let weightTrend = 'flat';
    if (endWeight < startWeight - 0.5) weightTrend = 'decreasing';
    else if (endWeight > startWeight + 0.5) weightTrend = 'increasing';

    if (weightTrend === 'decreasing' && volumeTrend.trend === 'increasing') {
      return { title: '🔥 Ultimate Recomposition', desc: 'Your body weight is dropping, but your total workout volume is increasing! You are successfully losing fat while gaining (or maintaining) strength. This is the holy grail of fitness.' };
    } else if (weightTrend === 'decreasing' && volumeTrend.trend === 'decreasing') {
      return { title: '⚠️ Excessive Deficit Risk', desc: 'Your weight is dropping, but your workout volume is also taking a hit. You might be in too deep of a caloric deficit, leading to muscle/strength loss. Consider increasing daily calories slightly.' };
    } else if (weightTrend === 'increasing' && volumeTrend.trend === 'increasing') {
      return { title: '💪 Solid Bulking Phase', desc: 'Weight is going up, and strength/volume is following. You are effectively building mass.' };
    } else if (weightTrend === 'increasing' && volumeTrend.trend === 'decreasing') {
      return { title: '🛑 Stop & Re-evaluate', desc: 'Body weight is increasing, but training volume is dropping. This usually indicates poor recovery, poor diet quality, or excessive stress. Evaluate your sleep and nutrition immediately.' };
    } else if (weightTrend === 'flat' && volumeTrend.trend === 'increasing') {
      return { title: '📈 Lean Gains', desc: 'Your weight is stable, but your volume is going up. You are building strength and likely exchanging fat for muscle.' };
    }

    return { title: 'Consistent Training', desc: 'You are maintaining your weight and strength perfectly. Stay consistent!' };
  }
}

// Instantiate the recommendation engine
const coachEngine = new RecommendationEngine(appState);

// --- UI Logic & Render Components ---
document.addEventListener("DOMContentLoaded", () => {
  // Phase 1: Instant UI render from localStorage (fast first paint)
  initTabs();
  initProfileForm();
  initWeightLogger();
  initWorkoutSelector();
  renderCalorieWidget();
  renderPlanList();
  setupAddExerciseModal();
  setupDiscardSessionHandler();
  renderHistoryTable();
  buildCharts();
  
  // Phase 1.5: Render Smart Coach Alerts from local data
  renderCoachAlerts();
  
  // Initialize secure Auth UI handlers (Login inputs, buttons, errors, spinners)
  initAuthUI();

  // Phase 2: Async Firebase initialization (background)
  appState.initAsync().catch(err => {
    console.error('[Boot] Firebase async init error:', err);
  });
});

/**
 * Initializes and wires up event listeners for the AESTHETIX secure access gateway.
 */
function initAuthUI() {
  const loginForm = document.getElementById('login-form');
  const loginEmail = document.getElementById('login-email');
  const loginPassword = document.getElementById('login-password');
  const togglePasswordBtn = document.getElementById('toggle-password-btn');
  const toggleSetupModeLink = document.getElementById('toggle-setup-mode-link');
  const loginFormTitle = document.getElementById('login-form-title');
  const loginFormDesc = document.getElementById('login-form-desc');
  const loginErrorAlert = document.getElementById('login-error-alert');
  const submitBtn = document.getElementById('login-submit-btn');
  const submitBtnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
  const submitBtnSpinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;
  const signoutBtn = document.getElementById('auth-signout-btn');

  let isRegisterMode = false;

  // Set default placeholder for email if configured
  if (loginEmail && typeof getAuthorizedEmail === 'function') {
    loginEmail.value = getAuthorizedEmail();
  }

  // Password Visibility Toggle
  if (togglePasswordBtn && loginPassword) {
    togglePasswordBtn.addEventListener('click', () => {
      const isPassword = loginPassword.type === 'password';
      loginPassword.type = isPassword ? 'text' : 'password';
      
      const eyeOpen = togglePasswordBtn.querySelector('.eye-open-icon');
      const eyeClosed = togglePasswordBtn.querySelector('.eye-closed-icon');
      
      if (eyeOpen && eyeClosed) {
        if (isPassword) {
          eyeOpen.style.display = 'none';
          eyeClosed.style.display = 'block';
        } else {
          eyeOpen.style.display = 'block';
          eyeClosed.style.display = 'none';
        }
      }
    });
  }

  // Switch between Sign In and Registration views
  if (toggleSetupModeLink) {
    toggleSetupModeLink.addEventListener('click', (e) => {
      e.preventDefault();
      isRegisterMode = !isRegisterMode;
      
      if (loginErrorAlert) loginErrorAlert.style.display = 'none';
      if (loginPassword) loginPassword.value = '';

      if (isRegisterMode) {
        if (loginFormTitle) loginFormTitle.textContent = "First-Time Registration";
        if (loginFormDesc) loginFormDesc.textContent = "Create your permanent access password. Only the authorized email can be registered.";
        if (submitBtnText) submitBtnText.textContent = "Register & Sign In";
        toggleSetupModeLink.textContent = "Already have an account? Sign In";
      } else {
        if (loginFormTitle) loginFormTitle.textContent = "Access Gateway";
        if (loginFormDesc) loginFormDesc.textContent = "Provide credentials to access your fitness engine.";
        if (submitBtnText) submitBtnText.textContent = "Sign In";
        toggleSetupModeLink.textContent = "First-Time Setup? Register Account";
      }
    });
  }

  // Header Sign Out button listener
  if (signoutBtn) {
    signoutBtn.addEventListener('click', async () => {
      if (confirm("Are you sure you want to sign out of Aesthetix?")) {
        try {
          if (typeof signOutUser === 'function') {
            await signOutUser();
          }
        } catch (err) {
          console.error('[Auth] Sign-out error:', err);
        }
      }
    });
  }

  // Form Submission handling
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = loginEmail ? loginEmail.value.trim() : '';
      const password = loginPassword ? loginPassword.value : '';

      if (loginErrorAlert) loginErrorAlert.style.display = 'none';

      if (!email || !password) {
        showLoginError("Please enter both email and password.");
        return;
      }

      setSubmitLoading(true);

      try {
        if (isRegisterMode) {
          if (typeof registerUser === 'function') {
            await registerUser(email, password);
            console.log("[Auth] User registered successfully");
          }
        } else {
          if (typeof signInUser === 'function') {
            await signInUser(email, password);
            console.log("[Auth] User signed in successfully");
          }
        }
      } catch (err) {
        console.error('[Auth] Authentication failed:', err);
        let userMessage = err.message;
        if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
          userMessage = "Invalid credentials. Please verify your email and access password.";
        } else if (err.code === 'auth/invalid-email') {
          userMessage = "Invalid email format. Please provide a valid email.";
        } else if (err.code === 'auth/weak-password') {
          userMessage = "Password is too weak. Must be at least 6 characters.";
        } else if (err.code === 'auth/operation-not-allowed') {
          userMessage = "Email/Password sign-in provider is disabled in Firebase Console.";
        }
        showLoginError(userMessage);
        setSubmitLoading(false);
      }
    });
  }

  function showLoginError(msg) {
    if (loginErrorAlert) {
      loginErrorAlert.textContent = msg;
      loginErrorAlert.style.display = 'block';
    }
  }

  function setSubmitLoading(isLoading) {
    if (submitBtn) submitBtn.disabled = isLoading;
    if (loginEmail) loginEmail.disabled = isLoading;
    if (loginPassword) loginPassword.disabled = isLoading;
    
    if (submitBtnSpinner && submitBtnText) {
      if (isLoading) {
        submitBtnSpinner.style.display = 'inline-block';
        submitBtnText.style.opacity = '0.5';
      } else {
        submitBtnSpinner.style.display = 'none';
        submitBtnText.style.opacity = '1';
      }
    }
  }
}

/**
 * Update the sync status indicator in the header
 * @param {string} status - 'synced' | 'syncing' | 'offline' | 'error' | 'initializing' | 'local-only'
 * @param {string} label - Display text for the status
 */
function updateSyncStatusUI(status, label) {
  const indicator = document.getElementById('sync-status-indicator');
  if (!indicator) return;

  const dot = indicator.querySelector('.sync-dot');
  const labelEl = indicator.querySelector('.sync-label');

  if (dot) {
    // Remove all status classes
    dot.className = 'sync-dot';
    // Add the new status class
    dot.classList.add(status);
  }

  if (labelEl) {
    labelEl.textContent = label || status;
  }
}

/**
 * Re-render all UI components (called after Firestore data loads)
 */
function refreshAllUI() {
  try {
    initProfileForm();
    initWeightLogger();
    renderCalorieWidget();
    renderPlanList();
    renderHistoryTable();
    renderActiveWorkout();
    buildCharts();
    renderCoachAlerts();
  } catch (err) {
    console.error('[UI] Error refreshing UI:', err);
  }
}

/**
 * Render Smart Coach Alerts on the Dashboard tab
 * Scans all exercises for training pattern issues (plateau, overreaching, missed progression)
 */
function renderCoachAlerts() {
  const container = document.getElementById("coach-alerts-container");
  const alertsList = document.getElementById("coach-alerts-list");
  const countBadge = document.getElementById("coach-alerts-count");
  if (!container || !alertsList) return;

  const alerts = coachEngine.generateDashboardAlerts();

  if (alerts.length === 0) {
    container.style.display = "none";
    return;
  }

  container.style.display = "block";
  alertsList.innerHTML = "";
  if (countBadge) countBadge.textContent = alerts.length;

  alerts.forEach((alert, idx) => {
    const card = document.createElement("div");
    card.className = `coach-alert-card severity-${alert.severity}`;
    card.style.animationDelay = `${idx * 0.08}s`;

    const severityIcons = { critical: '🔴', warning: '🟡', info: '🟢' };
    const severityLabels = { critical: 'CRITICAL', warning: 'WARNING', info: 'INFO' };

    card.innerHTML = `
      <div class="coach-alert-header">
        <span class="coach-alert-severity-badge severity-${alert.severity}">
          ${severityIcons[alert.severity]} ${severityLabels[alert.severity]}
        </span>
        <span class="coach-alert-exercise">${alert.exercise}</span>
      </div>
      <div class="coach-alert-title">${alert.title}</div>
      <div class="coach-alert-message">${alert.message}</div>
      <div class="coach-alert-recommendation">
        <strong>💡 Recommendation:</strong> ${alert.recommendation}
      </div>
    `;
    alertsList.appendChild(card);
  });
}


// 1. Tab Navigation
function initTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      const tabId = btn.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");

      // Re-trigger chart render on dashboard tab activate
      if (tabId === "dashboard-tab") {
        setTimeout(buildCharts, 50);
      } else if (tabId === "insights-tab") {
        setTimeout(renderInsightsTab, 50);
      }
    });
  });
}

// 2. Profile Calculations Setup
function initProfileForm() {
  const ageInput = document.getElementById("prof-age");
  const heightInput = document.getElementById("prof-height");
  const weightInput = document.getElementById("prof-weight");
  const actSelect = document.getElementById("prof-activity");
  const deficitInput = document.getElementById("prof-deficit");
  const sheetsUrlInput = document.getElementById("pref-sheets-url");

  if (!ageInput) return;

  // Load current values
  ageInput.value = appState.profile.age;
  heightInput.value = appState.profile.height;
  weightInput.value = appState.profile.weight;
  actSelect.value = appState.profile.activityLevel;
  deficitInput.value = appState.profile.targetDeficit;
  if (sheetsUrlInput) {
    sheetsUrlInput.value = appState.profile.sheetsUrl || "";
  }

  const updateProfile = () => {
    appState.profile.age = parseInt(ageInput.value) || 30;
    appState.profile.height = parseFloat(heightInput.value) || 175;
    appState.profile.weight = parseFloat(weightInput.value) || 112.8;
    appState.profile.activityLevel = actSelect.value;
    appState.profile.targetDeficit = parseInt(deficitInput.value) || 700;
    if (sheetsUrlInput) {
      appState.profile.sheetsUrl = sheetsUrlInput.value.trim();
    }

    appState.saveProfile();
    renderCalorieWidget();

    // Sync back to dashboard logger input if it exists
    const dashboardWeightField = document.getElementById("log-w-val");
    if (dashboardWeightField) dashboardWeightField.value = appState.profile.weight;
  };

  const inputs = [ageInput, heightInput, weightInput, actSelect, deficitInput];
  if (sheetsUrlInput) inputs.push(sheetsUrlInput);

  inputs.forEach(elem => {
    elem.addEventListener("input", updateProfile);
  });
}

// 3. Calorie & Macro rendering widget
function renderCalorieWidget() {
  const data = appState.getTDEEData();
  
  const calVal = document.getElementById("calc-calories");
  const bmrVal = document.getElementById("calc-bmr");
  const tdeeVal = document.getElementById("calc-tdee");
  const pGrams = document.getElementById("macro-protein");
  const cGrams = document.getElementById("macro-carbs");
  const fGrams = document.getElementById("macro-fats");

  if (!calVal) return;

  calVal.textContent = data.targetCalories.toLocaleString();
  bmrVal.textContent = data.bmr.toLocaleString() + " kcal";
  tdeeVal.textContent = data.tdee.toLocaleString() + " kcal";
  pGrams.textContent = data.protein + "g";
  cGrams.textContent = data.carb + "g";
  fGrams.textContent = data.fat + "g";

  const dashWeight = document.getElementById("dash-weight");
  const dashCalories = document.getElementById("dash-calories");
  if (dashWeight) dashWeight.textContent = appState.profile.weight + " kg";
  if (dashCalories) dashCalories.textContent = data.targetCalories.toLocaleString() + " kcal";

  // Render progress rings or simple progress bars
  const pPct = document.getElementById("pct-protein");
  const cPct = document.getElementById("pct-carbs");
  const fPct = document.getElementById("pct-fats");

  const totalMacros = data.protein + data.carb + data.fat;
  pPct.style.width = ((data.protein / totalMacros) * 100) + "%";
  cPct.style.width = ((data.carb / totalMacros) * 100) + "%";
  fPct.style.width = ((data.fat / totalMacros) * 100) + "%";
}

// 4. Quick Daily Weight Logger
function initWeightLogger() {
  const wVal = document.getElementById("log-w-val");
  const wDate = document.getElementById("log-w-date");
  const wBtn = document.getElementById("log-w-submit");

  if (!wBtn) return;

  // Default to today using timezone-accurate local date
  wDate.value = getLocalDateString();
  wVal.value = appState.profile.weight;

  wBtn.addEventListener("click", () => {
    const val = parseFloat(wVal.value);
    const dt = wDate.value;
    if (isNaN(val) || !dt) {
      alert("Please enter a valid weight and date.");
      return;
    }

    appState.addWeightLog(val, dt);
    
    // Sync profile display fields to the actual current latest weight
    const profWeightField = document.getElementById("prof-weight");
    if (profWeightField) profWeightField.value = appState.profile.weight;
    
    renderCalorieWidget();
    buildCharts();

    // Show nice feedback
    wBtn.textContent = "Saved ✓";
    wBtn.style.backgroundColor = "#2ecc71";
    setTimeout(() => {
      wBtn.textContent = "Log Weight";
      wBtn.style.backgroundColor = "";
    }, 2000);
  });
}

// Helper: Get timezone-accurate local date YYYY-MM-DD
function getLocalDateString() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// Helper: Update weekday name label next to date picker
function updateWeekdayLabel(wDateElement) {
  const lbl = document.getElementById("workout-weekday-lbl");
  if (!lbl || !wDateElement || !wDateElement.value) return;
  const dateVal = wDateElement.value;
  const parts = dateVal.split("-");
  if (parts.length !== 3) return;
  const localDate = new Date(parts[0], parts[1] - 1, parts[2]);
  const weekday = localDate.toLocaleDateString("en-US", { weekday: 'long' });
  lbl.textContent = `(${weekday})`;
}

// 5. Active Workout Logging Interface
let activeWorkoutKey = "push1";

// ==========================================
// WORKOUT DURATION TIMER LOGIC
// ==========================================
let workoutTimerInterval = null;

function hasWeightLogForDate(dateStr) {
  return appState.weightLogs.some(log => log.date === dateStr);
}

function checkMissingWeightBanner() {
  let dateStr = getLocalDateString();
  const wDate = document.getElementById("workout-date");
  if (wDate && wDate.value) {
    dateStr = wDate.value;
  }
  
  const banner = document.getElementById("missing-weight-banner");
  
  if (!hasWeightLogForDate(dateStr)) {
    if (banner) banner.style.display = "flex";
  } else {
    if (banner) banner.style.display = "none";
  }
}

function checkAndStartTimerUI() {
  checkMissingWeightBanner();
  
  const wDate = document.getElementById("workout-date");
  if (!wDate) return;
  const dateStr = wDate.value;
  const timerKey = `${dateStr}_${activeWorkoutKey}`;
  
  const timerData = appState.activeTimers[timerKey];
  const resetBtn = document.getElementById("reset-timer-btn");

  if (timerData) {
    if (resetBtn) resetBtn.style.display = "inline-block";
    
    if (timerData.isRunning) {
      startTimerInterval();
      updateTimerBtnState("running");
    } else {
      stopTimerInterval();
      updateTimerUI(); // Render the accrued time immediately
      updateTimerBtnState("paused");
    }
  } else {
    // No timer
    if (resetBtn) resetBtn.style.display = "none";
    stopTimerInterval();
    resetTimerUI();
    updateTimerBtnState("stopped");
  }
}

function updateTimerBtnState(state) {
  const btn = document.getElementById("start-timer-btn");
  const display = document.getElementById("workout-timer-display");
  if (!btn || !display) return;
  
  btn.classList.remove("btn-outline", "btn-warning-outline");
  display.classList.remove("active");

  if (state === "running") {
    btn.textContent = "Pause";
    btn.classList.add("btn-warning-outline");
    display.classList.add("active");
  } else if (state === "paused") {
    btn.textContent = "Resume";
    btn.classList.add("btn-outline");
  } else {
    // stopped
    btn.textContent = "Start";
    btn.classList.add("btn-outline");
  }
}

function startTimerInterval() {
  if (workoutTimerInterval) clearInterval(workoutTimerInterval);
  workoutTimerInterval = setInterval(updateTimerUI, 1000);
  updateTimerUI();
}

function stopTimerInterval() {
  if (workoutTimerInterval) {
    clearInterval(workoutTimerInterval);
    workoutTimerInterval = null;
  }
}

function resetTimerUI() {
  const display = document.getElementById("workout-timer-display");
  if (display) display.textContent = "00:00:00";
}

function updateTimerUI() {
  const wDate = document.getElementById("workout-date");
  if (!wDate) return;
  const dateStr = wDate.value;
  const timerKey = `${dateStr}_${activeWorkoutKey}`;
  
  const timerData = appState.activeTimers[timerKey];
  const display = document.getElementById("workout-timer-display");
  
  if (!timerData || !display) {
    stopTimerInterval();
    return;
  }
  
  let elapsedMs = timerData.accruedMs || 0;
  if (timerData.isRunning && timerData.startTime) {
    elapsedMs += (Date.now() - timerData.startTime);
  }
  
  let totalSeconds = Math.floor(elapsedMs / 1000);
  
  const hrs = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  
  display.textContent = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function toggleWorkoutTimer() {
  const wDate = document.getElementById("workout-date");
  if (!wDate) return;
  const dateStr = wDate.value;
  const timerKey = `${dateStr}_${activeWorkoutKey}`;
  
  const timerData = appState.activeTimers[timerKey];

  if (!timerData && !hasWeightLogForDate(dateStr)) {
    // Show gatekeeper modal
    const modal = document.getElementById("weight-gatekeeper-modal");
    if (modal) {
      modal.style.display = "flex";
      document.getElementById("modal-weight-input").focus();
    }
    return;
  }

  if (timerData) {
    if (timerData.isRunning) {
      // Pause it
      const elapsedMs = Date.now() - timerData.startTime;
      timerData.accruedMs += elapsedMs;
      timerData.isRunning = false;
      timerData.startTime = null;
    } else {
      // Resume it
      timerData.isRunning = true;
      timerData.startTime = Date.now();
    }
  } else {
    // Start fresh
    appState.activeTimers[timerKey] = {
      startTime: Date.now(),
      accruedMs: 0,
      isRunning: true
    };
  }
  appState.saveActiveTimers();
  checkAndStartTimerUI();
}

function resetWorkoutTimer() {
  const wDate = document.getElementById("workout-date");
  if (!wDate) return;
  const dateStr = wDate.value;
  const timerKey = `${dateStr}_${activeWorkoutKey}`;
  
  if (appState.activeTimers[timerKey]) {
    if (confirm("Are you sure you want to completely reset this timer to zero?")) {
      delete appState.activeTimers[timerKey];
      appState.saveActiveTimers();
      checkAndStartTimerUI();
    }
  }
}

function initWorkoutSelector() {
  const selector = document.getElementById("workout-select");
  if (!selector) return;

  // Clear and rebuild options
  selector.innerHTML = "";
  if (appState.customProgram) {
    Object.keys(appState.customProgram).forEach(key => {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = appState.customProgram[key].name;
      selector.appendChild(opt);
    });
  }

  selector.value = activeWorkoutKey;
  selector.addEventListener("change", (e) => {
    activeWorkoutKey = e.target.value;
    renderActiveWorkout();
    checkAndStartTimerUI();
  });

  // Load current date with timezone-accurate local date and update weekday label
  const wDate = document.getElementById("workout-date");
  if (wDate) {
    wDate.value = getLocalDateString();
    updateWeekdayLabel(wDate);
    wDate.addEventListener("change", () => {
      updateWeekdayLabel(wDate);
      renderActiveWorkout(); // re-render to load correct date history indicators
      checkAndStartTimerUI();
    });
  }

  renderActiveWorkout();
  checkAndStartTimerUI();
  
  // Setup Timer Buttons
  const timerBtn = document.getElementById("start-timer-btn");
  if (timerBtn) {
    timerBtn.addEventListener("click", toggleWorkoutTimer);
  }
  const resetBtn = document.getElementById("reset-timer-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetWorkoutTimer);
  }

  // Setup Missing Weight Handlers
  const modalSkipBtn = document.getElementById("modal-weight-skip");
  const modalSubmitBtn = document.getElementById("modal-weight-submit");
  const bannerSubmitBtn = document.getElementById("banner-weight-submit");

  if (modalSkipBtn) {
    modalSkipBtn.addEventListener("click", () => {
      document.getElementById("weight-gatekeeper-modal").style.display = "none";
      // Force start timer bypassing the check
      const wDate = document.getElementById("workout-date");
      if (!wDate) return;
      const dateStr = wDate.value;
      const timerKey = `${dateStr}_${activeWorkoutKey}`;
      appState.activeTimers[timerKey] = {
        startTime: Date.now(),
        accruedMs: 0,
        isRunning: true
      };
      appState.saveActiveTimers();
      checkAndStartTimerUI();
    });
  }

  if (modalSubmitBtn) {
    modalSubmitBtn.addEventListener("click", () => {
      const wVal = document.getElementById("modal-weight-input").value;
      if (!wVal) return;
      const wDate = document.getElementById("workout-date");
      if (!wDate) return;
      const dateStr = wDate.value;
      
      appState.addWeightLog(parseFloat(wVal), dateStr);
      document.getElementById("weight-gatekeeper-modal").style.display = "none";
      updateDashboardData();
      
      // Start timer
      const timerKey = `${dateStr}_${activeWorkoutKey}`;
      appState.activeTimers[timerKey] = {
        startTime: Date.now(),
        accruedMs: 0,
        isRunning: true
      };
      appState.saveActiveTimers();
      checkAndStartTimerUI();
    });
  }

  if (bannerSubmitBtn) {
    bannerSubmitBtn.addEventListener("click", () => {
      const wVal = document.getElementById("banner-weight-input").value;
      if (!wVal) return;
      const wDate = document.getElementById("workout-date");
      if (!wDate) return;
      appState.addWeightLog(parseFloat(wVal), wDate.value);
      updateDashboardData();
      checkMissingWeightBanner();
    });
  }

  // Setup Save Event
  const saveBtn = document.getElementById("save-workout-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      submitLoggedWorkout();
    });
  }
}

// Helper: Generate category badge HTML for an exercise
function getCategoryBadgeHtml(exercise, cssClass) {
  const cat = exercise.category || 'hypertrophy';
  const emojiMap = { 'strength': '🔴', 'power-hypertrophy': '🔵', 'hypertrophy': '🟡', 'endurance': '🟢' };
  const labelMap = { 'strength': 'STRENGTH', 'power-hypertrophy': 'PWR-HYPER', 'hypertrophy': 'HYPERTROPHY', 'endurance': 'ENDURANCE' };
  const emoji = emojiMap[cat] || '🟡';
  const label = labelMap[cat] || cat.toUpperCase();
  const tagClass = cssClass || 'exercise-category-tag';
  return `<span class="${tagClass} ${cat}"><span class="category-emoji">${emoji}</span> ${label}</span>`;
}

// Helper: Generate rest period badge HTML
function getRestBadgeHtml(exercise) {
  const secs = exercise.restSeconds || 90;
  let display = '';
  if (secs >= 60) {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    display = rem > 0 ? `${mins}m ${rem}s` : `${mins} min`;
  } else {
    display = `${secs}s`;
  }
  return `<span class="rest-period-badge">⏱️ Rest: <span class="rest-val">${display}</span></span>`;
}

function getTargetRepsForSet(exName, setIndex, dateStr) {
  const trackerState = appState.currentWeights[exName] || { minReps: 10, maxReps: 15, weight: 10 };
  
  // Find the last logged workout of this key that contains this exercise and is before dateStr
  const prevLog = [...appState.history]
    .filter(log => log.workoutKey === activeWorkoutKey && log.date < dateStr && log.exercises.some(e => e.name === exName))
    .sort((a, b) => a.date.localeCompare(b.date))
    .pop();

  let lastEx = null;
  let didProgressLastTime = false;
  if (prevLog) {
    lastEx = prevLog.exercises.find(e => e.name === exName);
    if (lastEx && lastEx.sets) {
      const completedSets = lastEx.sets.filter(s => s.reps !== null && s.reps !== undefined && s.reps !== "");
      if (completedSets.length > 0) {
        didProgressLastTime = completedSets.every(s => s.reps >= trackerState.maxReps);
      }
    }
  }

  let targetReps = trackerState.minReps;
  let lastRepsText = "-";

  if (lastEx && lastEx.sets && lastEx.sets[setIndex]) {
    const histSet = lastEx.sets[setIndex];
    if (histSet.reps !== null && histSet.reps !== undefined && histSet.reps !== "") {
      const lastReps = parseInt(histSet.reps);
      lastRepsText = `${lastReps} reps`;

      if (didProgressLastTime) {
        targetReps = trackerState.minReps; // Reset to baseline on progression
      } else {
        if (lastReps < trackerState.maxReps) {
          targetReps = Math.max(trackerState.minReps, lastReps + 1); // Aim for 1 more rep than last time
        } else {
          targetReps = trackerState.maxReps;
        }
      }
    }
  }

  return { targetReps, lastRepsText };
}

function renderActiveWorkout() {
  const container = document.getElementById("workout-exercises-container");
  if (!container) return;

  // Update the status badge next to selector
  updateWorkoutStatusBadge();
 
  container.innerHTML = "";
  if (!appState.customProgram || !appState.customProgram[activeWorkoutKey]) return;
  const program = appState.customProgram[activeWorkoutKey];
  
  const wDate = document.getElementById("workout-date");
  const dateStr = wDate ? wDate.value : getLocalDateString();

  program.exercises.forEach((ex, exIdx) => {
    const trackerState = appState.currentWeights[ex.name] || { weight: ex.defaultWeight, minReps: ex.minReps, maxReps: ex.maxReps, sets: ex.sets };
    const curWeight = trackerState.weight;

    // Check if this exercise was already saved for the currently selected date
    const isSaved = appState.isExerciseLogged(activeWorkoutKey, dateStr, ex.name);

    const card = document.createElement("div");
    const isStrength = ex.category === 'strength';
    card.className = `exercise-log-card glass-panel${isStrength ? ' strength-card' : ''}${isSaved ? ' saved-card' : ''}`;
    card.setAttribute("data-ex-name", ex.name);

    // Generate category and rest badges
    const categoryBadge = getCategoryBadgeHtml(ex);
    const restBadge = getRestBadgeHtml(ex);

    // Format historical logs if they exist
    let lastLogHtml = `<span class="text-muted">No history logged yet.</span>`;
    let lastEx = null;
    
    const prevLog = [...appState.history]
      .filter(log => log.workoutKey === activeWorkoutKey && log.date < dateStr && log.exercises.some(e => e.name === ex.name))
      .sort((a, b) => a.date.localeCompare(b.date))
      .pop();

    if (prevLog) {
      lastEx = prevLog.exercises.find(e => e.name === ex.name);
      if (lastEx && lastEx.sets && lastEx.sets.length > 0) {
        const setStrings = lastEx.sets
          .filter(s => s.reps !== null && s.reps !== undefined && s.reps !== "")
          .map((s, idx) => `S${idx + 1}: ${s.weight}kg×${s.reps}`)
          .join(" | ");

        if (setStrings) {
          const d = new Date(prevLog.date);
          const dateStrLabel = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
          lastLogHtml = `<span class="glow-txt">${dateStrLabel}</span> ➔ ${setStrings}`;
        }
      }
    }

    // Determine what sets to draw: use historical log if already saved today
    let savedSets = null;
    if (isSaved) {
      const dailyLog = appState.history.find(log => log.date === dateStr && log.workoutKey === activeWorkoutKey);
      if (dailyLog) {
        const loggedEx = dailyLog.exercises.find(e => e.name === ex.name);
        if (loggedEx) {
          savedSets = loggedEx.sets;
        }
      }
    }

    let setsHtml = "";
    const numSets = savedSets ? savedSets.length : trackerState.sets; // use saved length or target sets
    for (let s = 1; s <= numSets; s++) {
      const { targetReps, lastRepsText } = getTargetRepsForSet(ex.name, s - 1, dateStr);
      
      let weightVal = curWeight;
      let repsVal = targetReps;
      if (savedSets && savedSets[s - 1]) {
        weightVal = savedSets[s - 1].weight;
        repsVal = savedSets[s - 1].reps !== null ? savedSets[s - 1].reps : "";
      }

      setsHtml += `
        <div class="set-row" data-set-num="${s}">
          <span class="set-num">Set ${s}</span>
          <div class="set-inputs">
            <div class="input-wrapper">
              <input type="number" step="0.5" class="set-weight-input" value="${weightVal}" placeholder="kg" ${isSaved ? 'disabled' : ''}>
              <span class="input-unit">kg</span>
            </div>
            <div class="input-wrapper">
              <input type="number" class="set-reps-input" value="${repsVal}" placeholder="${targetReps}" title="Target: ${targetReps} reps" ${isSaved ? 'disabled' : ''}>
              <span class="input-unit">reps</span>
            </div>
          </div>
          <div class="target-badge">Target: <strong class="glow-txt" style="color: var(--accent-primary);">${targetReps}</strong> reps <span style="font-size:10px; color: var(--text-muted);">(Last: ${lastRepsText})</span></div>
          ${isSaved ? '' : `<button class="delete-set-btn" title="Delete Set" onclick="removeSetRow(this)">&times;</button>`}
        </div>
      `;
    }

    const savedBadgeHtml = isSaved ? `<span class="saved-badge">Saved ✓</span>` : '';

    card.innerHTML = `
      <div class="exercise-card-header">
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <h4 class="exercise-name" style="margin: 0;">${ex.name}</h4>
          ${savedBadgeHtml}
        </div>
        <div class="exercise-card-tags">
          ${categoryBadge}
          <span class="exercise-type-tag ${trackerState.type}">${trackerState.type.toUpperCase()}</span>
          ${restBadge}
        </div>
      </div>
      <div class="exercise-target-summary">
        <div class="target-summary-row target-info">
          <span class="summary-lbl">🎯 Next Target</span>
          <span class="summary-val"><strong>${curWeight} kg</strong> for <strong>${trackerState.minReps}-${trackerState.maxReps}</strong> reps</span>
        </div>
        <div class="target-summary-row history-info">
          <span class="summary-lbl">⏮️ Last Session</span>
          <span class="summary-val">${lastLogHtml}</span>
        </div>
      </div>
      <div class="sets-list-container">
        ${setsHtml}
      </div>
      <div class="exercise-card-actions" style="display: flex; gap: 12px; margin-top: 15px; justify-content: space-between;">
        ${isSaved ? `
          <button class="btn btn-secondary edit-lift-btn" onclick="unlockSingleLift(this)" style="max-width: 130px; font-size: 13px; padding: 8px 16px;">
            <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="margin-right: 4px; display: inline-block; vertical-align: middle;"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            Edit Log
          </button>
        ` : `
          <button class="add-set-row-btn" onclick="addSetRow(this)">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
            Add Set
          </button>
          <button class="btn save-lift-btn" onclick="saveSingleLift(this)" style="max-width: 150px; font-size: 13px; padding: 8px 16px; background-color: var(--accent-primary); color: var(--bg-color);">
            <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="margin-right: 4px; display: inline-block; vertical-align: middle;"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
            Save Exercise
          </button>
        `}
      </div>
    `;

    container.appendChild(card);
  });
}

function updateWorkoutStatusBadge() {
  const badge = document.getElementById("workout-status-badge");
  if (!badge) return;

  const wDate = document.getElementById("workout-date");
  const dateStr = wDate ? wDate.value : getLocalDateString();
  const program = (appState.customProgram && appState.customProgram[activeWorkoutKey]) ? appState.customProgram[activeWorkoutKey] : null;
  if (!program) {
    badge.style.display = "none";
    return;
  }

  let savedCount = 0;
  program.exercises.forEach(ex => {
    if (appState.isExerciseLogged(activeWorkoutKey, dateStr, ex.name)) {
      savedCount++;
    }
  });

  const discardBtn = document.getElementById("discard-session-btn");

  if (savedCount === 0) {
    badge.style.display = "none";
    if (discardBtn) discardBtn.style.display = "none";
  } else if (savedCount === program.exercises.length) {
    badge.style.display = "inline-flex";
    badge.style.background = "rgba(46, 204, 113, 0.15)";
    badge.style.color = "#2ecc71";
    badge.style.border = "1px solid rgba(46, 204, 113, 0.3)";
    badge.style.alignItems = "center";
    badge.style.justifyContent = "center";
    badge.textContent = "COMPLETED ✓";
    if (discardBtn) discardBtn.style.display = "inline-flex";
  } else {
    badge.style.display = "inline-flex";
    badge.style.background = "rgba(241, 196, 15, 0.15)";
    badge.style.color = "#f1c40f";
    badge.style.border = "1px solid rgba(241, 196, 15, 0.3)";
    badge.style.alignItems = "center";
    badge.style.justifyContent = "center";
    badge.textContent = "IN PROGRESS";
    if (discardBtn) discardBtn.style.display = "inline-flex";
  }
}

function setupDiscardSessionHandler() {
  const discardBtn = document.getElementById("discard-session-btn");
  if (!discardBtn) return;

  discardBtn.addEventListener("click", () => {
    const wDate = document.getElementById("workout-date");
    const dateStr = wDate ? wDate.value : getLocalDateString();
    
    const program = appState.customProgram ? appState.customProgram[activeWorkoutKey] : null;
    const sessionName = program ? program.name : "this session";
    
    if (confirm(`Are you sure you want to discard all logged exercises for ${sessionName} on ${dateStr}? This will completely delete this workout session from your logs and history.`)) {
      const record = appState.history.find(log => log.date === dateStr && log.workoutKey === activeWorkoutKey);
      if (record) {
        if (appState.firebaseInitialized && firestoreService && firestoreService.isReady()) {
          firestoreService.deleteWorkoutSession(record.id).catch(err => console.error('[Sync] Discard session error:', err));
        }
        appState.history = appState.history.filter(log => log.id !== record.id);
        appState.saveHistory();
      }
      
      renderActiveWorkout();
      renderHistoryTable();
      buildCharts();
      renderPlanList();
      
      alert("Workout session discarded successfully.");
    }
  });
}

function submitLoggedWorkout() {
  const saveBtn = document.getElementById("save-workout-btn");
  if (saveBtn) {
    if (saveBtn.disabled) return;
    saveBtn.disabled = true;
  }

  const container = document.getElementById("workout-exercises-container");
  const wDate = document.getElementById("workout-date");
  if (!container || !wDate) {
    if (saveBtn) saveBtn.disabled = false;
    return;
  }
 
  const dateStr = wDate.value;
  if (!dateStr) {
    alert("Please select a valid date for this workout.");
    if (saveBtn) saveBtn.disabled = false;
    return;
  }

  const cards = container.querySelectorAll(".exercise-log-card");
  const report = [];
  let savedCount = 0;
  let unsavedWithDataCount = 0;

  const allCoachAlerts = [];

  cards.forEach(card => {
    const exName = card.getAttribute("data-ex-name");
    const isAlreadySaved = card.classList.contains("saved-card");

    if (isAlreadySaved) {
      savedCount++;
      return;
    }

    const setRows = card.querySelectorAll(".set-row");
    const sets = [];
    let hasReps = false;

    setRows.forEach(row => {
      const weightVal = parseFloat(row.querySelector(".set-weight-input").value);
      const repsVal = parseInt(row.querySelector(".set-reps-input").value);

      if (!isNaN(repsVal)) {
        hasReps = true;
      }

      sets.push({
        weight: isNaN(weightVal) ? 0 : weightVal,
        reps: isNaN(repsVal) ? null : repsVal
      });
    });

    if (hasReps) {
      unsavedWithDataCount++;
      
      // Capture original weight before state update
      const originalTarget = appState.currentWeights[exName];
      const originalWeight = originalTarget ? originalTarget.weight : null;

      const reportItem = appState.logSingleExercise(activeWorkoutKey, dateStr, exName, sets);
      if (reportItem) {
        report.push(reportItem);
      }
      // Run Smart Coach analysis on the logged exercise (passing original weight for deviation checking)
      const analysis = coachEngine.analyzeExercise(exName, sets, activeWorkoutKey, originalWeight);
      if (analysis.alerts.length > 0) {
        allCoachAlerts.push(...analysis.alerts);
      }
    }
  });

  if (unsavedWithDataCount === 0) {
    if (saveBtn) saveBtn.disabled = false;
    
    // Even if all exercises are individually saved, we STILL need to finalize the timer!
    if (savedCount === cards.length) {
      alert("All exercises for this session are already saved!");
      
      // Finalize the timer if it's running
      appState.finalizeWorkoutSession(activeWorkoutKey, dateStr);
      checkAndStartTimerUI();
      
      // Refresh to reflect duration in history
      renderHistoryTable();
    } else {
      alert("You must log reps for at least one set to save the workout!");
    }
    return;
  }

  // Show overload report modal or alert (now with Smart Coach insights)
  if (report.length > 0 || allCoachAlerts.length > 0) {
    showOverloadModal(report, allCoachAlerts);
  } else {
    alert("Workout logs saved successfully!");
  }

  // Finalize the timer if it's running
  appState.finalizeWorkoutSession(activeWorkoutKey, dateStr);
  checkAndStartTimerUI(); // UI will reset the timer string to 00:00:00 and swap btn to Start


  // Refresh other tabs & lists
  renderPlanList();
  renderHistoryTable();
  buildCharts();
  renderActiveWorkout();
}

function saveSingleLift(btn) {
  if (btn.disabled) return;
  btn.disabled = true;

  const card = btn.closest(".exercise-log-card");
  const exName = card.getAttribute("data-ex-name");
  
  const wDate = document.getElementById("workout-date");
  if (!wDate) {
    btn.disabled = false;
    return;
  }
  const dateStr = wDate.value;
  if (!dateStr) {
    alert("Please select a valid date for this workout.");
    btn.disabled = false;
    return;
  }

  // Double submit check via state
  if (appState.isExerciseLogged(activeWorkoutKey, dateStr, exName)) {
    alert(`This exercise ("${exName}") has already been saved for this date!`);
    btn.disabled = false;
    return;
  }

  const setRows = card.querySelectorAll(".set-row");
  const sets = [];
  let anyReps = false;

  setRows.forEach(row => {
    const weightVal = parseFloat(row.querySelector(".set-weight-input").value);
    const repsVal = parseInt(row.querySelector(".set-reps-input").value);

    if (!isNaN(repsVal)) {
      anyReps = true;
    }

    sets.push({
      weight: isNaN(weightVal) ? 0 : weightVal,
      reps: isNaN(repsVal) ? null : repsVal
    });
  });

  if (!anyReps) {
    alert("You must log reps for at least one set to save this exercise!");
    btn.disabled = false;
    return;
  }

  // Capture original weight before state update
  const originalTarget = appState.currentWeights[exName];
  const originalWeight = originalTarget ? originalTarget.weight : null;

  // Save via StateManager
  const reportItem = appState.logSingleExercise(activeWorkoutKey, dateStr, exName, sets);

  // Run Smart Coach analysis on the saved exercise (passing original weight for deviation checking)
  const analysis = coachEngine.analyzeExercise(exName, sets, activeWorkoutKey, originalWeight);
  const coachAlerts = analysis.alerts || [];

  // Show overload suggestion in modal (now with Smart Coach insights)
  if (reportItem || coachAlerts.length > 0) {
    showOverloadModal(reportItem ? [reportItem] : [], coachAlerts);
  } else {
    alert(`${exName} saved successfully!`);
  }

  // Refresh tabs and display to show saved state
  renderPlanList();
  renderHistoryTable();
  buildCharts();
  renderActiveWorkout();
}

function unlockSingleLift(btn) {
  const card = btn.closest(".exercise-log-card");
  const exName = card.getAttribute("data-ex-name");
  
  const wDate = document.getElementById("workout-date");
  if (!wDate) return;
  const dateStr = wDate.value;

  if (confirm(`Are you sure you want to edit your logs for "${exName}"? This will allow you to change the logged sets and save them again.`)) {
    appState.removeExerciseFromHistory(activeWorkoutKey, dateStr, exName);
    
    // Refresh lists and display to show editable state
    renderPlanList();
    renderHistoryTable();
    buildCharts();
    renderActiveWorkout();
  }
}

function showOverloadModal(report, coachAlerts) {
  const modal = document.getElementById("overload-report-modal");
  const reportList = document.getElementById("overload-report-list");
  if (!modal || !reportList) return;

  reportList.innerHTML = "";
  
  if (report.length === 0) {
    reportList.innerHTML = `<li class="no-updates">No progressive overload updates generated. Make sure to log reps for all sets!</li>`;
  } else {
    report.forEach(item => {
      const li = document.createElement("li");
      li.className = `report-item ${item.status}`;
      
      let badge = "";
      if (item.status === "increase") badge = `<span class="badge inc">INCREASE WEIGHT (+${(item.newWeight - item.oldWeight).toFixed(1)}kg)</span>`;
      else if (item.status === "deload") badge = `<span class="badge del">DELOAD (-10%)</span>`;
      else badge = `<span class="badge maintain">MAINTAIN WEIGHT</span>`;

      li.innerHTML = `
        <div class="report-item-header">
          <strong>${item.name}</strong>
          ${badge}
        </div>
        <div class="report-item-desc">${item.reason}</div>
        <div class="weight-transition">Weight: <span>${item.oldWeight} kg</span> → <strong class="glow-txt">${item.newWeight} kg</strong></div>
      `;
      reportList.appendChild(li);
    });
  }

  // Render Smart Coach Training Insights section
  const insightsSection = document.getElementById("training-insights-section");
  const insightsList = document.getElementById("training-insights-list");

  if (insightsSection && insightsList) {
    insightsList.innerHTML = "";

    const alerts = coachAlerts || [];
    if (alerts.length > 0) {
      insightsSection.style.display = "block";
      alerts.forEach(alert => {
        const alertCard = document.createElement("div");
        alertCard.className = `coach-alert-card severity-${alert.severity}`;

        const severityIcons = { critical: '🔴', warning: '🟡', info: '🟢' };
        const severityLabels = { critical: 'CRITICAL', warning: 'WARNING', info: 'INFO' };

        alertCard.innerHTML = `
          <div class="coach-alert-header">
            <span class="coach-alert-severity-badge severity-${alert.severity}">
              ${severityIcons[alert.severity]} ${severityLabels[alert.severity]}
            </span>
            <span class="coach-alert-exercise">${alert.exercise}</span>
          </div>
          <div class="coach-alert-title">${alert.title}</div>
          <div class="coach-alert-message">${alert.message}</div>
          <div class="coach-alert-recommendation">
            <strong>💡 Recommendation:</strong> ${alert.recommendation}
          </div>
        `;
        insightsList.appendChild(alertCard);
      });
    } else {
      insightsSection.style.display = "none";
    }
  }

  modal.classList.add("show");

  const closeBtn = document.getElementById("modal-close-btn");
  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.classList.remove("show");
    };
  }
}

function openAddExerciseModal(dayKey) {
  const modal = document.getElementById("add-exercise-modal");
  const daySelect = document.getElementById("add-ex-day");
  if (!modal || !daySelect) return;

  // Pre-select the training day
  daySelect.value = dayKey;
  modal.classList.add("show");
}

function closeAddExerciseModal() {
  const modal = document.getElementById("add-exercise-modal");
  const form = document.getElementById("add-exercise-form");
  if (modal) {
    modal.classList.remove("show");
  }
  if (form) {
    form.reset();
  }
}

function setupAddExerciseModal() {
  const form = document.getElementById("add-exercise-form");
  const closeBtn = document.getElementById("add-exercise-close-btn");
  const cancelBtn = document.getElementById("add-ex-cancel-btn");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeAddExerciseModal);
  }
  if (cancelBtn) {
    cancelBtn.addEventListener("click", closeAddExerciseModal);
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("add-ex-name").value;
      const dayKey = document.getElementById("add-ex-day").value;
      const type = document.getElementById("add-ex-type").value;
      const sets = parseInt(document.getElementById("add-ex-sets").value, 10);
      const weight = parseFloat(document.getElementById("add-ex-weight").value);
      const minReps = parseInt(document.getElementById("add-ex-minreps").value, 10);
      const maxReps = parseInt(document.getElementById("add-ex-maxreps").value, 10);
      const restSeconds = parseInt(document.getElementById("add-ex-rest").value, 10);
      const failureOnly = document.getElementById("add-ex-failure").checked;

      // Validation
      if (!name.trim()) {
        alert("Please enter a valid exercise name.");
        return;
      }
      if (isNaN(sets) || sets < 1) {
        alert("Please enter a valid sets count (minimum 1).");
        return;
      }
      if (isNaN(weight) || weight < 0) {
        alert("Please enter a valid starting weight (minimum 0).");
        return;
      }
      if (isNaN(minReps) || minReps < 1) {
        alert("Please enter a valid minimum reps value.");
        return;
      }
      if (isNaN(maxReps) || maxReps < minReps) {
        alert("Please enter a valid maximum reps value (greater than or equal to min reps).");
        return;
      }
      if (isNaN(restSeconds) || restSeconds < 10) {
        alert("Please enter a valid rest duration (minimum 10 seconds).");
        return;
      }

      // Add exercise to StateManager
      const success = appState.addCustomExercise(
        dayKey,
        name,
        sets,
        minReps,
        maxReps,
        weight,
        type,
        failureOnly,
        restSeconds
      );

      if (success) {
        closeAddExerciseModal();
        renderPlanList(); // Re-render plan view
        renderActiveWorkout(); // Re-render active workout view (in case it is the current day)
        alert(`Successfully added "${name}" to your routine!`);
      }
    });
  }
}

// 6. Plan & Current Weights Overview Renderer
function renderPlanList() {
  const container = document.getElementById("plan-overview-container");
  if (!container) return;

  container.innerHTML = "";

  if (!appState.customProgram) return;

  Object.keys(appState.customProgram).forEach(key => {
    const day = appState.customProgram[key];
    const section = document.createElement("div");
    section.className = "plan-day-section glass-panel";

    let exRows = "";
    day.exercises.forEach(ex => {
      const liveData = appState.currentWeights[ex.name] || { weight: ex.defaultWeight, minReps: ex.minReps, maxReps: ex.maxReps, sets: ex.sets };
      const catTag = getCategoryBadgeHtml(ex, 'plan-category-tag');
      const restSecs = ex.restSeconds || 90;
      let restDisplay = '';
      if (restSecs >= 60) {
        const mins = Math.floor(restSecs / 60);
        const rem = restSecs % 60;
        restDisplay = rem > 0 ? `${mins}m ${rem}s` : `${mins} min`;
      } else {
        restDisplay = `${restSecs}s`;
      }
      exRows += `
        <tr class="plan-ex-row">
          <td data-label="Exercise"><strong>${ex.name}</strong></td>
          <td data-label="Category">${catTag}</td>
          <td data-label="Sets">${liveData.sets} sets</td>
          <td data-label="Rep Range">${liveData.minReps}-${liveData.maxReps} reps</td>
          <td data-label="Rest">${restDisplay}</td>
          <td data-label="Target Weight">
            <div class="plan-weight-edit-wrapper">
              <input type="number" step="0.5" class="plan-weight-edit-input" data-ex-name="${ex.name}" value="${liveData.weight}">
              <span class="unit">kg</span>
            </div>
          </td>
          <td data-label="Action" style="text-align: center;">
            <button class="delete-ex-btn" data-day-key="${key}" data-ex-name="${ex.name}" title="Remove Exercise">&times;</button>
          </td>
        </tr>
      `;
    });

    section.innerHTML = `
      <div class="plan-day-header" style="display: flex; justify-content: space-between; align-items: center; gap: 15px;">
        <h3>${day.name}</h3>
        <button class="btn btn-secondary open-add-ex-modal-btn" data-day-key="${key}" style="font-size: 11px; padding: 4px 8px; max-width: 110px; margin: 0;">
          + Add Exercise
        </button>
      </div>
      <table class="plan-day-table">
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Category</th>
            <th>Sets</th>
            <th>Rep Range</th>
            <th>Rest</th>
            <th>Target Weight</th>
            <th style="width: 80px; text-align: center;">Action</th>
          </tr>
        </thead>
        <tbody>
          ${exRows}
        </tbody>
      </table>
    `;

    container.appendChild(section);
  });

  // Setup plan weights custom inputs listener
  const planInputs = container.querySelectorAll(".plan-weight-edit-input");
  planInputs.forEach(input => {
    input.addEventListener("change", (e) => {
      const name = e.target.getAttribute("data-ex-name");
      const newVal = parseFloat(e.target.value);
      if (!isNaN(newVal) && appState.currentWeights[name]) {
        appState.currentWeights[name].weight = newVal;
        appState.saveWeights();
        renderActiveWorkout(); // sync active tracker
        
        // Show validation highlight
        e.target.style.borderColor = "#66FCF1";
        setTimeout(() => e.target.style.borderColor = "", 1000);
      }
    });
  });

  // Setup open modal buttons listener
  const openModalBtns = container.querySelectorAll(".open-add-ex-modal-btn");
  openModalBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const dayKey = e.currentTarget.getAttribute("data-day-key");
      openAddExerciseModal(dayKey);
    });
  });

  // Setup delete exercise buttons listener
  const deleteBtns = container.querySelectorAll(".delete-ex-btn");
  deleteBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const dayKey = e.target.getAttribute("data-day-key");
      const exName = e.target.getAttribute("data-ex-name");
      if (confirm(`Are you sure you want to remove "${exName}" from the ${appState.customProgram[dayKey].name} routine? This will not delete your workout history logs for this exercise, but will remove it from future sessions.`)) {
        const success = appState.removeExerciseFromPlan(dayKey, exName);
        if (success) {
          renderPlanList();
          renderActiveWorkout();
        }
      }
    });
  });
}

// 7. Render Workout Log History List
function renderHistoryTable() {
  const container = document.getElementById("history-records-container");
  if (!container) return;

  container.innerHTML = "";
  const logs = [...appState.history].reverse(); // newest first

  if (logs.length === 0) {
    container.innerHTML = `<div class="empty-state">No workouts logged yet. Complete a training session to see your history logs!</div>`;
    return;
  }

  logs.forEach(log => {
    const card = document.createElement("div");
    card.className = "history-card glass-panel";

    let exercisesHtml = "";
    log.exercises.forEach(ex => {
      const setRepStrings = ex.sets.map((s, idx) => {
        if (s.reps === null) return `Set ${idx+1}: -`;
        return `S${idx+1}: ${s.weight}kg x ${s.reps}`;
      }).join(", ");

      exercisesHtml += `
        <div class="history-ex-row">
          <div class="ex-name-lbl">${ex.name}</div>
          <div class="ex-sets-lbl">${setRepStrings}</div>
        </div>
      `;
    });

    // Formatting date
    const d = new Date(log.date);
    const dateFormatted = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

    let durationHtml = "";
    if (log.durationSeconds) {
      const hrs = Math.floor(log.durationSeconds / 3600);
      const mins = Math.floor((log.durationSeconds % 3600) / 60);
      const secs = log.durationSeconds % 60;
      let timeStr = "";
      if (hrs > 0) timeStr += `${hrs}h `;
      if (mins > 0 || hrs > 0) timeStr += `${mins}m `;
      timeStr += `${secs}s`;
      durationHtml = `<span class="history-card-duration" style="font-size: 12px; color: var(--accent-secondary); margin-left: 10px;">⏱ ${timeStr}</span>`;
    }

    card.innerHTML = `
      <div class="history-card-header">
        <span class="history-card-date">${dateFormatted}</span>
        <h4 class="history-card-title glow-txt">${log.workoutName}${durationHtml}</h4>
        <button class="delete-history-btn" data-id="${log.id}">×</button>
      </div>
      <div class="history-card-details">
        ${exercisesHtml}
      </div>
    `;

    container.appendChild(card);
  });

  // Hook delete handler
  container.querySelectorAll(".delete-history-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this workout entry? This will not revert your progressive overload values but will remove this log from history.")) {
        // Sync deletion to Firestore
        if (appState.firebaseInitialized && firestoreService && firestoreService.isReady()) {
          firestoreService.deleteWorkoutSession(id).catch(err => console.error('[Sync] History delete error:', err));
        }
        appState.history = appState.history.filter(log => log.id !== id);
        appState.saveHistory();
        renderHistoryTable();
        buildCharts();
      }
    });
  });
}

// 8. Visualizing progress via Chart.js
let weightChartInstance = null;
let volumeChartInstance = null;

function buildCharts() {
  const wCanvas = document.getElementById("weight-loss-chart");
  const vCanvas = document.getElementById("volume-index-chart");

  if (!wCanvas || !vCanvas) return;

  // Chart 1: Weight Loss Progress
  const wLogs = appState.weightLogs;
  const wDates = wLogs.map(l => {
    const d = new Date(l.date);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });
  const wWeights = wLogs.map(l => l.weight);

  if (weightChartInstance) {
    weightChartInstance.destroy();
  }

  // Custom Chart.js Styles for Dark Mode
  Chart.defaults.color = "#C5C6C7";
  Chart.defaults.font.family = "'Inter', sans-serif";

  weightChartInstance = new Chart(wCanvas, {
    type: "line",
    data: {
      labels: wDates,
      datasets: [{
        label: "Weight (kg)",
        data: wWeights,
        borderColor: "#66FCF1",
        backgroundColor: "rgba(102, 252, 241, 0.1)",
        fill: true,
        tension: 0.3,
        borderWidth: 2,
        pointBackgroundColor: "#66FCF1"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#1F2833",
          borderColor: "#66FCF1",
          borderWidth: 1,
          titleColor: "#FFFFFF",
          bodyColor: "#C5C6C7"
        }
      },
      scales: {
        y: {
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          title: { display: true, text: "Kilograms (kg)" }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });

  // Chart 2: Progressive Overload Volume Index (Total workout weight * reps logged)
  // We'll show progress for the last 8 completed workouts
  const lastWorkouts = appState.history.slice(-8);
  const vLabels = lastWorkouts.map(w => {
    const d = new Date(w.date);
    const dateStr = d.toLocaleDateString("en-US", { month: "numeric", day: "numeric" });
    const nameWords = w.workoutName.split(" ");
    const shortName = nameWords[0] + " " + (nameWords[2] || nameWords[1] || "");
    return `${dateStr} (${shortName})`;
  });

  const vData = lastWorkouts.map(w => {
    let workoutVol = 0;
    w.exercises.forEach(ex => {
      ex.sets.forEach(set => {
        if (set.reps && set.weight) {
          workoutVol += (set.reps * set.weight);
        }
      });
    });
    return workoutVol;
  });

  if (volumeChartInstance) {
    volumeChartInstance.destroy();
  }

  volumeChartInstance = new Chart(vCanvas, {
    type: "bar",
    data: {
      labels: vLabels.length ? vLabels : ["No Logs Yet"],
      datasets: [{
        label: "Volume Index (Weight × Reps)",
        data: vData.length ? vData : [0],
        backgroundColor: "rgba(69, 162, 158, 0.6)",
        borderColor: "#45A29E",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(102, 252, 241, 0.8)",
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#1F2833",
          borderColor: "#45A29E",
          borderWidth: 1
        }
      },
      scales: {
        y: {
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          title: { display: true, text: "Total Weight-Rep Volume" }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });
}

// Backup & Restore utilities
function exportData() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
    profile: appState.profile,
    currentWeights: appState.currentWeights,
    history: appState.history,
    weightLogs: appState.weightLogs
  }));
  const dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", `v-track-workout-backup-${new Date().toISOString().split("T")[0]}.json`);
  dlAnchorElem.click();
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (data.profile && data.currentWeights && data.history && data.weightLogs) {
        // Clear input value so the same file can be selected again
        event.target.value = '';

        // Save to localStorage
        localStorage.setItem(appState.keyPrefix + "profile", JSON.stringify(data.profile));
        localStorage.setItem(appState.keyPrefix + "current_weights", JSON.stringify(data.currentWeights));
        localStorage.setItem(appState.keyPrefix + "history", JSON.stringify(data.history));
        localStorage.setItem(appState.keyPrefix + "weight_logs", JSON.stringify(data.weightLogs));
        
        // Sync to Firestore if logged in
        if (appState.firebaseInitialized && firestoreService && firestoreService.isReady()) {
          console.log('[Import] Syncing imported backup to Firestore...');
          const success = await firestoreService.migrateFromLocalStorage(data);
          if (!success) {
            alert("Local storage updated, but failed to sync backup data to Firestore.");
            return;
          }
        }
        
        alert("Import successful! Reloading tracker state.");
        location.reload();
      } else {
        alert("Invalid backup file format. Import failed.");
      }
    } catch(err) {
      console.error('[Import Error]', err);
      alert("Error parsing file. Ensure it is a valid backup JSON.");
    }
  };
  reader.readAsText(file);
}

// --- Dynamic Set Helper Functions ---
function addSetRow(btn) {
  const card = btn.closest(".exercise-log-card");
  const exName = card.getAttribute("data-ex-name");
  const trackerState = appState.currentWeights[exName];
  const curWeight = trackerState ? trackerState.weight : 0.0;

  const container = card.querySelector(".sets-list-container");
  const setRows = container.querySelectorAll(".set-row");
  const nextSetNum = setRows.length + 1;
  const setIndex = nextSetNum - 1;

  const wDate = document.getElementById("workout-date");
  const dateStr = wDate ? wDate.value : getLocalDateString();
  const { targetReps, lastRepsText } = getTargetRepsForSet(exName, setIndex, dateStr);

  const newRow = document.createElement("div");
  newRow.className = "set-row";
  newRow.setAttribute("data-set-num", nextSetNum);
  newRow.innerHTML = `
    <span class="set-num">Set ${nextSetNum}</span>
    <div class="set-inputs">
      <div class="input-wrapper">
        <input type="number" step="0.5" class="set-weight-input" value="${curWeight}" placeholder="kg">
        <span class="input-unit">kg</span>
      </div>
      <div class="input-wrapper">
        <input type="number" class="set-reps-input" value="${targetReps}" placeholder="${targetReps}" title="Target: ${targetReps} reps">
        <span class="input-unit">reps</span>
      </div>
    </div>
    <div class="target-badge">Target: <strong class="glow-txt" style="color: var(--accent-primary);">${targetReps}</strong> reps <span style="font-size:10px; color: var(--text-muted);">(Last: ${lastRepsText})</span></div>
    <button class="delete-set-btn" title="Delete Set" onclick="removeSetRow(this)">&times;</button>
  `;
  container.appendChild(newRow);
}

function removeSetRow(btn) {
  const row = btn.closest(".set-row");
  const container = row.closest(".sets-list-container");
  row.remove();
  
  // Renumber remaining set titles
  const remainingRows = container.querySelectorAll(".set-row");
  remainingRows.forEach((r, idx) => {
    const num = idx + 1;
    r.setAttribute("data-set-num", num);
    r.querySelector(".set-num").textContent = `Set ${num}`;
  });
}

// --- Google Sheets Sync Gateway & CSV Export Helpers ---
function syncToGoogleSheets(record, url) {
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(record)
  })
  .then(() => {
    console.log("Workout sync payload dispatched successfully to Google Sheets Web App.");
  })
  .catch(err => {
    console.error("Dispatched Google Sheets sync call failed:", err);
  });
}

function copyAppsScriptCode() {
  const code = document.getElementById("apps-script-code").textContent;
  navigator.clipboard.writeText(code)
    .then(() => {
      alert("Apps Script code copied to clipboard!");
    })
    .catch(err => {
      alert("Failed to copy script code: " + err);
    });
}

function copyHistoryAsCSV() {
  if (appState.history.length === 0) {
    alert("No workout history records logged to copy.");
    return;
  }
  
  let csvContent = "Date,Workout Name,Exercise Name,Set Number,Weight (kg),Reps\n";
  
  appState.history.forEach(log => {
    log.exercises.forEach(ex => {
      ex.sets.forEach((set, idx) => {
        if (set.reps !== null && set.reps !== undefined) {
          csvContent += `"${log.date}","${log.workoutName}","${ex.name}",${idx + 1},${set.weight},${set.reps}\n`;
        }
      });
    });
  });
  
  navigator.clipboard.writeText(csvContent)
    .then(() => {
      alert("Workout log history successfully copied as CSV! Go to your Google Sheet and paste (Cmd+V or Ctrl+V) in the top-left cell.");
    })
    .catch(err => {
      alert("Failed to copy CSV content: " + err);
    });
}

// ==========================================
// Insights Tab Rendering Logic
// ==========================================
let insightsVolumeChartInstance = null;

function renderInsightsTab() {
  if (!coachEngine) return;

  // 1. Recovery Monitor
  const recoveryStatus = coachEngine.analyzeRecoveryStatus();
  const rIcon = document.getElementById('recovery-icon');
  const rTitle = document.getElementById('recovery-status-title');
  const rDesc = document.getElementById('recovery-status-desc');
  const rPanel = document.getElementById('recovery-monitor-panel');

  if (rIcon && rTitle && rDesc && rPanel) {
    rIcon.innerText = recoveryStatus.icon;
    rTitle.innerText = recoveryStatus.title;
    rDesc.innerText = recoveryStatus.desc;
    
    // Apply styling based on severity
    rPanel.style.borderLeft = '4px solid ' + (
      recoveryStatus.severity === 'critical' ? '#ff5252' :
      recoveryStatus.severity === 'warning' ? '#f39c12' : '#2ecc71'
    );
    rTitle.style.color = (
      recoveryStatus.severity === 'critical' ? '#ff5252' :
      recoveryStatus.severity === 'warning' ? '#f39c12' : '#2ecc71'
    );
  }

  // 2. Volume Trend & Chart
  const volumeData = coachEngine.analyzeVolumeTrend(8);
  
  // 3. Holistic Analysis
  const holisticStatus = coachEngine.generateHolisticInsights(volumeData);
  const hTitle = document.getElementById('holistic-title');
  const hDesc = document.getElementById('holistic-desc');
  
  if (hTitle && hDesc) {
    hTitle.innerText = holisticStatus.title;
    hDesc.innerText = holisticStatus.desc;
  }

  // Render the Volume Chart
  renderInsightsChart(volumeData);
}

function renderInsightsChart(volumeData) {
  const canvas = document.getElementById("insights-volume-chart");
  if (!canvas) return;

  if (insightsVolumeChartInstance) {
    insightsVolumeChartInstance.destroy();
  }

  insightsVolumeChartInstance = new Chart(canvas, {
    type: "line",
    data: {
      labels: volumeData.labels.length ? volumeData.labels : ["No Data"],
      datasets: [{
        label: "Total Session Volume (Sets×Reps×Weight)",
        data: volumeData.data.length ? volumeData.data : [0],
        backgroundColor: "rgba(102, 252, 241, 0.2)",
        borderColor: "#66FCF1",
        borderWidth: 2,
        pointBackgroundColor: "#45A29E",
        pointRadius: 4,
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#1F2833",
          borderColor: "#66FCF1",
          borderWidth: 1
        }
      },
      scales: {
        y: {
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          title: { display: true, text: "Volume (kg)" }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });
}
