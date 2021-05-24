import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCr1A8iXvQI7eAucb5Z517oOUJAZ2ZzcOs",
    authDomain: "clone-f4577.firebaseapp.com",
    projectId: "clone-f4577",
    storageBucket: "clone-f4577.appspot.com",
    messagingSenderId: "489889697021",
    appId: "1:489889697021:web:7d7887d755cca3eaf84294"
  };

  const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

export const db = app.firestore();


  // const app = !firebase.apps.length 
  //   ? firebase.initializeApp(firebaseConfig) 
  //   : firebaseConfig.app();

  // const db = app.firestore();

  export default db;