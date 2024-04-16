// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmac9rD6l1_pzpkp4mxyWltwOXlzqi9qo",
  authDomain: "carpool-78012.firebaseapp.com",
  projectId: "carpool-78012",
  storageBucket: "carpool-78012.appspot.com",
  messagingSenderId: "983259005583",
  appId: "1:983259005583:web:192e31bd8e2abae02626fa",
  measurementId: "G-E3JHDJ7FQ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
