import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: "AIzaSyB0fMc5tUN1gp1x8SIsk6PxCJwbsqixifo",
    authDomain: "centralweb-76cad.firebaseapp.com",
    projectId: "centralweb-76cad",
    storageBucket: "centralweb-76cad.firebasestorage.app",
    messagingSenderId: "156637656186",
    appId: "1:156637656186:web:c70cc258155c727decb7c3",
    measurementId: "G-1P1L5XDV0T",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return {
    provide: {
      db,
    },
  };
});
