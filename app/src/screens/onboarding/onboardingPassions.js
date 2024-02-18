import React, {useState} from 'react';
import { SafeAreaView, Text, View, Image, ImageBackground, KeyboardAvoidingView, Platform} from 'react-native';
import * as Progress from 'react-native-progress';
import globalStyles from '../../styles/globalStyles';
import AnimatedButton from '../../components/button';
import TextField from '../../components/textfield';
export default function OnboardingPassionsScreen({ navigation }) {
  return (
    <ImageBackground source={require('../../../assets/img/background.png')} style={globalStyles.backgroundImage}>

      <SafeAreaView style={[globalStyles.container, {justifyContent:'flex-start'}]}>
        <View style = {{marginTop: 40}}><Progress.Bar progress={0.5} width={200} color={globalStyles.primaryColor}/></View>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.keyboardAvoidingContainer}>
          <Text style={globalStyles.heading}>i'm passionate about...</Text>
          <AnimatedButton title="Next" onPress={() => navigation.navigate("Onboarding First Prompt")}/>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}