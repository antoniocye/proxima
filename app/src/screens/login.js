import React, { useState, useContext, useEffect } from 'react';
import { Text, ImageBackground, Image, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import globalStyles from '../styles/globalStyles';
import AnimatedButton from '../components/button';
import TextField from '../components/textfield';
import PasswordField from '../components/passwordfield';
import Profile from '../../database/Profile';
import { isValidEmail, isStanfordEmail, notEmpty } from '../../database/authUtil';

export default function LoginScreen({ navigation }) {
  const [myUser, setMyUser] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);


  useEffect( () => {    
      async function initializeProfile () {
        console.log("Started initializing");
        result = await myUser.initProfile();
        console.log("Finished logging in");
      }
      initializeProfile();
  }, [myUser]
  )


  const createAlert = (error) =>
  Alert.alert('Error loging into your account', error, [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);

  const attemptLogin = async () => {

    console.log("Attempted login");

    if(notEmpty(email, password)){

      if(isValidEmail(email)){

        if(isStanfordEmail(email)){
          setLoading(true);
          let profile = new Profile({email: email, password: password});
          result = await profile.initProfile("login");
          if(result === "user-login"){
            setMyUser(profile);
            navigation.navigate("Details");
          }
          else{
            setLoading(false);
            createAlert("Something weird happened");
          }
        }
        else{
          createAlert("We only accept Stanford emails.");
        }
      }
      else{
        createAlert("Please provide a valid email");
      }
    }
    else{
      createAlert("Empty password or email");
    }
  }


  // Access passed data using route.params

  return (
    <ImageBackground source={require('../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      {!loading ? (
        <SafeAreaView style={globalStyles.container}>
          <Image source={require('../../assets/img/proxima-logo-dark.png')} style={globalStyles.logo}/>
          <Text style={globalStyles.heading}>log in</Text>
          <TextField 
            placeholder="email" 
            onChange = {(e) => setEmail(e.nativeEvent.text)} 
            keyboardType="email-address"
          />

          <PasswordField 
            placeholder="password" 
            onChange = {(e) => setPassword(e.nativeEvent.text)}
          />

          <AnimatedButton onPress={attemptLogin} title="continue"/>
        </SafeAreaView>
      ) : 
      (
        <SafeAreaView style={globalStyles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </SafeAreaView>
      )}
      
    </ImageBackground>
  );
}