import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC-2LlbqEabmFp7A6bmltyLB1Yhg4gi3v8",
    authDomain: "whatsapp-clone-17f7b.firebaseapp.com",
    projectId: "whatsapp-clone-17f7b",
    storageBucket: "whatsapp-clone-17f7b.appspot.com",
    messagingSenderId: "641829215537",
    appId: "1:641829215537:web:bdcd69732d8c947cdae410"
  };
const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();
const db = firebase.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider }