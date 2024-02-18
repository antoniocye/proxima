import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import globalStyles from '../styles/globalStyles';

const Chip = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={globalStyles.chip}>
      <Text style={globalStyles.chipLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Chip;
