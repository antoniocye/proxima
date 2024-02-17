import React from 'react';
import { SafeAreaView, Text, Image, ImageBackground, KeyboardAvoidingView, Platform} from 'react-native';
import globalStyles from '../styles/globalStyles';
import AnimatedButton from '../components/button';
import TextField from '../components/textfield';
export default function DetailsScreen({ navigation }) {
  return (
    <ImageBackground source={require('../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      <SafeAreaView style={globalStyles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.keyboardAvoidingContainer}>
          <Image source={require('../../assets/img/proxima-logo-dark.png')} style={globalStyles.logo}/>
          <Text style={globalStyles.heading}>details</Text>
          <Text style={globalStyles.text}>view your details here</Text>
          <TextField placeholder="enter your details" onSubmitEditing={(e) => console.log(e.nativeEvent.text)}/>
          <TextField placeholder="enter some more here" onSubmitEditing={(e) => console.log(e.nativeEvent.text)}/>
          <TextField placeholder="we aren't stopping yet!" onSubmitEditing={(e) => console.log(e.nativeEvent.text)}/>
          <AnimatedButton title="go back" onPress={() => navigation.goBack()}/>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}