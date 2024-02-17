import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect} from 'react';
import * as Location from 'expo-location';
import getPermissions from './Location';

/*
const start = {
  latitude: currentLocation.coords.latitude,
  longitude: currentLocation.coords.longitude
}
const end = {
  latitude: location.coords.latitude,
  longitude: location.coords.longitude
}

if (haversine(start, end, {threshold: 1, unit: 'meter'}) == false) {
  setLocation(currentLocation);
  console.log("Changed!!!");
}

- Check altitudes are within __ meters
- Use haversine to see if database location is different from new location
- When it changes, check if within __ meters of another person
*/
import Profile from './database/Profile.js';
import { init, auth, db } from './database/Init.js'
import HomeScreen from './src/screens/home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from './src/screens/details'; 
import LoginScreen from './src/screens/login';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'; 


const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync(); // prevent the splash screen from auto-hiding


/*
 * Only add navigation points to this file, handle navigation in the files themselves
 */



function App() {

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
    console.log("----------------------------------------");
  }
  
  result = init();
  user = new Profile({name:"Antonio", email:"antoniokambire@gmail.com", password:"Hello123"});
  
  console.log("We have finished profile creation");

  const [location, setLocation] = useState();
  const haversine = require('haversine');
  
  useEffect(() => {
      getPermissions(setLocation);
  }, [location]);

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