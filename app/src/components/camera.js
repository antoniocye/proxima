import { Camera, CameraType } from "expo-camera";
import { useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import globalStyles from "../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import AnimatedButton from "./button";
import cameraStyles from "../styles/cameraStyles";

export default function CameraView({ afterPhotoTaken }) {
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  function takePicture() {
    if (cameraRef.current) {
      cameraRef.current.takePictureAsync().then((photo) => {
        // Save the photo to a file or process it further
        cameraRef.current.pausePreview();
        console.log("Photo taken:", photo);
        afterPhotoTaken();
      });
    }
  }

  const cameraRef = useRef(null);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={cameraStyles.container}>
      {!permission && (
        <>
          <View style={cameraStyles.container}>
            <ActivityIndicator size="large" />
          </View>
        </>
      )}
      {permission && !permission.granted && (
        <>
          <View style={cameraStyles.container}>
            <Text style={{ textAlign: "center" }}>
              We need your permission to show the camera
            </Text>
            <Button onPress={requestPermission} title="grant permission" />
          </View>
        </>
      )}
      {permission && permission.granted && (
        <>
          <Camera ref={cameraRef} style={cameraStyles.camera} type={type}>
            <View style={cameraStyles.buttonContainer}>
              <TouchableOpacity
                style={cameraStyles.button}
                onPress={toggleCameraType}
              >
                <MaterialIcons
                  name="flip-camera-ios"
                  size={24}
                  color={globalStyles.backgroundColor}
                />
              </TouchableOpacity>
            </View>
          </Camera>
          <AnimatedButton icon="camera-alt" onPress={takePicture} />
        </>
      )}
    </View>
  );
}
