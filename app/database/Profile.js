import { auth, db, user } from './Init.js'
import { get, ref, set, onValue } from 'firebase/database'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut, onAuthStateChanged, getAuth } from 'firebase/auth'
import { getTokenForDatabase } from '../utils/notifs.js'

let onboarding = [
    "Sign Up",
    "Awaiting Verification",
    "Onboarding Name",
    "Onboarding Age",
    "Onboarding Pronouns",
    "Onboarding Quotes",
    "Onboarding Photos",
]

export default class Profile{
    // _biographical info
    // _dating preferences
    // _photos
    // _location
    _db;
    _name;
    _email;
    _password;
    _is_verified = true;
    _userId;
    _location;
    _age;
    _pronouns;
    _notifId;

    _onbStep = "Awaiting Verification";

    _quotes = [];
    _photos = [];
    _interested = [];
    _match = [];

    _returnTo;

    // if you want to set an array, get the current array first, change it, then call the function to set array
    constructor({name, email, password, userId, age, quotes, photos}){
        this._name = name;
        this._email = email;
        this._db = db;
        this._password = password;
        this._userId = userId;
        this._age = age;
        this._quotes = quotes;
        this._photos = photos;
        this._onbStep = "Awaiting Verification";
        
        
        onAuthStateChanged(auth, () => {
            if(auth && auth.currentUser){
                this._is_verified = auth.currentUser.emailVerified;
            }
        })

        
    }

    /* Flags:
    - login
    - create
    - partner
    */
    async initProfile(flag){

        let result;
        let returnTo;
        let inUse;

        await this.changeUserPropertyInDatabase("onbStep", this._onbStep);

        

        if(!(flag === "alr-in")){
            inUse = await this.emailInUse();

            if(inUse){
                returnTo = "Home";
                if((!flag || flag === "login") && !user){
                    await this.loginUser();
                    result = "user-login";
                }
                else if(user){
                    result = "user-login";
                }
                else if(flag === "create"){
                }
            }
            else if((!flag || flag === "create") && this._password){
                await this.createUser();
                result = "user-create";
            }
            else{
                console.log('The password is empty');
                result = "pwd-empty";
            }
        }
        await this.fetchUserData();

        returnTo = this._onbStep;
        console.log("returnTo", returnTo);

        return [result, returnTo];
    }

    async createUser(){
        console.log("Creating user. State before creation:");
        console.log(auth, this._email, this._password);
        userCredential = await createUserWithEmailAndPassword(auth, this._email, this._password);
        // const user = userCredential.user;
        await sendEmailVerification(user);
        console.log("Created user");
        console.log(user);
        this._userId = user.uid;
        console.log("uid:", this._userId);
        await this.addBasicUser();
    }

    async addBasicUser(){
        console.log("Add basic user info to the database")
        console.log("uid", this._userId);
        this._notifId = await getTokenForDatabase();
        await this.changeUserPropertyInDatabase("email", this._email);
        await this.changeUserPropertyInDatabase("isVerified", false);
        await this.changeUserPropertyInDatabase("notifId", this._notifId);

    }


    // we have a valid user object and will fetch the data, adding onValue callbacks at the same time
    async fetchUserData(){
        console.log("Fetching user data");
        this._userId = getAuth().currentUser.uid;
        let snapshot = await get(ref(this._db, "Users/" + this._userId));
        userSnap = snapshot.val();
        this.updateProperties(userSnap);
        onValue(ref(this._db, "Users/" + this._userId), (snapshot) => {
            userSnap = snapshot.val();
            this.updateProperties(userSnap);
        })
        console.log("Done fetching user data");
    }

    updateProperties(userSnap){
        this._name = userSnap.name;
        this._pronouns = userSnap.pronouns;
        this._is_verified = userSnap.isVerified;
        this._location = userSnap.location;
        this._age = userSnap.age;
        this._quotes = userSnap.quotes;
        this._photos = userSnap.photos;
        this._interested = userSnap.interested;
        this._match = userSnap.match;
        this._onbStep = userSnap.onbStep;
    }

    async loginUser(){
        console.log("Loging in the user");
        signInWithEmailAndPassword(auth, this._email, this._password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            this._userId = user.uid;
            // ...
            console.log("Logged in", user, user.uid);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    async signoutUser(){
        signOut(auth).then(() => {
            console.log("Signed out");
            return true;
        }).catch((error) => {
            console.log("Error signing out");
            console.error(error);
            return false;
        });
    }

    changeDatingPreference(preference){

    }

    async changeUserPropertyInDatabase(propertyName, properties){
        console.log("Changing user property in database", propertyName, properties);
        await set(ref(this._db, 'Users/' + this._userId + "/" + propertyName), properties);
    }

    async addElementToArrayProperty(properties){
        await set(ref(this._db, 'Users/' + this._userId), properties);
    }

    async emailInUse(){
        console.log("Checking if email in use")
        let inUse = false;
        try{
            let snapshot = await get(ref(this._db, "Users/"));
            console.log("Found snapshot", snapshot);
            if(snapshot.exists()){
                console.log("Current snapshot", snapshot);
                snapshot.forEach( (userSnapshot) => {
                    if(this._email === userSnapshot.val().email){
                        inUse = true;
                    }
                });
                
            }
        }
        catch(error){
            console.error(error);
        }

        if(inUse){
            console.log("Email in use");
        }
        else{
            console.log("Email not in use");
        }
        return inUse;
    }

    async setListenerPropertyOnChange(property, callBack){
        const propRef = ref(this._db, this._userId + '/' + property);
        onValue(propRef, (snapshot) => {
            const data = snapshot.val();
            switch(property) {
                case "name":
                  this._name = data;
                  break;
                case "location":
                  this._location = data;
                  break;
                case "age":
                    this._age = data;
                    break;
                case "pronouns":
                    this._pronouns = data;
                    break;
                case "quotes":
                    this._quotes = data;
                    break;
                case "photos":
                    this._photos = data;
                    break;
                case "interested":
                    this._interested = data;
                    break;
                case "match":
                    this._match = data;
                    break;
                default:
                  // Code to execute if expression does not match any case
              }
            if(callBack){
                callBack(data);
            }
        });
    }
}