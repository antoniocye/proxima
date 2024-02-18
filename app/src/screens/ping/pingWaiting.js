import React, {useState, useEffect} from 'react';
import { SafeAreaView, Text, Image, ImageBackground, ActivityIndicator } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import AnimatedButton from '../../components/button';
export default function PingDeclinedScreen({ route, navigation }) {
  const { user_id } = route.params;

  // placeholder function
  async function waitForThreeSeconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('');
      }, 3000); // 3000 milliseconds = 3 seconds
    });
  }

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getMatchInfo = async () => {
      const result = await waitForThreeSeconds();
      setMessage(result);
      setIsLoading(false);
    };

    getMatchInfo();
  }, []);

  return (
    <ImageBackground source={require('../../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      <SafeAreaView style={globalStyles.container}>
          <Text style={globalStyles.heading}>hold tight!</Text>
          <Text style={globalStyles.text}>we're waiting on your partner, we'll let you know when they're ready</Text>
          {isLoading && <ActivityIndicator size="large" color={globalStyles.primaryColor} style={{padding: 20}}/>}
          {!isLoading && <AnimatedButton title="i can't wait!" onPress={() => navigation.navigate("Ping Result", {user_id, message})}/>}
      </SafeAreaView>
    </ImageBackground>
  );
}