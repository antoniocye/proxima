import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Text, Image, ImageBackground, KeyboardAvoidingView, Platform, ActivityIndicator} from 'react-native';
import globalStyles from '../styles/globalStyles';
import { auth } from '../../database/Init';
import { GlobalUser } from '../../App';
import { getAuth } from "firebase/auth";

export default function AwaitingVerificationScreen({ navigation }) {
  
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [myUser, setMyUser] = useContext(GlobalUser);

  let count = 0;

  useEffect(() => {
    myUser.changeUserPropertyInDatabase("onbStep", "Onboarding Name");
    let returnTo = "Onboarding Name";

    const interval = setInterval(() => {
      if(count > 1){
        navigation.navigate(returnTo);
      }

      console.log(getAuth())
      console.log(auth.currentUser.emailVerified);
      if (auth && auth.currentUser && auth.currentUser.emailVerified === true) {
        navigation.navigate(returnTo);
      }
      count ++;
    }, 5000); // Check every 5 seconds
  
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [auth, navigation]);

  return (
    <ImageBackground source={require('../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      <SafeAreaView style={globalStyles.container}>
        <Text style={globalStyles.heading}>hold your horses</Text>
        <Text style={globalStyles.text}>check your email for a verification code!</Text>
        <ActivityIndicator size="large" color={globalStyles.primaryColor} style={{padding: 20}}/>
      </SafeAreaView>
    </ImageBackground>
  );
}