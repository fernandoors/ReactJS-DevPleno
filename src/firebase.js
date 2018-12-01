import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyD-_zNx2SORQtiekcPb9nfmw_Vr9m6Mwtw",
    authDomain: "comments-fdoors.firebaseapp.com",
    databaseURL: "https://comments-fdoors.firebaseio.com",
    projectId: "comments-fdoors",
    storageBucket: "comments-fdoors.appspot.com",
    messagingSenderId: "49678164320"
  };
firebase.initializeApp(config)

export const database = firebase.database()
export const auth = firebase.auth()
//aplicando nova senha