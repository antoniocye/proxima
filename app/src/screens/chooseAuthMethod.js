import React, { useState, useContext, useEffect } from 'react';
import { View, Text, ImageBackground, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import globalStyles from '../styles/globalStyles';
import AnimatedButton from '../components/button';

export default function ChooseAuthMethodScreen({ navigation }) {
  return (
    <ImageBackground source={require('../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      <SafeAreaView style={globalStyles.container}>
          <Image source={require('../../assets/img/proxima-logo-dark.png')} style={globalStyles.logo}/>

          <Text style={globalStyles.heading}>join us!</Text>

            <View style={{ marginTop: 40 }}>
              <AnimatedButton onPress={() => {navigation.navigate("Sign Up")}} title="create account"/>
              <AnimatedButton onPress={() => {navigation.navigate("Login")}} title="log in"/>
            </View>
         
        </SafeAreaView>
    </ImageBackground>
  );
}