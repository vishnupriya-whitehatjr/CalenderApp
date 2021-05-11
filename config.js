import firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyBSxUW-d8uX1EAKRf3lwu_RPyV-X0NAif4",
  authDomain: "calenderapp-d28fe.firebaseapp.com",
  projectId: "calenderapp-d28fe",
  storageBucket: "calenderapp-d28fe.appspot.com",
  messagingSenderId: "116080123662",
  appId: "1:116080123662:web:eae17cb7830cd7511ec15f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
