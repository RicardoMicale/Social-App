// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'social-app-c97ce.firebaseapp.com',
  projectId: 'social-app-c97ce',
  storageBucket: 'social-app-c97ce.appspot.com',
  messagingSenderId: '1081028974493',
  appId: '1:1081028974493:web:43eb0a143a4d4439dc4174',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
