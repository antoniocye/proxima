import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, ImageBackground, KeyboardAvoidingView, Platform} from 'react-native';
import * as Progress from 'react-native-progress';
import globalStyles from '../../styles/globalStyles';
import AnimatedButton from '../../components/button';
import TextField from '../../components/textfield';
export default function OnboardingDoneScreen({ navigation }) {
  return (
    <ImageBackground source={require('../../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      <SafeAreaView style={[globalStyles.container, {justifyContent:'flex-start'}]}>
        <Image source={require('../../../assets/img/proxima-logo-dark.png')} style={globalStyles.logo}/>
        <Text style={globalStyles.heading}>welcome to proxima!</Text>
        <AnimatedButton title="awesome!" onPress={() => navigation.navigate('Main')} />
      </SafeAreaView>
    </ImageBackground>
  );
}