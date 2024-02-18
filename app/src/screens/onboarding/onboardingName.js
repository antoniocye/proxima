import React, {useState} from 'react';
import { SafeAreaView, Text, View, Image, ImageBackground, KeyboardAvoidingView, Platform} from 'react-native';
import * as Progress from 'react-native-progress';
import globalStyles from '../../styles/globalStyles';
import AnimatedButton from '../../components/button';
import TextField from '../../components/textfield';

export default function OnboardingNameScreen({ navigation }) {
  const [firstName, changeName] = useState();

  function tryNext() {
    console.log(firstName);
    if (firstName != null) {
      navigation.navigate('Onboarding Age');      
    } else {
      alert("Please enter a name");
    }
  }

  return (
    <ImageBackground source={require('../../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      <SafeAreaView style={[globalStyles.container, {justifyContent:'flex-start'}]}>
        <View style = {{marginTop: 40}}><Progress.Bar progress={0} width={200} color={globalStyles.primaryColor}/></View>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.keyboardAvoidingContainer}>
          <Text style={globalStyles.heading}>my name is</Text>
          <TextField placeholder="first name" onChange={(e) => changeName(e.nativeEvent.text)}/>
          <AnimatedButton title="Next" onPress={() => tryNext()}/>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}