import React from 'react';
import { SafeAreaView, Text, View, Image, ImageBackground, KeyboardAvoidingView, Platform} from 'react-native';
import * as Progress from 'react-native-progress';
import globalStyles from '../../styles/globalStyles';
import AnimatedButton from '../../components/button';
import TextField from '../../components/textfield';
export default function OnboardingPreferredGenderScreen({ navigation }) {
  return (
    <ImageBackground source={require('../../../assets/img/background.png')} style={globalStyles.backgroundImage}>

      <SafeAreaView style={[globalStyles.container, {justifyContent:'flex-start'}]}>
        <View style = {{marginTop: 40}}><Progress.Bar progress={0.375} width={200} color={globalStyles.primaryColor}/></View>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.keyboardAvoidingContainer}>
          <Text style={globalStyles.heading}>show me</Text>
          <AnimatedButton title="men" onPress={() => navigation.navigate("Onboarding Passions")}/>
          <AnimatedButton title="women" onPress={() => navigation.navigate("Onboarding Passions")}/>
          <AnimatedButton title="everyone" onPress={() => navigation.navigate("Onboarding Passions")}/>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}