// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTSiEnNIlShUtptU0vPCwqUC294h65ehU",
  authDomain: "saturdaynight-3ae1f.firebaseapp.com",
  projectId: "saturdaynight-3ae1f",
  storageBucket: "saturdaynight-3ae1f.appspot.com",
  messagingSenderId: "630422418581",
  appId: "1:630422418581:web:a12919be43aa62f9cd979c",
  measurementId: "G-QERDYD5VG0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
