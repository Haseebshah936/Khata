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
const phoneProvider = new firebase.auth.PhoneAuthProvider();
const phoneAuthProvider = firebase.auth.PhoneAuthProvider;

var actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  // url: 'https://www.example.com/finishSignUp?cartId=1234',
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: "host.exp.exponent",
  },
  android: {
    packageName: "host.exp.exponent",
    installApp: true,
    minimumVersion: "12",
  },
  // dynamicLinkDomain: 'example.page.link'
};
export {
  db,
  db1,
  auth,
  storage,
  fbAuthProvider,
  googleAuthProvider,
  phoneProvider,
  phoneAuthProvider,
  actionCodeSettings,
};
