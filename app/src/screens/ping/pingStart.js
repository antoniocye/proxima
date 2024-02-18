import React from 'react';
import { SafeAreaView, Text, Image, ImageBackground, KeyboardAvoidingView, Platform} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import AnimatedButton from '../../components/button';
export default function PingStartScreen({ route, navigation }) {

  const { user_id } = route.params;

  return (
    <ImageBackground source={require('../../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      <SafeAreaView style={globalStyles.container}>
        <Image source={require('../../../assets/img/proxima-logo-dark.png')} style={globalStyles.logo}/>
          <Text style={globalStyles.heading}>two stars collide!</Text>
          <Text style={globalStyles.text}>someone who you matched with is nearby!</Text>
          <AnimatedButton title="cool!" onPress={() => navigation.navigate("Ping Decision", {user_id})}/>
      </SafeAreaView>
    </ImageBackground>
  );
}