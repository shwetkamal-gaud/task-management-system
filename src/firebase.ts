import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBQysAxQjbUGzfbjc9XwWsNrhBKZzLuRWY",
    authDomain: "task-manager-70a42.firebaseapp.com",
    projectId: "task-manager-70a42",
    storageBucket: "task-manager-70a42.firebasestorage.app",
    messagingSenderId: "210551116196",
    appId: "1:210551116196:web:8f1b3a484e313cc9d83131",
    measurementId: "G-QF51C71THH"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
