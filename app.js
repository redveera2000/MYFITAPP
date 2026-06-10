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
    this.loadState();
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

    // Initialize Weight Logs
    this.weightLogs = weightLogs ? JSON.parse(weightLogs) : [
      { date: "2026-06-06", weight: 112.8 }
    ];

    // Initialize Exercise Weights
    if (weights) {
      this.currentWeights = JSON.parse(weights);
    } else {
      this.currentWeights = {};
      Object.keys(DEFAULT_PROGRAM).forEach(dayKey => {
        DEFAULT_PROGRAM[dayKey].exercises.forEach(ex => {
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
  }

  saveProfile() {
    localStorage.setItem(this.keyPrefix + "profile", JSON.stringify(this.profile));
  }

  saveWeights() {
    localStorage.setItem(this.keyPrefix + "current_weights", JSON.stringify(this.currentWeights));
  }

  saveHistory() {
    localStorage.setItem(this.keyPrefix + "history", JSON.stringify(this.history));
  }

  saveWeightLogs() {
    localStorage.setItem(this.keyPrefix + "weight_logs", JSON.stringify(this.weightLogs));
  }

  logWorkout(workoutKey, dateStr, loggedExercises) {
    const record = {
      id: Date.now().toString(),
      date: dateStr,
      workoutKey: workoutKey,
      workoutName: DEFAULT_PROGRAM[workoutKey].name,
      exercises: loggedExercises
    };

    // Append to history
    this.history.push(record);
    this.saveHistory();

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
    record.exercises = record.exercises.filter(e => e.name !== exName);
    if (record.exercises.length === 0) {
      this.history = this.history.filter(log => log.id !== record.id);
    }
    this.saveHistory();
  }

  // Log a single exercise's sets and update history and progressive overload weight
  logSingleExercise(workoutKey, dateStr, exName, loggedSets) {
    // 1. Find or create daily session log
    let record = this.history.find(log => log.date === dateStr && log.workoutKey === workoutKey);
    if (!record) {
      record = {
        id: Date.now().toString(),
        date: dateStr,
        workoutKey: workoutKey,
        workoutName: DEFAULT_PROGRAM[workoutKey].name,
        exercises: []
      };
      this.history.push(record);
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
    this.profile.weight = parseFloat(weightVal); // update profile weight to latest
    this.saveWeightLogs();
    this.saveProfile();
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

// --- UI Logic & Render Components ---
document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initProfileForm();
  initWeightLogger();
  initWorkoutSelector();
  renderCalorieWidget();
  renderPlanList();
  renderHistoryTable();
  buildCharts();
});

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
    
    // Sync profile display fields
    const profWeightField = document.getElementById("prof-weight");
    if (profWeightField) profWeightField.value = val;
    
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

function initWorkoutSelector() {
  const selector = document.getElementById("workout-select");
  if (!selector) return;

  // Clear and rebuild options
  selector.innerHTML = "";
  Object.keys(DEFAULT_PROGRAM).forEach(key => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = DEFAULT_PROGRAM[key].name;
    selector.appendChild(opt);
  });

  selector.value = activeWorkoutKey;
  selector.addEventListener("change", (e) => {
    activeWorkoutKey = e.target.value;
    renderActiveWorkout();
  });

  // Load current date with timezone-accurate local date and update weekday label
  const wDate = document.getElementById("workout-date");
  if (wDate) {
    wDate.value = getLocalDateString();
    updateWeekdayLabel(wDate);
    wDate.addEventListener("change", () => {
      updateWeekdayLabel(wDate);
      renderActiveWorkout(); // re-render to load correct date history indicators
    });
  }

  renderActiveWorkout();

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

function getTargetRepsForSet(exName, setIndex) {
  const trackerState = appState.currentWeights[exName] || { minReps: 10, maxReps: 15, weight: 10 };
  
  // Find the last logged workout of this key
  const lastLog = [...appState.history]
    .reverse()
    .find(log => log.workoutKey === activeWorkoutKey);

  let lastEx = null;
  let didProgressLastTime = false;
  if (lastLog) {
    lastEx = lastLog.exercises.find(e => e.name === exName);
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

  container.innerHTML = "";
  const program = DEFAULT_PROGRAM[activeWorkoutKey];
  
  const wDate = document.getElementById("workout-date");
  const dateStr = wDate ? wDate.value : getLocalDateString();

  // Find the last logged workout of this key (for comparison details)
  const lastLog = [...appState.history]
    .reverse()
    .find(log => log.workoutKey === activeWorkoutKey);

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
    if (lastLog) {
      lastEx = lastLog.exercises.find(e => e.name === ex.name);
      if (lastEx && lastEx.sets && lastEx.sets.length > 0) {
        const setStrings = lastEx.sets
          .filter(s => s.reps !== null && s.reps !== undefined && s.reps !== "")
          .map((s, idx) => `S${idx + 1}: ${s.weight}kg×${s.reps}`)
          .join(" | ");

        if (setStrings) {
          const d = new Date(lastLog.date);
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
    const numSets = savedSets ? savedSets.length : 3; // use saved length or default 3 sets
    for (let s = 1; s <= numSets; s++) {
      const { targetReps, lastRepsText } = getTargetRepsForSet(ex.name, s - 1);
      
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

function submitLoggedWorkout() {
  const container = document.getElementById("workout-exercises-container");
  const wDate = document.getElementById("workout-date");
  if (!container || !wDate) return;

  const dateStr = wDate.value;
  if (!dateStr) {
    alert("Please select a valid date for this workout.");
    return;
  }

  const cards = container.querySelectorAll(".exercise-log-card");
  const report = [];
  let savedCount = 0;
  let unsavedWithDataCount = 0;

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
      const reportItem = appState.logSingleExercise(activeWorkoutKey, dateStr, exName, sets);
      if (reportItem) {
        report.push(reportItem);
      }
    }
  });

  if (unsavedWithDataCount === 0) {
    if (savedCount === cards.length) {
      alert("All exercises for this session are already saved!");
    } else {
      alert("You must log reps for at least one set to save the workout!");
    }
    return;
  }

  // Show overload report modal or alert
  if (report.length > 0) {
    showOverloadModal(report);
  } else {
    alert("Workout logs saved successfully!");
  }

  // Refresh other tabs & lists
  renderPlanList();
  renderHistoryTable();
  buildCharts();
  renderActiveWorkout();
}

function saveSingleLift(btn) {
  const card = btn.closest(".exercise-log-card");
  const exName = card.getAttribute("data-ex-name");
  
  const wDate = document.getElementById("workout-date");
  if (!wDate) return;
  const dateStr = wDate.value;
  if (!dateStr) {
    alert("Please select a valid date for this workout.");
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
    return;
  }

  // Save via StateManager
  const reportItem = appState.logSingleExercise(activeWorkoutKey, dateStr, exName, sets);

  // Show overload suggestion in modal
  if (reportItem) {
    showOverloadModal([reportItem]);
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

function showOverloadModal(report) {
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

  modal.classList.add("show");

  const closeBtn = document.getElementById("modal-close-btn");
  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.classList.remove("show");
    };
  }
}

// 6. Plan & Current Weights Overview Renderer
function renderPlanList() {
  const container = document.getElementById("plan-overview-container");
  if (!container) return;

  container.innerHTML = "";

  Object.keys(DEFAULT_PROGRAM).forEach(key => {
    const day = DEFAULT_PROGRAM[key];
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
        </tr>
      `;
    });

    section.innerHTML = `
      <div class="plan-day-header">
        <h3>${day.name}</h3>
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

    card.innerHTML = `
      <div class="history-card-header">
        <span class="history-card-date">${dateFormatted}</span>
        <h4 class="history-card-title glow-txt">${log.workoutName}</h4>
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
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (data.profile && data.currentWeights && data.history && data.weightLogs) {
        localStorage.setItem(appState.keyPrefix + "profile", JSON.stringify(data.profile));
        localStorage.setItem(appState.keyPrefix + "current_weights", JSON.stringify(data.currentWeights));
        localStorage.setItem(appState.keyPrefix + "history", JSON.stringify(data.history));
        localStorage.setItem(appState.keyPrefix + "weight_logs", JSON.stringify(data.weightLogs));
        
        alert("Import successful! Reloading tracker state.");
        location.reload();
      } else {
        alert("Invalid backup file format. Import failed.");
      }
    } catch(err) {
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

  const { targetReps, lastRepsText } = getTargetRepsForSet(exName, setIndex);

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
