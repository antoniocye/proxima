import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, createRef,  useCallback, createContext  } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { GestureHandlerRootView } from "react-native-gesture-handler";

// expo
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'; 

// db
import Profile from './database/Profile.js';
import { initialized, init, auth, db } from './database/Init.js'

// screens
import HomeScreen from './src/screens/home';
import DetailsScreen from './src/screens/details'; 
import LoginScreen from './src/screens/login';
import SignupScreen from './src/screens/signup';
import AddPhotosScreen from './src/screens/addPhotos';
import SelfieScreen from './src/screens/selfie';
import PingStartScreen from './src/screens/ping/pingStart';
import PingDecisionScreen from './src/screens/ping/pingDecision';
import PingDeclinedScreen from './src/screens/ping/pingDeclined';
import PingVerificationScreen from './src/screens/ping/pingVerification';
import PingResultScreen from './src/screens/ping/pingResult';
import PingWaitingScreen from './src/screens/ping/pingWaiting';
import AwaitingVerificationScreen from './src/screens/awaitingVerification';
import MainScreen from './src/screens/main.js';
import OnboardingNameScreen from './src/screens/onboarding/onboardingName.js';
import OnboardingAgeScreen from './src/screens/onboarding/onboardingAge.js';
import OnboardingSchoolScreen from './src/screens/onboarding/onboardingSchool.js';
import OnboardingPreferredGenderScreen from './src/screens/onboarding/onboardingPreferredGender.js';
import OnboardingPassionsScreen from './src/screens/onboarding/onboardingPassions.js';
import OnboardingFirstPromptScreen from './src/screens/onboarding/onboardingFirstPrompt.js';
import OnboardingSecondPromptScreen from './src/screens/onboarding/onboardingSecondPrompt.js';
import OnboardingThirdPromptScreen from './src/screens/onboarding/onboardingThirdPrompt.js';
import OnboardingDoneScreen from './src/screens/onboarding/onboardingDone.js';
import OnboardingPronounsScreen from "./src/screens/onboarding/onboardingPronouns.js";
import OnboardingQuotesScreen from "./src/screens/onboarding/onboardingQuotes.js";
import ChooseAuthMethodScreen from "./src/screens/chooseAuthMethod.js";

import notifs from "./utils/notifs";
import { navigationRef } from './utils/RootNavigation';
import profiles from './src/profiles.js';

// styles
import globalStyles from './src/styles/globalStyles.js';



const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync(); // prevent the splash screen from auto-hiding


/*
 * Only add navigation points to this file, handle navigation in the files themselves
 */

export const GlobalUser = createContext();
export const Profiles = createContext();

function App() {

  const [database, setProfiles] = useState([]);
  // setProfiles(profiles);
  notifs();
  
  const [myUser, setMyUser] = useState();

  const [fontsLoaded, fontError] = useFonts({
    'GeneralSans-Medium': require('./assets/fonts/GeneralSans-Medium.otf'),
    'GeneralSans-Semibold': require('./assets/fonts/GeneralSans-Semibold.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if(!initialized) {
    init();
  }

  return (

    <GlobalUser.Provider value={[ myUser, setMyUser ] }>
    {
      <Profiles.Provider value={[ database, setProfiles ]}>
        {
          <NavigationContainer ref={navigationRef}r>
            <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
              <Stack.Screen name="Home" component={HomeScreen} options={onLayoutRootView}/>
              <Stack.Screen name="Details" component={DetailsScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Sign Up" component={SignupScreen} />
              <Stack.Screen name="Choose Auth Method" component={ChooseAuthMethodScreen} />
              <Stack.Screen name="Add Photos" component={AddPhotosScreen} />
              <Stack.Screen name="Camera" component={SelfieScreen} />
              <Stack.Screen name="Ping Start" component={PingStartScreen} />
              <Stack.Screen name="Ping Decision" component={PingDecisionScreen} />
              <Stack.Screen name="Ping Declined" component={PingDeclinedScreen} />
              <Stack.Screen name="Ping Verification" component={PingVerificationScreen} />
              <Stack.Screen name="Ping Waiting" component={PingWaitingScreen} />
              <Stack.Screen name="Ping Result" component={PingResultScreen} />
              <Stack.Screen name="Awaiting Verification" component={AwaitingVerificationScreen} />
              <Stack.Screen name="Main" component={MainScreen} />

              <Stack.Screen name="Onboarding Name" component={OnboardingNameScreen} />
              <Stack.Screen name="Onboarding Age" component={OnboardingAgeScreen} />
              <Stack.Screen name="Onboarding Pronouns" component={OnboardingPronounsScreen} />
              <Stack.Screen name="Onboarding School" component={OnboardingSchoolScreen} />
              <Stack.Screen name="Onboarding Preferred Gender" component={OnboardingPreferredGenderScreen} />
              <Stack.Screen name="Onboarding Passions" component={OnboardingPassionsScreen} />
              <Stack.Screen name="Onboarding First Prompt" component={OnboardingFirstPromptScreen} />
              <Stack.Screen name="Onboarding Second Prompt" component={OnboardingSecondPromptScreen} />
              <Stack.Screen name="Onboarding Third Prompt" component={OnboardingThirdPromptScreen} />
              <Stack.Screen name="Onboarding Done" component={OnboardingDoneScreen} />
              <Stack.Screen name="Onboarding Quotes" component={OnboardingQuotesScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        }
      </Profiles.Provider>
    }
  </GlobalUser.Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
