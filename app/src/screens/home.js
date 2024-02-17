import React from 'react';
import { View, Button, Text, Pressable, ImageBackground } from 'react-native';
import globalStyles from '../styles/globalStyles';
import CustomButton from '../components/button';
import AnimatedButton from '../components/button';

export default function HomeScreen({ navigation , onLayoutRootView}) {
  return (
    <View style={globalStyles.backgroundImage} onLayout={onLayoutRootView}>
      <ImageBackground source={require('../../assets/img/background.png')} style={globalStyles.backgroundImage}>
        <View style={globalStyles.container}>
          <Text style={globalStyles.heading}>pick a page</Text>
          <Text style={globalStyles.text}>experiment with ultra-custom designed user experiences that can enable new levels of customer satisfaction</Text>
          <AnimatedButton title="details" onPress={() => navigation.navigate('Details')} />
          <AnimatedButton title="login" onPress={() => navigation.navigate('Login')} />
          <AnimatedButton title="sign up" onPress={() => navigation.navigate('Sign Up')} />
        </View>
      </ImageBackground>

    </View>
  );
}