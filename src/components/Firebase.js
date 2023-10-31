// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// import { getAnalytics } from "firebase/analytics";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhxDo012egU3PV9rcE_AA6wwWEaSsXwGQ",
  authDomain: "appopener-diwali-abe5f.firebaseapp.com",
  projectId: "appopener-diwali-abe5f",
  storageBucket: "appopener-diwali-abe5f.appspot.com",
  messagingSenderId: "754519270211",
  appId: "1:754519270211:web:b61f480192a5efc90085f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// const analytics = getAnalytics(app);

export {db, storage};