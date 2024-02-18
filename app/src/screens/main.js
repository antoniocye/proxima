import React, {useState, useEffect} from 'react';
import { SafeAreaView, Text, Image, ImageBackground, View, Platform, ScrollView, ActivityIndicator} from 'react-native';
import globalStyles from '../styles/globalStyles';
import AnimatedButton from '../components/button';
import profileStyles from '../styles/profileStyles';
import Chip from '../components/chip';
import CaptionImage from '../components/captionImage';

import { GestureHandlerRootView, Gesture, GestureDetector, Directions } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import {getProfiles} from '../profiles';


export default function MainScreen({ navigation }) {

  let profiles = getProfiles();

  const [i, setI] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState('');
  // console.log(profiles);

  // placeholder function
  async function waitForThreeSeconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(profiles[i]);
      }, 10); // 3000 milliseconds = 3 seconds
    });
  }

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

const updateProfilesArray = (updatedProfile) => {
  // Update the profiles array with the new profile data
  // console.log(profiles);
  // console.log(i);
};

  const swipeLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onStart((e) => {
      console.log("swiped left");
      const updatedProfile = { ...profile };
      runOnJS(setProfile)(updatedProfile);
      runOnJS(updateProfilesArray)(updatedProfile); // Update profiles array
      runOnJS(updateI)();
  });

  const swipeRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart((e) => {
      console.log("swiped right");
      const updatedProfile = { ...profile}
      runOnJS(setProfile)(updatedProfile);
      runOnJS(updateProfilesArray)(updatedProfile); // Update profiles array
      runOnJS(updateI)();
  });

  const composed = Gesture.Exclusive(swipeRight, swipeLeft);

  useEffect(() => {
    updateI();
  }, []);

  return (
    <GestureHandlerRootView style={[globalStyles.backgroundImage]}>
      <GestureDetector gesture={composed}>
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
              <View style={{height: 50}}/>
            </ScrollView> : <ActivityIndicator size="large" color={globalStyles.primaryColor}/>}
        </ImageBackground>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}