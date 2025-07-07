// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcbDpmnxou8vakALhF-xefOjPRMIaGCVQ",
  authDomain: "deutsch-lesson.firebaseapp.com",
  projectId: "deutsch-lesson",
  storageBucket: "deutsch-lesson.appspot.com",
  messagingSenderId: "897033382337",
  appId: "1:897033382337:web:cc5ff736371c0b06d9a740",
  measurementId: "G-0N7G118RKF",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
