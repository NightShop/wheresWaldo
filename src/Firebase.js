import firebase from "firebase/app";
import "firebase/firestore";

if (firebase.apps.length === 0) {
    firebase.initializeApp({
      apiKey: "AIzaSyAicYV7Ut0I6ZJg-pR7uGpYF6ojdTbJr40",
      authDomain: "whereswaldo-f02d4.firebaseapp.com",
      projectId: "whereswaldo-f02d4",
      storageBucket: "whereswaldo-f02d4.appspot.com",
      messagingSenderId: "291417893499",
      appId: "1:291417893499:web:3cae545b016ab9a64610de"
    })
  }
  
  export default firebase;