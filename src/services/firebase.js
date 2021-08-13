import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCoSoltxlZVSYkrEgywOoxPGyQv1knhfmE",
  authDomain: "sweet-sweat.firebaseapp.com",
  //databaseURL: "ADD-YOUR-DETAILS-HERE"
};

firebase.initializeApp(config);
export const auth = firebase.auth;
//export const db = firebase.database();
