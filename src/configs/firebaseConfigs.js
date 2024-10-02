import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

/**
 * Firebase configuration object.
 *
 * @type {Object}
 * @property {string} apiKey - The API key for Firebase.
 * @property {string} authDomain - The authentication domain for Firebase.
 * @property {string} projectId - The project ID for Firebase.
 * @property {string} storageBucket - The storage bucket for Firebase.
 * @property {string} messagingSenderId - The messaging sender ID for Firebase.
 * @property {string} appId - The application ID for Firebase.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const functions = getFunctions(app);

export { db, storage, auth, googleProvider, githubProvider, functions, app };
