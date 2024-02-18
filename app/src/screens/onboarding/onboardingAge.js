import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, ImageBackground, KeyboardAvoidingView, Platform} from 'react-native';
import * as Progress from 'react-native-progress';
import globalStyles from '../../styles/globalStyles';
import AnimatedButton from '../../components/button';
import TextField from '../../components/textfield';
export default function OnboardingAgeScreen({ navigation }) {
  const [age, changeAge] = useState();
  
  function tryNext() {
    console.log(age);
    if (age != null) {
      navigation.navigate('Onboarding School');
    } else {
      alert("Please enter an age");
    }
  }

  return (
    <ImageBackground source={require('../../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      <SafeAreaView style={[globalStyles.container, {justifyContent:'flex-start'}]}>
        <View style = {{marginTop: 40}}><Progress.Bar progress={0.125} width={200} color={globalStyles.primaryColor}/></View>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.keyboardAvoidingContainer}>
          <Text style={globalStyles.heading}>my age is</Text>
          <TextField placeholder="age" keyboardType="number-pad" onChange={(e) => changeAge(e.nativeEvent.text)}/>
          <AnimatedButton title="Next" onPress={() => tryNext()}/>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}