import React, {useState, useEffect} from 'react';
import { SafeAreaView, Text, Image, ImageBackground, View, Platform, ScrollView, ActivityIndicator} from 'react-native';
import globalStyles from '../styles/globalStyles';
import AnimatedButton from '../components/button';
import profileStyles from '../styles/profileStyles';
import Chip from '../components/chip';
import CaptionImage from '../components/captionImage';

import { GestureHandlerRootView, Gesture, GestureDetector, Directions } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { get } from 'firebase/database';



export default function MainScreen({ navigation }) {
  const profiles = [
    {
      name: "Tanvir", 
      age: 18, 
      pronouns: "he/him", 
      photos: [
        {uri: require("../../assets/example-profile-1/image-1.jpeg"), caption: "brown munde"}, 
        {uri: require("../../assets/example-profile-1/image-2.jpeg"), caption: "big pregame guy"},
        {uri: require("../../assets/example-profile-1/image-3.jpeg"), caption: "am i a good dancer?"},
      ], 
      quotes: ["i only date punjabi girls.  i’m the real brown munde", "i don’t live in la hoya. i’m just from the poor part of san diego"],
      interested: true,
    },
    {
      name: "Josh", 
      age: 13, 
      pronouns: "him", 
      photos: [
        {uri: require("../../assets/example-profile-2/image-1.jpeg"), caption: "brown munde"}, 
        {uri: require("../../assets/example-profile-2/image-2.jpg"), caption: "i'm basically jeremy lin"},
        {uri: require("../../assets/example-profile-2/image-3.jpeg"), caption: "didn't ask for this birthday party"},
      ], 
      quotes: ["i talk to females every day", "math 61 was the easiest class i’ve ever taken"],
      interested: true,
    },
  ];

  const [i, setI] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState('');

  const getProfile = async () => {
    setIsLoading(true);
    const result = await waitForThreeSeconds();
    setProfile(result);
    setIsLoading(false);
  };

  function updateI () {
    // Use a functional update to ensure we always have the current state
    setI(currentI => {
      const nextI = (currentI + 1) % profiles.length;
      return nextI;
    });

    getProfile();
  }

  const swipeLeft = Gesture.Fling()
      .direction(Directions.RIGHT)
      .onStart((e) => {
        runOnJS(updateI)()
      });


  // placeholder function
  async function waitForThreeSeconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(profiles[i]);
      }, 0); // 3000 milliseconds = 3 seconds
    });
  }

  useEffect(() => {
    updateI();
  }, []);

  return (
    <GestureHandlerRootView style={[globalStyles.backgroundImage]}>
      <GestureDetector gesture={swipeLeft}>
        <ImageBackground source={require('../../assets/img/background.png')} style={globalStyles.backgroundImage}>
          <SafeAreaView/>
            {!isLoading ? <ScrollView>
              <View style={profileStyles.container}>
                <Text style={[globalStyles.text, profileStyles.label]}>meet</Text>
                <Text style={[globalStyles.heading, {marginBottom: 20}]}>{profile.name.toLowerCase()}</Text>
                
                <Image source={profile.photos[0].uri} style={profileStyles.mainImage}/>
                <View style={profileStyles.row}>
                  <Chip label={profile.age}/> 
                  <Chip label={profile.pronouns}/>
                </View>
                <View style={profileStyles.quote}>
                  <Text style={profileStyles.quoteText}>{profile.quotes[0].toLowerCase()}</Text>
                </View>
                <CaptionImage imageSource={profile.photos[1].uri} caption={profile.photos[1].caption}/>
                <View style={profileStyles.quote}>
                  <Text style={profileStyles.quoteText}>{profile.quotes[1].toLowerCase()}</Text>
                </View>
                <CaptionImage imageSource={profile.photos[2].uri} caption={profile.photos[2].caption}/>
              </View>
              <AnimatedButton title="next" onPress={updateI}/>
              <View style={{height: 50}}/>
            </ScrollView> : <ActivityIndicator size="large" color={globalStyles.primaryColor}/>}
        </ImageBackground>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}