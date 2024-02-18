import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, ImageBackground, KeyboardAvoidingView, Platform} from 'react-native';
import * as Progress from 'react-native-progress';
import globalStyles from '../../styles/globalStyles';
import AnimatedButton from '../../components/button';
import TextField from '../../components/textfield';
export default function OnboardingSchoolScreen({ navigation }) {
  const [school, changeSchool] = useState();
  
  function tryNext() {
    console.log(school);
    if (school != null) {
      navigation.navigate('Onboarding Preferred Gender');
    } else {
      alert("Please enter a school");
    }
  }

  return (
    <ImageBackground source={require('../../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      <SafeAreaView style={[globalStyles.container, {justifyContent:'flex-start'}]}>
        <View style = {{marginTop: 40}}><Progress.Bar progress={0.25} width={200} color={globalStyles.primaryColor}/></View>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.keyboardAvoidingContainer}>
          <Text style={globalStyles.heading}>i go to school at</Text>
          <TextField placeholder="school" onChange={(e) => changeSchool(e.nativeEvent.text)}/>
          <AnimatedButton title="Next" onPress={() => tryNext()}/>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}