// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD3nwW2rn1fGdRFEFbsec85iRzPxiULN90",
    authDomain: "clone-7c211.firebaseapp.com",
    projectId: "clone-7c211",
    storageBucket: "clone-7c211.appspot.com",
    messagingSenderId: "212662871724",
    appId: "1:212662871724:web:78329f9b6d8b0f0830e109",
    measurementId: "G-1F5NRQ1QYX"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};