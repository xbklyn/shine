// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXiXo9W1k7sdTBNbLQUlyg6kl28dzDHbo",
  authDomain: "int305fb026.firebaseapp.com",
  projectId: "int305fb026",
  storageBucket: "int305fb026.appspot.com",
  messagingSenderId: "887655358182",
  appId: "1:887655358182:web:9d8b70dc7a93791905e527",
};

// Initialize Firebase
initializeApp(firebaseConfig);

//innit firebase services
const db = getFirestore();

export default db;
