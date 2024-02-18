import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import captionImageStyles from '../styles/captionImageStyles';

const CaptionImage = ({ imageSource, caption }) => {
  return (
    <View style={captionImageStyles.container}>
      <Image source={imageSource} style={captionImageStyles.image} />
      <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']} style={captionImageStyles.captionContainer}>
        <Text style={captionImageStyles.caption}>{caption}</Text>
      </LinearGradient>
    </View>
  );
};

export default CaptionImage;