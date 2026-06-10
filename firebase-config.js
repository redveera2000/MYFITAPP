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

    // Automatically sign in to the single permanent user account (frictionless — no login screen needed)
    let email = singleUserConfig.email;
    let password = singleUserConfig.password;

    if (!email || email === "" || email.startsWith("${")) {
      email = "singleuser@vtrack.app";
    }
    if (!password || password === "" || password.startsWith("${")) {
      password = "vtrackDefaultPassword123!";
    }

    let userCredential;
    try {
      userCredential = await firebaseAuth.signInWithEmailAndPassword(email, password);
      console.log(`[Firebase] Automated single-user sign in successful. UID: ${userCredential.user.uid}`);
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        console.log(`[Firebase] User account not found. Registering new single user: ${email}`);
        userCredential = await firebaseAuth.createUserWithEmailAndPassword(email, password);
        console.log(`[Firebase] New single user registered and signed in. UID: ${userCredential.user.uid}`);
      } else if (err.code === 'auth/operation-not-allowed') {
        console.error('[Firebase] Email/Password sign-in provider is disabled in your Firebase console. Please enable it under Authentication -> Sign-in method.');
        throw err;
      } else {
        throw err;
      }
    }
    currentUserId = userCredential.user.uid;

    // Listen for auth state changes
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        currentUserId = user.uid;
        console.log(`[Firebase] Auth state: signed in as ${user.uid}`);
      } else {
        currentUserId = null;
        console.log('[Firebase] Auth state: signed out');
      }
    });

    firebaseReady = true;
    setSyncStatus('synced');
    return currentUserId;

  } catch (error) {
    console.error('[Firebase] Initialization failed:', error);
    setSyncStatus('error');
    firebaseReady = false;
    return null;
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
