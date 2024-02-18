import {firebase, initializeApp} from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export let app, auth, db, user;
export let initialized = false;

export const init = () => {

    console.log("Initializing the firebase app");

    const firebaseConfig = {
        apiKey: "AIzaSyBEOIm7iSVlN1n3wNtxBGji05EJxb_bnhU",
        authDomain: "proxima-2024-treehacks.firebaseapp.com",
        databaseURL: "https://proxima-2024-treehacks-default-rtdb.firebaseio.com",
        projectId: "proxima-2024-treehacks",
        storageBucket: "proxima-2024-treehacks.appspot.com",
        messagingSenderId: "941793154369",
        appId: "1:941793154369:web:5c8c8f3990bf778283fdc0"
      };

    app = initializeApp(firebaseConfig);
    auth = getAuth();
    db = getDatabase();

    onAuthStateChanged(auth, (updated_user) => {
        user = updated_user;    
        console.log("Auth has changed:", user);
    });

    initialized = true;

    return "Hey";
}

function readData(){
    const starCountRef = ref(db, 'users/');
    onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    updateStarCount(postElement, data);
    });
}