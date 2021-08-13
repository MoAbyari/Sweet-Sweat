import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCoSoltxlZVSYkrEgywOoxPGyQv1knhfmE",
  authDomain: "sweet-sweat.firebaseapp.com",
  databaseURL: "https://sweet-sweat-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
