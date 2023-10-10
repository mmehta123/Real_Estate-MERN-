// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-mern-99f40.firebaseapp.com",
  projectId: "real-estate-mern-99f40",
  storageBucket: "real-estate-mern-99f40.appspot.com",
  messagingSenderId: "968667045345",
  appId: "1:968667045345:web:1930e31e5cf23e377a46a0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);