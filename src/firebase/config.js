// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwPJGgBhKweFFDD4jwuJeNofupuRHz6f8",
  authDomain: "fir-maida-e8a6d.firebaseapp.com",
  projectId: "fir-maida-e8a6d",
  storageBucket: "fir-maida-e8a6d.appspot.com",
  messagingSenderId: "964112048590",
  appId: "1:964112048590:web:396da7cf138bbceffd0b9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
export const databaseStorage = getStorage(app)