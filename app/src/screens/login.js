import React from 'react';
import { View, Text, ImageBackground, Image} from 'react-native';
import globalStyles from '../styles/globalStyles';
import AnimatedButton from '../components/button';
import TextField from '../components/textfield';
import PasswordField from '../components/passwordfield';
export default function LoginScreen({ navigation }) {
  // Access passed data using route.params
  return (
    <ImageBackground source={require('../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      <View style={globalStyles.container}>
        <Image source={require('../../assets/img/proxima-logo-dark.png')} style={globalStyles.logo}/>
        <Text style={globalStyles.heading}>log in</Text>
        <TextField placeholder="email" onSubmitEditing={(e) => console.log(e.nativeEvent.text)}/>
        <PasswordField placeholder="password" onSubmitEditing={(e) => console.log(e.nativeEvent.text)}/>
        <AnimatedButton title="continue"/>
      </View>
    </ImageBackground>
  );
}