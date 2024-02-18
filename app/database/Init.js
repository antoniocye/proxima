import {firebase, initializeApp} from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth, initializeAuth, onAuthStateChanged, setPersistence, getReactNativePersistence, inMemoryPersistence} from "firebase/auth";
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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
    auth = initializeAuth(app, {
        // persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
    //console.log(auth, "auth in Init")

    //setPersistence(auth, inMemoryPersistence);

    db = getDatabase();

    onAuthStateChanged(auth, (updated_user) => {
        user = updated_user;
        //console.log("Auth has changed:", user);
    });

    initialized = true;
    return "Hey";
}