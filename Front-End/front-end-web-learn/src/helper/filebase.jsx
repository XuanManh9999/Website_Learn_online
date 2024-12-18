// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1Ep57Jh8eN7HSC1HDiJFgbSckEbO3l04",
  authDomain: "project-web-learn.firebaseapp.com",
  projectId: "project-web-learn",
  storageBucket: "project-web-learn.firebasestorage.app",
  messagingSenderId: "763456086389",
  appId: "1:763456086389:web:1a6f7e6142d6417909f33c",
  measurementId: "G-EY3SHH9XHP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
// export const db = getFirestore(app);
export default app;
