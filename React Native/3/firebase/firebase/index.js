import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyBMzKrqeUUUSb1BBabo3vpro9a-lgnYkOo",
  authDomain: "playground-84a59.firebaseapp.com",
  projectId: "playground-84a59",
  storageBucket: "playground-84a59.appspot.com",
  messagingSenderId: "903042940651",
  appId: "1:903042940651:web:10dbbd1439a6b4b815c8ae",
  measurementId: "G-MS5CNGKC8J"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

let db = firebase.firestore();
let auth = firebase.auth();
let storage = firebase.storage();
let timestamp = firebase.firestore.Timestamp.now();

export default {
  db,
  auth,
  storage,
  timestamp
};
