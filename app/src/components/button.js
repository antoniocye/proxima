import React, { useState } from 'react';
import { Animated, Text, TouchableWithoutFeedback } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';


const AnimatedButton = ({ onPress, title=null, icon=null}) => {
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [globalStyles.primaryColor, globalStyles.secondaryColor],
  });

  const handlePressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}>
      <Animated.View style={[globalStyles.button, {backgroundColor}, icon && {maxWidth: 70, minWidth: 70}]}>
        {title && <Text style={globalStyles.buttonLabel}>{title}</Text>}
        {icon && <MaterialIcons name={icon} size={30} color={globalStyles.backgroundColor} />}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default AnimatedButton;