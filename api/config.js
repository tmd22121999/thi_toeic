// Import the functions you need from the SDKs you need

const {initializeApp} = require('firebase/app');
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-5r7dwBWYma7FZwdnUwrlXgEDIvoHG4w",
  authDomain: "tmd2212-e495d.firebaseapp.com",
  projectId: "tmd2212-e495d",
  storageBucket: "tmd2212-e495d.appspot.com",
  messagingSenderId: "618907088574",
  appId: "1:618907088574:web:ef7391c56df3225d8890ef",
  measurementId: "G-533JLTN2V6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

module.exports = {app};