// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";   // <-- ADD THIS


// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCuNTpgr-1hUobmWd5uZfSfKtpF6KjXxp8",
  authDomain: "codepilot-89ccc.firebaseapp.com",
  projectId: "codepilot-89ccc",
  storageBucket: "codepilot-89ccc.firebasestorage.app",
  messagingSenderId: "1008145062045",
  appId: "1:1008145062045:web:ac9ac8461fc528b2d49c74",
  measurementId: "G-H09K00J1DM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Configure Google Auth Provider with additional scopes
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
googleProvider.setCustomParameters({
  client_id: "197800520783-nl64hpdkuq8plulcg7ea5bm90h8v3qvq.apps.googleusercontent.com",
  prompt: "select_account"
});

// Set persistence explicitly
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Auth persistence error:", error);
});

// Optional: Initialize Analytics
export const analytics = getAnalytics(app);

export const db = getFirestore(app);

export default app;