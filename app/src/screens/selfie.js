import React from 'react';
import { SafeAreaView, Text, Image, ImageBackground, KeyboardAvoidingView, Platform} from 'react-native';
import globalStyles from '../styles/globalStyles';
import AnimatedButton from '../components/button';
import TextField from '../components/textfield';
import CameraView from '../components/camera';
export default function SelfieScreen({ navigation }) {
  // Access passed data using route.params
  return (
    <ImageBackground source={require('../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      <SafeAreaView style={globalStyles.container}>
        <Text style={globalStyles.heading}>take a selfie</Text>
        <Text style={globalStyles.text}>let us know who you are!</Text>
        <CameraView/>
        <AnimatedButton title="go back" onPress={() => navigation.goBack()}/>
      </SafeAreaView>
    </ImageBackground>
  );
}