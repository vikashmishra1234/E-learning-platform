// src/firebase.js
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAicUOWkFKlhd06zrY5gO-ewzFtp_jSWn8",
    authDomain: "clone-18491.firebaseapp.com",
    projectId: "clone-18491",
    storageBucket: "clone-18491.appspot.com",
    messagingSenderId: "953903878162",
    appId: "1:953903878162:web:9007fcd73935df0e56c8cb"
  };

const app = initializeApp(firebaseConfig);
export const fileDb = getStorage(app);

