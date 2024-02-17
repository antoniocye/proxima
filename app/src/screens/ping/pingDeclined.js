import React from 'react';
import { SafeAreaView, Text, Image, ImageBackground, KeyboardAvoidingView, Platform} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import AnimatedButton from '../../components/button';
export default function PingDeclinedScreen({ route, navigation }) {

  return (
    <ImageBackground source={require('../../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      <SafeAreaView style={globalStyles.container}>
          <Text style={globalStyles.heading}>awww, what a bummer :(</Text>
          <Text style={globalStyles.text}>we haven't revealed any information to your match. keep exploring and you could get some more</Text>
          <AnimatedButton title="sounds good!" onPress={() => navigation.popToTop()}/>
      </SafeAreaView>
    </ImageBackground>
  );
}