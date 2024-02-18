import React, {useContext, useState} from 'react';
import { SafeAreaView, Text, View, Image, ImageBackground, KeyboardAvoidingView, Platform} from 'react-native';
import * as Progress from 'react-native-progress';
import globalStyles from '../../styles/globalStyles';
import AnimatedButton from '../../components/button';
import TextField from '../../components/textfield';
import { createAlert } from '../../../database/authUtil';
import { GlobalUser } from '../../../App';

export default function OnboardingQuotesScreen({ navigation }) {
  const [quotes, changeQuotes] = useState();
  const [quotes2, changeQuotes2] = useState();
  const [myUser, setMyUser] = useContext(GlobalUser);

  async function tryNext() {
    console.log(quotes, quotes2);

    if (quotes != null && quotes2 != null) {
      let twoQuotes = [quotes, quotes2];
      await myUser.changeUserPropertyInDatabase("quotes", twoQuotes);
      await myUser.changeUserPropertyInDatabase("onbStep", 'Add Photos');
      navigation.navigate('Add Photos');
    } else {
      createAlert("Oops!", "Please enter valid quotes");
    }
  }

  return (
    <ImageBackground source={require('../../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      <SafeAreaView style={[globalStyles.container, {justifyContent:'flex-start'}]}>
        <View style = {{marginTop: 40}}>
          <Progress.Bar progress={0.60} width={200} color={globalStyles.primaryColor}/>
          <Text style={globalStyles.text}>60%</Text>
        </View>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.keyboardAvoidingContainer}>
          <Text style={globalStyles.heading}>tell us about yourself</Text>
          <TextField placeholder="what makes you tick?" onChange={(e) => changeQuotes(e)}/>
          <TextField placeholder="favorite food? place? song?" onChange={(e) => changeQuotes2(e)}/>
          <AnimatedButton title="next" onPress={() => tryNext()}/>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}