import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyACErEJrTyeCCKsLdWlTsiTgkK9D_96aL0",
  authDomain: "team-manager-b8e8c.firebaseapp.com",
  databaseURL: "https://team-manager-b8e8c.firebaseio.com",
  projectId: "team-manager-b8e8c",
  storageBucket: "team-manager-b8e8c.appspot.com",
  messagingSenderId: "19931017617",
  appId: "1:19931017617:web:a3e781f61c12c1e6132a30",
  measurementId: "G-GGQD9WYJK2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };