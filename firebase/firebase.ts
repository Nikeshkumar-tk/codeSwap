// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3V8BL0QsZwEPNgFRyAVKSIgiFc8jaw_c",
  authDomain: "next-app-f439a.firebaseapp.com",
  projectId: "next-app-f439a",
  storageBucket: "next-app-f439a.appspot.com",
  messagingSenderId: "213685564207",
  appId: "1:213685564207:web:24f2465405c458ca46a7da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
