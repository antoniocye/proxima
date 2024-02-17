import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect} from 'react';
import * as Location from 'expo-location';

import Profile from './database/Profile.js';
import { init, auth, db, initialized } from './database/Init.js'
import HomeScreen from './src/screens/home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from './src/screens/details'; 
import LoginScreen from './src/screens/login';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'; 


const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync(); // prevent the splash screen from auto-hiding

let myUser;
/*
 * Only add navigation points to this file, handle navigation in the files themselves
 */



function App() {
  useEffect(() => {
    if(!initialized){
      console.log("****************");
      init();
      myUser = new Profile({email: "joshsieh@stanford.edu", password: "password123"});
    }
    
  }, [])
  
 
  const [location, setLocation] = useState();
  const haversine = require('haversine');``
  
  useEffect(() => {
    const getPermissions = async () => { 

      console.log("in permissions", auth.currentUser);
      if(myUser != null && auth.currentUser){
        console.log("Starting location request");
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          console.log("Please grant location permissions");
          return;
        }

        // Get current location and update location
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);

        if (myUser._location == undefined) {
          // Set first location
          myUser.changeUserPropertyInDatabase({location: location});
        } else {
          // Check if location has changed
          let oldLocation = myUser._location;
          
          const start = {
            latitude: oldLocation.coords.latitude,
            longitude: oldLocation.coords.longitude
          }

          const end = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }

          // If more than 1 meter away, update
          if (!haversine(start, end, {threshold: 1, unit: 'meter'})) {
            myUser.changeUserPropertyInDatabase({location: location});
          }
        }
      }

//      console.log("Longitude:");
//      console.log(location.coords.longitude);
//      console.log("Latitude:");
//      console.log(location.coords.latitude);
    };

    getPermissions();
  }, [location, auth]);

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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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

export default App;