// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFQxAzJ0C2ZzeqAJiHenrWEAlYISzsS00",
  authDomain: "quiz-from-ppt.firebaseapp.com",
  projectId: "quiz-from-ppt",
  storageBucket: "quiz-from-ppt.firebasestorage.app",
  messagingSenderId: "189801071441",
  appId: "1:189801071441:web:02e9fb14e9cf910d190970",
  measurementId: "G-JC18VDRFG2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app,auth };