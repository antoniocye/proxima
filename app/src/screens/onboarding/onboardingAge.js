import React, { useState, useContext } from 'react';
import { SafeAreaView, Text, View, Image, ImageBackground, KeyboardAvoidingView, Platform} from 'react-native';
import * as Progress from 'react-native-progress';
import globalStyles from '../../styles/globalStyles';
import AnimatedButton from '../../components/button';
import TextField from '../../components/textfield';
import { GlobalUser } from '../../../App';
import { createAlert } from '../../../database/authUtil';



export default function OnboardingAgeScreen({ navigation }) {
  const [age, changeAge] = useState();
  const [myUser, setMyUser] = useContext(GlobalUser);
  
  async function tryNext() {
    console.log(age);
    if (age != null && age > 17) {
      await myUser.changeUserPropertyInDatabase("age", age);
      await myUser.changeUserPropertyInDatabase("onbStep", 'Onboarding Pronouns');
      navigation.navigate('Onboarding Pronouns');
    } else if (age != null) {
      createAlert("Oops!", "No minors allowed here!");
    } else {
      createAlert("Oops!", "Please enter an age");
    }
  }

  return (
    <ImageBackground source={require('../../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      <SafeAreaView style={[globalStyles.container, {justifyContent:'flex-start'}]}>
        <View style = {{marginTop: 40}}>
          <Progress.Bar progress={0.20} width={200} color={globalStyles.primaryColor}/>
          <Text style={globalStyles.text}>20%</Text>
        </View>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.keyboardAvoidingContainer}>
          <Text style={globalStyles.heading}>my age is</Text>
          <TextField placeholder="age" keyboardType="number-pad" onChange={(e) => changeAge(e)}/>
          <AnimatedButton title="next" onPress={() => tryNext()}/>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}