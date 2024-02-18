import React, { useState } from 'react';
import { ActivityIndicator, Text, ImageBackground, Image, SafeAreaView} from 'react-native';
import globalStyles from '../styles/globalStyles';
import AnimatedButton from '../components/button';
import TextField from '../components/textfield';
import PasswordField from '../components/passwordfield';
import Profile from '../../database/Profile';
import { isValidEmail, isStanfordEmail, notEmpty, createAlert } from '../../database/authUtil';

export default function SignupScreen({ navigation }) {
  const [myUser, setMyUser] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confPwd, setConfPwd] = useState();
  const [loading, setLoading] = useState(false);

  const signInErrorAlert = (error) => {
    createAlert("Oops! An error occured...", error);
  }

  const attemptSignIn = async () => {

    console.log(email, password, confPwd);

    if(notEmpty(email, password)){
      
        if(isValidEmail(email)){

          if(isStanfordEmail(email)){

            if(password === confPwd){

              setLoading(true);
              let profile = new Profile({email: email, password: password});
              result = await profile.initProfile("create");
              if(result === "user-create"){
                setMyUser(profile);
                console.log("uw3i4gberlnwihukyrgrehiwk", profile);
                navigation.navigate("Awaiting Verification");
              }
              else if(result == "user-exists"){
                signInErrorAlert("This email is already in use. Try logging in!");
                navigation.navigate("Login");
              }
              else{
                signInErrorAlert("Please try again.");
              }
              setLoading(false);
            }
            else{
              signInErrorAlert("Password and confirmation password do not match.");
            }
          }
          else{
            signInErrorAlert("We only accept Stanford email ids.");
          }
        }
        else{
          signInErrorAlert("Please enter a valid email address.");
        }
    }
    else{
      signInErrorAlert("Email should not be empty. The password should be at least 6 characters long.");
    }
  }

  // Access passed data using route.params
  return (
    <ImageBackground source={require('../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      {!loading ? (
      <SafeAreaView style={globalStyles.container}>
        {/* <Image source={require('../../assets/img/proxima-logo-dark.png')} style={globalStyles.logo}/> */}
        <Text style={globalStyles.heading}>create an account</Text>
        <TextField 
          placeholder="email" 
          onChange={(e) => setEmail(e.nativeEvent.text)}/>
        <PasswordField 
          placeholder="password" 
          onChange={(e) => setPassword(e.nativeEvent.text)}/>
        <PasswordField 
          placeholder="confirm password" 
          onChange={(e) => setConfPwd(e.nativeEvent.text)}/>
        <AnimatedButton onPress={attemptSignIn} title="continue"/>
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