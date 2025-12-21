// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0fMc5tUN1gp1x8SIsk6PxCJwbsqixifo",
  authDomain: "centralweb-76cad.firebaseapp.com",
  projectId: "centralweb-76cad",
  storageBucket: "centralweb-76cad.firebasestorage.app",
  messagingSenderId: "156637656186",
  appId: "1:156637656186:web:c70cc258155c727decb7c3",
  measurementId: "G-1P1L5XDV0T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };