import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
var firebaseConfig = {
  apiKey: "AIzaSyDrffMVjWpzoR-11bVwcexhI07XcwuJXag",
  authDomain: "cougssharefood.firebaseapp.com",
  projectId: "cougssharefood",
  storageBucket: "cougssharefood.appspot.com",
  messagingSenderId: "371170372090",
  appId: "1:371170372090:web:639d2ac01e9db508869c43",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const fireStore = firebase.firestore();

export { fireStore, storage };
