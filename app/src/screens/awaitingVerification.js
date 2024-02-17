import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Text, Image, ImageBackground, KeyboardAvoidingView, Platform, ActivityIndicator} from 'react-native';
import globalStyles from '../styles/globalStyles';
import { auth } from '../../database/Init';
export default function AwaitingVerificationScreen({ navigation }) {
  
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if(auth && auth.currentUser && auth.currentUser.emailVerified === true){
      navigation.navigate("Home");
    }
  }, []);

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