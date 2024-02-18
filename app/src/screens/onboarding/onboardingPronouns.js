import React, {useContext, useState} from 'react';
import { SafeAreaView, Text, View, Image, ImageBackground, KeyboardAvoidingView, Platform} from 'react-native';
import * as Progress from 'react-native-progress';
import globalStyles from '../../styles/globalStyles';
import AnimatedButton from '../../components/button';
import TextField from '../../components/textfield';
import { createAlert } from '../../../database/authUtil';
import { GlobalUser } from '../../../App';

export default function OnboardingPronounsScreen({ navigation }) {
  const [pronouns, changePronouns] = useState();
  const [myUser, setMyUser] = useContext(GlobalUser);

  async function tryNext() {
    console.log(pronouns);

    if (pronouns != null) {
      await myUser.changeUserPropertyInDatabase("pronouns", pronouns);
      await myUser.changeUserPropertyInDatabase("onbStep", 'Onboarding Quotes');
      navigation.navigate('Onboarding Quotes');
    } else {
      createAlert("Oops!", "Please enter valid pronouns");
    }
  }

  return (
    <ImageBackground source={require('../../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      <SafeAreaView style={[globalStyles.container, {justifyContent:'flex-start'}]}>
        <View style = {{marginTop: 40}}>
          <Progress.Bar progress={0.40} width={200} color={globalStyles.primaryColor}/>
          <Text style={globalStyles.text}>40%</Text>
        </View>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.keyboardAvoidingContainer}>
          <Text style={globalStyles.heading}>my pronouns are</Text>
          <TextField placeholder="pro/nouns" onChange={(e) => changePronouns(e)}/>
          <AnimatedButton title="next" onPress={() => tryNext()}/>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}