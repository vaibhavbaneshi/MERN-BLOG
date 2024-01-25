// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-259ef.firebaseapp.com",
  projectId: "mern-blog-259ef",
  storageBucket: "mern-blog-259ef.appspot.com",
  messagingSenderId: "551883373286",
  appId: "1:551883373286:web:8a12099def8c338f66d927"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
