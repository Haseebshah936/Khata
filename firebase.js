import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import { firebaseConfig } from "./APIKeys";

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = firebase.firestore();
const db1 = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();
const fbAuthProvider = firebase.auth.FacebookAuthProvider;
const googleAuthProvider = firebase.auth.GoogleAuthProvider;

export { db, db1, auth, storage, fbAuthProvider, googleAuthProvider };
