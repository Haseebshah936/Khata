import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyCYrcKj9y1A4AjdOGR6gf6qOPT7kyrWuoI",
    authDomain: "todo-64931.firebaseapp.com",
    databaseURL: "https://todo-64931-default-rtdb.firebaseio.com/",
    projectId: "todo-64931",
    storageBucket: "todo-64931.appspot.com",
    messagingSenderId: "1032518549083",
    appId: "1:1032518549083:web:ba22205c047869fc5ac97e",
};

let app;

if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}
else{
    app = firebase.app();
}

const db = firebase.firestore();
const db1 = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();

// service firebase.storage {
//     match /b/{bucket}/o {
//       match /{allPaths=**} {
//         allow read, write: if request.auth != null;
//       }
//     }
//   }

export {db, db1, auth, storage};