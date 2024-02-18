var profiles = [
    {
        name: "Tanvir", 
        age: 18, 
        pronouns: "he/him", 
        photos: [
        {uri: require("../assets/example-profile-1/image-1.jpeg"), caption: "brown munde"}, 
        {uri: require("../assets/example-profile-1/image-2.jpeg"), caption: "big pregame guy"},
        {uri: require("../assets/example-profile-1/image-3.jpeg"), caption: "am i a good dancer?"},
        ], 
        quotes: ["i only date punjabi girls.  i’m the real brown munde", "i don’t live in la hoya. i’m just from the poor part of san diego"],
    },
    {
        name: "Josh", 
        age: 13, 
        pronouns: "him", 
        photos: [
        {uri: require("../assets/example-profile-2/image-1.jpeg"), caption: "brown munde"}, 
        {uri: require("../assets/example-profile-2/image-2.jpg"), caption: "i'm basically jeremy lin"},
        {uri: require("../assets/example-profile-2/image-3.jpeg"), caption: "didn't ask for this birthday party"},
        ], 
        quotes: ["i talk to females every day", "math 61 was the easiest class i’ve ever taken"],
    },
    {
        name: "Andres", 
        age: 18, 
        pronouns: "he/him", 
        photos: [
        {uri: require("../assets/example-profile-3/image-1.jpg"), caption: "brown munde"}, 
        {uri: require("../assets/example-profile-3/image-2.jpeg"), caption: "point five"},
        {uri: require("../assets/example-profile-3/image-3.jpeg"), caption: "hacker mode initiated"},
        ], 
        quotes: ["i do cool guy things like play league of legends", "you wouldn't believe it, but i have a girlfriend"],
    }
];


function getProfiles() {
    return profiles;
}

function getProfile(name) {
    return profiles.find(profile => {
        return profile.name === name;
    });
}

function addProfile(profile) {
    profiles.push(profile);
}

function updateProfile(name, newProfile) {


    const index = profiles.indexOf(getProfile(name));

    profiles.splice(index, 1);

    profiles.push(newProfile);
}

export {getProfiles, updateProfile, addProfile, getProfile};