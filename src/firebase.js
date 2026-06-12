import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAUQmkjMQmXtmJUwIdUsPTNYHceIK3BNu0",
  authDomain: "sgnpharmacy-2cd03.firebaseapp.com",
  projectId: "sgnpharmacy-2cd03",
  storageBucket: "sgnpharmacy-2cd03.firebasestorage.app",
  messagingSenderId: "92239712261",
  appId: "1:92239712261:web:a9eb3b0be1cfdcf9d90c6c",
  measurementId: "G-5FD9NP0M9C"
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const analytics = getAnalytics(app);