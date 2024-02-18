import React from 'react';
import { SafeAreaView, Text, Image, ImageBackground, KeyboardAvoidingView, Platform} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import AnimatedButton from '../../components/button';
import profileStyles from '../../styles/profileStyles';
export default function PingStartScreen({ route, navigation }) {

  var profiles = [
    {
      name: "Tanvir", 
      age: 18, 
      pronouns: "he/him", 
      photos: [
        {uri: require("../../../assets/example-profile-1/image-1.jpeg"), caption: "brown munde"}, 
        {uri: require("../../../assets/example-profile-1/image-2.jpeg"), caption: "big pregame guy"},
        {uri: require("../../../assets/example-profile-1/image-3.jpeg"), caption: "am i a good dancer?"},
      ], 
      quotes: ["i only date punjabi girls.  i’m the real brown munde", "i don’t live in la hoya. i’m just from the poor part of san diego"],
    },
    {
      name: "Josh", 
      age: 13, 
      pronouns: "him", 
      photos: [
        {uri: require("../../../assets/example-profile-2/image-1.jpeg"), caption: "brown munde"}, 
        {uri: require("../../../assets/example-profile-2/image-2.jpg"), caption: "i'm basically jeremy lin"},
        {uri: require("../../../assets/example-profile-2/image-3.jpeg"), caption: "didn't ask for this birthday party"},
      ], 
      quotes: ["i talk to females every day", "math 61 was the easiest class i’ve ever taken"],
    },
    {
      name: "Andres", 
      age: 18, 
      pronouns: "he/him", 
      photos: [
        {uri: require("../../../assets/example-profile-3/image-1.jpg"), caption: "brown munde"}, 
        {uri: require("../../../assets/example-profile-3/image-2.jpeg"), caption: "point five"},
        {uri: require("../../../assets/example-profile-3/image-3.jpeg"), caption: "hacker mode initiated"},
      ], 
      quotes: ["i do cool guy things like play league of legends", "you wouldn't believe it, but i have a girlfriend"],
    }
  ];

  const { user_id, message } = route.params;

  var matchedProfile = profiles.find(profile => {
    return profile.name === user_id;
  })
  

  return (
    <ImageBackground source={require('../../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      <SafeAreaView style={globalStyles.container}>
        <Text style={globalStyles.text}>you matched with</Text>
        <Text style={globalStyles.heading}>{matchedProfile.name} {message}</Text>
        <Image source={matchedProfile.photos[0].uri} style={profileStyles.mainImage}/>
        
        <AnimatedButton title="ok" onPress={() => navigation.popToTop()}/>
      </SafeAreaView>
    </ImageBackground>
  );
}