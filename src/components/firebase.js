// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuIaHblucta21KkIieymUuLdXv0lmQlms",
  authDomain: "test-hackathon-2.firebaseapp.com",
  projectId: "test-hackathon-2",
  storageBucket: "test-hackathon-2.firebasestorage.app",
  messagingSenderId: "675389648456",
  appId: "1:675389648456:web:3a005c9778fb418b6d327d",
  measurementId: "G-W9G50MQZV9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);