// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// console.log(import.meta.env.VITE_FIREBASE_API_KEY)
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-f418b.firebaseapp.com",
  projectId: "mern-blog-f418b",
  storageBucket: "mern-blog-f418b.appspot.com",
  messagingSenderId: "686750007628",
  appId: "1:686750007628:web:47fd9854461fc642888fe9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);