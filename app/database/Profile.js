import { auth, db, initialized, init, user } from './Init.js'
import { get, ref, set } from 'firebase/database'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export default class Profile{
    // _biographical info
    // _dating preferences
    // _photos
    // _location
    _db;
    _name;
    _email;
    _password;
    _is_verified;
    _userId;
    _location;

    constructor({name, email, password}){
        this._name = name;
        this._email = email;
        this._db = db;
        this._password = password;
        console.log("Going into initialization");

        this.initProfile();
    }

    async initProfile(){
        inUse = await this.emailInUse();

        if(inUse){
            if(!user){
                console.log("We need to login the user")
                await this.loginUser();
            }
        }
        else if(this._password){
            await this.createUser();
        }
        else{
            console.log('The password is empty')
        }

        console.log("Final user object", user);
    }

    async createUser(){
        console.log("Creating user. State before creation:");
        console.log(auth, this._email, this._password);
        userCredential = await createUserWithEmailAndPassword(auth, this._email, this._password);
        const user = userCredential.user;
        console.log("Created user");
        console.log(user);
        this._userId = user.uid;
        console.log("uid:", this._userId);
        await this.addBasicUser();
    }

    async addBasicUser(){
        console.log("Add basic user info to the database")
        console.log("uid", this._uid);
        await this.changeUserPropertyInDatabase({
            email: this._email
        });
    }

    async loginUser(){
        console.log("Logging in the user");
        signInWithEmailAndPassword(auth, this._email, this._password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log("Logged in", user);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    async signoutUser(){
        signOut(auth).then(() => {
            return true;
        }).catch((error) => {
            console.error(error);
            return false;
        });
    }

    changeDatingPreference(preference){

    }

    async changeUserPropertyInDatabase(properties){
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
}