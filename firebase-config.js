/**
 * V-TRACK Firebase Configuration
 * ================================
 * Initializes Firebase App, Authentication (Anonymous), and Cloud Firestore.
 * Uses the Firebase CDN compat SDK (no bundler required).
 *
 * IMPORTANT: Replace the firebaseConfig values below with your actual
 * Firebase project credentials from the Firebase Console.
 */

// Firebase project configuration
// Get these values from: Firebase Console → Project Settings → Your Apps → Web App
const firebaseConfig = {
  apiKey: "${FIREBASE_API_KEY}",
  authDomain: "${FIREBASE_AUTH_DOMAIN}",
  projectId: "${FIREBASE_PROJECT_ID}",
  storageBucket: "${FIREBASE_STORAGE_BUCKET}",
  messagingSenderId: "${FIREBASE_MESSAGING_SENDER_ID}",
  appId: "${FIREBASE_APP_ID}"
};

// Single permanent user credentials for automated login
const singleUserConfig = {
  email: "${SINGLE_USER_EMAIL}",
  password: "${SINGLE_USER_PASSWORD}"
};

// --- Initialize Firebase ---
let firebaseApp = null;
let firebaseAuth = null;
let firebaseDb = null;
let firebaseReady = false;
let currentUserId = null;

// Sync status: 'initializing' | 'synced' | 'syncing' | 'offline' | 'error'
let syncStatus = 'initializing';
const syncListeners = [];

function onSyncStatusChange(callback) {
  syncListeners.push(callback);
}

function setSyncStatus(status) {
  syncStatus = status;
  syncListeners.forEach(cb => cb(status));
}

/**
 * Initialize Firebase services.
 * Returns a Promise that resolves when Firebase Auth is ready.
 */
async function initFirebase() {
  try {
    // Check if Firebase SDK is loaded via CDN
    if (typeof firebase === 'undefined') {
      console.error('[Firebase] SDK not loaded. Check CDN script tags in index.html.');
      setSyncStatus('error');
      return null;
    }

    // Initialize the Firebase App
    firebaseApp = firebase.initializeApp(firebaseConfig);
    console.log('[Firebase] App initialized successfully.');

    // Initialize Authentication
    firebaseAuth = firebase.auth();

    // Initialize Firestore
    firebaseDb = firebase.firestore();

    // Enable offline persistence for Firestore
    try {
      await firebaseDb.enablePersistence({ synchronizeTabs: true });
      console.log('[Firebase] Offline persistence enabled.');
    } catch (err) {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open — persistence only works in one tab at a time
        console.warn('[Firebase] Persistence unavailable: multiple tabs open.');
      } else if (err.code === 'unimplemented') {
        // Browser doesn't support all features required for persistence
        console.warn('[Firebase] Persistence unavailable: browser unsupported.');
      }
    }

    // Listen for Firestore network status changes
    firebaseDb.enableNetwork().then(() => {
      console.log('[Firebase] Firestore network enabled.');
    });

    // Resolve a promise once the initial auth state is verified
    let initialAuthChecked = false;
    let authResolve = null;
    const authInitPromise = new Promise((resolve) => {
      authResolve = resolve;
    });

    // Listen for auth state changes
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        currentUserId = user.uid;
        console.log(`[Firebase] Auth state: signed in as ${user.uid}`);
      } else {
        currentUserId = null;
        console.log('[Firebase] Auth state: signed out');
      }

      if (!initialAuthChecked) {
        initialAuthChecked = true;
        authResolve(currentUserId);
      }
    });

    firebaseReady = true;
    setSyncStatus('synced');
    return authInitPromise;

  } catch (error) {
    console.error('[Firebase] Initialization failed:', error);
    setSyncStatus('error');
    firebaseReady = false;
    return null;
  }
}

/**
 * Helper to resolve the single authorized administrator email
 */
function getAuthorizedEmail() {
  let email = singleUserConfig.email;
  if (!email || email === "" || email.startsWith("${")) {
    return "singleuser@vtrack.app";
  }
  return email.trim().toLowerCase();
}

/**
 * Authenticates user using Email/Password
 */
async function signInUser(email, password) {
  const authorized = getAuthorizedEmail();
  const inputEmail = email.trim().toLowerCase();

  if (inputEmail !== authorized) {
    const error = new Error("Access denied. Email address is not authorized for this application.");
    error.code = "auth/access-denied";
    throw error;
  }

  return firebaseAuth.signInWithEmailAndPassword(inputEmail, password);
}

/**
 * Registers new user using Email/Password (restricted to authorized email only)
 */
async function registerUser(email, password) {
  const authorized = getAuthorizedEmail();
  const inputEmail = email.trim().toLowerCase();

  if (inputEmail !== authorized) {
    const error = new Error("Registration is restricted to the authorized administrator email only.");
    error.code = "auth/registration-restricted";
    throw error;
  }

  return firebaseAuth.createUserWithEmailAndPassword(inputEmail, password);
}

/**
 * Logs out the current user
 */
async function signOutUser() {
  if (firebaseAuth) {
    return firebaseAuth.signOut();
  }
}

/**
 * Check if Firebase is configured (not using placeholder values)
 */
function isFirebaseConfigured() {
  return firebaseConfig.apiKey &&
    firebaseConfig.apiKey !== "YOUR_API_KEY" &&
    firebaseConfig.apiKey !== "" &&
    !firebaseConfig.apiKey.startsWith("${");
}

/**
 * Get the current authenticated user ID
 */
function getFirebaseUserId() {
  return currentUserId;
}

/**
 * Get the Firestore database reference
 */
function getFirestoreDb() {
  return firebaseDb;
}

/**
 * Check if Firebase is ready to use
 */
function isFirebaseReady() {
  return firebaseReady && currentUserId !== null;
}
