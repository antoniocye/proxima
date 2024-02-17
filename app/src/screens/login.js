import React, { useState, useContext, useEffect } from 'react';
import { Text, ImageBackground, Image, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import globalStyles from '../styles/globalStyles';
import AnimatedButton from '../components/button';
import TextField from '../components/textfield';
import PasswordField from '../components/passwordfield';


export default function LoginScreen({ navigation }) {
  const [myUser, setMyUser] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);


  useEffect( () => {    
      async function initializeProfile () {
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

  // validate email and password
  function isValidEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  function isStanfordEmail() {
    const domain = 'stanford.edu';
    const regex = new RegExp(`@${domain}$`, 'i'); // Case insensitive match for domain
    return regex.test(email);
  }
  function notEmpty(){
    return true;
  }
  const attemptLogin = async () => {
    if(notEmpty()){
      console.log("notEmpty");
      if(isValidEmail()){
        console.log("email valid");
        if(isStanfordEmail){
          console.log("stanford email");
          setLoading(true);
          profile = new Profile({email: email, password: password});
          setMyUser(profile);
          
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
      createAlert("Please provide your email and password");
    }
  }


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
          onSubmitEditing={(e) => console.log(e.nativeEvent.text)}/>

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