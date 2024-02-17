import React from 'react';
import { Text, ImageBackground, Image, SafeAreaView} from 'react-native';
import globalStyles from '../styles/globalStyles';
import AnimatedButton from '../components/button';
import TextField from '../components/textfield';
import PasswordField from '../components/passwordfield';
export default function SignupScreen({ navigation }) {
  // Access passed data using route.params
  return (
    <ImageBackground source={require('../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      <SafeAreaView style={globalStyles.container}>
        {/* <Image source={require('../../assets/img/proxima-logo-dark.png')} style={globalStyles.logo}/> */}
        <Text style={globalStyles.heading}>create an account</Text>
        <TextField placeholder="email" onSubmitEditing={(e) => console.log(e.nativeEvent.text)}/>
        <PasswordField placeholder="password" onSubmitEditing={(e) => console.log(e.nativeEvent.text)}/>
        <PasswordField placeholder="confirm password" onSubmitEditing={(e) => console.log(e.nativeEvent.text)}/>
        <AnimatedButton title="continue"/>
      </SafeAreaView>
    </ImageBackground>
  );
}