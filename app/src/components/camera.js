import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';
import AnimatedButton from './button';

export default function CameraView() {
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }


  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <MaterialIcons name="flip-camera-ios" size={24} color={globalStyles.primaryColor} />
          </TouchableOpacity>
        </View>
      </Camera>
      <AnimatedButton title="confirm" onPress={() => console.log('selfie taken')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    minWidth: '90%',
    maxHeight: 400,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 20,
    borderWidth: 2,
    borderColor: globalStyles.primaryColor,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 20,
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor:'rgba(255,255,255,0.3)',
    padding: 20,
    borderRadius: 10,
  }
});
