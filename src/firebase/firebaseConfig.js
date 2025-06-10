// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFtCMb78_1nOenbnoMU13vx1_rAifMlhQ",
  authDomain: "project-tracker-redux.firebaseapp.com",
  databaseURL: "https://project-tracker-redux-default-rtdb.firebaseio.com",
  projectId: "project-tracker-redux",
  storageBucket: "project-tracker-redux.firebasestorage.app",
  messagingSenderId: "842290702206",
  appId: "1:842290702206:web:63a2a7ecccef044882b52f",
  measurementId: "G-PCZFW6LTQF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
