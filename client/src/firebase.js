/* eslint-disable no-undef */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import dotenv from "dotenv"
// const dotenv = require("dotenv");
// dotenv.config();
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE,
  authDomain: "mern-auth-app-dcd2f.firebaseapp.com",
  projectId: "mern-auth-app-dcd2f",
  storageBucket: "mern-auth-app-dcd2f.appspot.com",
  messagingSenderId: "545420697147",
  appId: "1:545420697147:web:18d85b697597b11632c61e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
