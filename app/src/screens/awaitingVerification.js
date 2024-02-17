import React from 'react';
import { SafeAreaView, Text, Image, ImageBackground, KeyboardAvoidingView, Platform, ActivityIndicator} from 'react-native';
import globalStyles from '../styles/globalStyles';
import AnimatedButton from '../components/button';
import TextField from '../components/textfield';
export default function AwaitingVerificationScreen({ navigation }) {
  
  // placeholder function
  async function waitForThreeSeconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 3000); // 3000 milliseconds = 3 seconds
    });
  }

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const wait = async () => {
      const result = await waitForThreeSeconds();
      setMessage(result);
      setIsLoading(false);
    };

    wait();
    navigation.navigate('Home');
  }, []);

  return (
    <ImageBackground source={require('../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      <SafeAreaView style={globalStyles.container}>
        <Text style={globalStyles.heading}>hold your horses</Text>
        <Text style={globalStyles.text}>check your email for a verification code!</Text>
        <ActivityIndicator size="large" color={globalStyles.primaryColor} style={{padding: 20}}/>
      </SafeAreaView>
    </ImageBackground>
  );
}