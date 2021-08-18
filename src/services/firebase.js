import firebase from 'firebase';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyCoSoltxlZVSYkrEgywOoxPGyQv1knhfmE",
  authDomain: "sweet-sweat.firebaseapp.com",
  databaseURL: "https://sweet-sweat-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "sweet-sweat.appspot.com",
  projectId: "sweet-sweat",
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
export const fsDb = firebase.firestore();
export const storage = firebase.storage();
