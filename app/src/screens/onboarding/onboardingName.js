import React, {useContext, useState} from 'react';
import { SafeAreaView, Text, View, Image, ImageBackground, KeyboardAvoidingView, Platform} from 'react-native';
import * as Progress from 'react-native-progress';
import globalStyles from '../../styles/globalStyles';
import AnimatedButton from '../../components/button';
import TextField from '../../components/textfield';
import { createAlert } from '../../../database/authUtil';
import { GlobalUser } from '../../../App';

export default function OnboardingNameScreen({ navigation }) {
  const [firstName, changeName] = useState();
  const [myUser, setMyUser] = useContext(GlobalUser);

  async function tryNext() {
    console.log(firstName);

    if (firstName != null) {
      await myUser.changeUserPropertyInDatabase("name", firstName);
      await myUser.changeUserPropertyInDatabase("onbStep", 'Onboarding Age');
      navigation.navigate('Onboarding Age');      
    } else {
      createAlert("Oops!", "Please enter a name");
    }
  }

  return (
    <ImageBackground source={require('../../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      <SafeAreaView style={[globalStyles.container, {justifyContent:'flex-start'}]}>
        <View style = {{marginTop: 40}}>
          <Progress.Bar progress={0} width={200} color={globalStyles.primaryColor}/>
          <Text style={globalStyles.text}>0%</Text>
        </View>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.keyboardAvoidingContainer}>
          <Text style={globalStyles.heading}>my name is</Text>
          <TextField placeholder="first name" onChange={(e) => changeName(e)}/>
          <AnimatedButton title="next" onPress={() => tryNext()}/>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}