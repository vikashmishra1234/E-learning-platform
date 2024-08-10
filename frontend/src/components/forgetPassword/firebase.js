// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA38jFOPDEHC9FZnvg1pul19sv_JOIFLdo",
  authDomain: "e-learning-platform-dd6d6.firebaseapp.com",
  projectId: "e-learning-platform-dd6d6",
  storageBucket: "e-learning-platform-dd6d6.appspot.com",
  messagingSenderId: "726703236643",
  appId: "1:726703236643:web:fefcec0b73f5a2ba53f396"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };