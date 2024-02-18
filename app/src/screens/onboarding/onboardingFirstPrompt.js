import React, {useState} from 'react';
import { SafeAreaView, Text, View, Image, ImageBackground, KeyboardAvoidingView, Platform} from 'react-native';
import * as Progress from 'react-native-progress';
import globalStyles from '../../styles/globalStyles';
import AnimatedButton from '../../components/button';
import TextField from '../../components/textfield';
export default function OnboardingFirstPromptScreen({ navigation }) {
  const [answer, changeAnswer] = useState();
  
  function tryNext() {
    console.log(answer);
    if (answer != null) {
      navigation.navigate('Onboarding Second Prompt');
//      navigation.goBack();
    } else {
      alert("Please enter a response!");
    }
  }

  return (
    <ImageBackground source={require('../../../assets/img/background.png')} style={globalStyles.backgroundImage}>

      <SafeAreaView style={[globalStyles.container, {justifyContent:'flex-start'}]}>
        <View style = {{marginTop: 40}}><Progress.Bar progress={0.625} width={200} color={globalStyles.primaryColor}/></View>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.keyboardAvoidingContainer}>
          <Text style={globalStyles.heading}>my top values in a partner are</Text>
          <TextField placeholder="answer" onChange={(e) => changeAnswer(e.nativeEvent.text)}/>
          <AnimatedButton title="Next" onPress={() => tryNext()}/>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}