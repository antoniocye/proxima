import React, { useCallback, useState, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { BackgroundLocationService } from './database/Location.js';

// expo
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'; 

// db
import Profile from './database/Profile.js';
import { init, auth, db } from './database/Init.js'

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


const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync(); // prevent the splash screen from auto-hiding


/*
 * Only add navigation points to this file, handle navigation in the files themselves
 */

export const GlobalUser = createContext();


function App() {

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

  for(i = 0; i < 5; i++){
    console.log("---------------------------------------------------------------------");
  }
  
  result = init();

  console.log("user at beginning", auth.currentUser);

  return (

    <GlobalUser.Provider value={[ myUser, setMyUser ] }>
    {
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} options={onLayoutRootView}/>
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Sign Up" component={SignupScreen} />
          <Stack.Screen name="Add Photos" component={AddPhotosScreen} />
          <Stack.Screen name="Camera" component={SelfieScreen} />
          <Stack.Screen name="Ping Start" component={PingStartScreen} />
          <Stack.Screen name="Ping Decision" component={PingDecisionScreen} />
          <Stack.Screen name="Ping Declined" component={PingDeclinedScreen} />
          <Stack.Screen name="Ping Verification" component={PingVerificationScreen} />
          <Stack.Screen name="Ping Waiting" component={PingWaitingScreen} />
          <Stack.Screen name="Ping Result" component={PingResultScreen} />
          <Stack.Screen name="Awaiting Verification" component={AwaitingVerificationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    }
  </GlobalUser.Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const useGlobalUser = () => {
  return useContext(GlobalUser);
};


export default App;