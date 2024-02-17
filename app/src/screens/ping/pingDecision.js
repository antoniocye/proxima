import React from 'react';
import { SafeAreaView, Text, Image, ImageBackground, KeyboardAvoidingView, Platform} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import AnimatedButton from '../../components/button';
export default function PingDecisionScreen({ route, navigation }) {
  const { user_id } = route.params;

  return (
    <ImageBackground source={require('../../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      <SafeAreaView style={globalStyles.container}>
          <Text style={globalStyles.heading}>fancy a face-to-face?</Text>
          <Text style={globalStyles.text}>if you and your match want to meet up, we’ll set you up. if you don’t, no worries! we won’t reveal any information to them.</Text>
          <AnimatedButton title="i can't wait!" onPress={() => navigation.navigate("Ping Verification", {user_id})}/>
          <AnimatedButton title="another time :(" onPress={() => navigation.navigate("Ping Declined")}/>
      </SafeAreaView>
    </ImageBackground>
  );
}