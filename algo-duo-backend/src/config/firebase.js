// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

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
export const auth = getAuth(app);               // For Google Auth
export const provider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);