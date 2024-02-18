import React, { useState, useContext, useEffect } from 'react';
import { Text, ImageBackground, Image, SafeAreaView, ActivityIndicator, KeyboardAvoidingView, Platform} from 'react-native';
import globalStyles from '../styles/globalStyles';
import AnimatedButton from '../components/button';
import TextField from '../components/textfield';
import PasswordField from '../components/passwordfield';
import Profile from '../../database/Profile';
import { isValidEmail, isStanfordEmail, notEmpty, createAlert } from '../../database/authUtil';
import { GlobalUser } from '../../App';

export default function LoginScreen({ navigation }) {
  const [myUser, setMyUser] = useContext(GlobalUser);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const logInErrorAlert = () => {
    createAlert("Oops! An error occured...", "There was a problem logging you in, try again!");
  }

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
            navigation.navigate("Awaiting Verification");
          }
          else{
            setLoading(false);
            logInErrorAlert();
          }
        }
        else{
          logInErrorAlert();
        }
      }
      else{
        logInErrorAlert();
      }
    }
    else{
      logInErrorAlert();
    }
  }


  // Access passed data using route.params

  return (
    <ImageBackground source={require('../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      {!loading ? (
        <SafeAreaView style={globalStyles.container}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.keyboardAvoidingContainer}>
            <Image source={require('../../assets/img/proxima-logo-dark.png')} style={globalStyles.logo}/>
            <Text style={globalStyles.heading}>log in</Text>
            <TextField 
              placeholder="email" 
              onChange = {(e) => setEmail(e)} 
              keyboardType="email-address"
            />

            <PasswordField 
              placeholder="password" 
              onChange = {(e) => setPassword()}
            />

            <AnimatedButton onPress={attemptLogin} title="continue"/>    
          </KeyboardAvoidingView>
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