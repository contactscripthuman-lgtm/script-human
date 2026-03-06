// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyClnKCFd1gNZierZuXoDAuHkl8_k7rCaR8",
    authDomain: "script-human-a9ec3.firebaseapp.com",
    projectId: "script-human-a9ec3",
    storageBucket: "script-human-a9ec3.firebasestorage.app",
    messagingSenderId: "996573688827",
    appId: "1:996573688827:web:d927317d3efc8cd19c115e"
};

// Initialize Firebase
// We check if an app already exists to prevent Next.js hot-reloading from initializing it multiple times
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
