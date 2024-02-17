import React from 'react';
import { View, Text, TextInput, ImageBackground} from 'react-native';
import globalStyles from '../styles/globalStyles';
import AnimatedButton from '../components/button';
import TextField from '../components/textfield';
export default function DetailsScreen({ navigation }) {
  // Access passed data using route.params
  return (
    <ImageBackground source={require('../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.heading}>details</Text>
        <Text style={globalStyles.text}>view your details here</Text>
        <TextField placeholder="enter your details" onSubmitEditing={(e) => console.log(e.nativeEvent.text)}/>
        <AnimatedButton title="continue"/>
      </View>
    </ImageBackground>
  );
}