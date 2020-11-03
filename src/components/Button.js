import React from 'react'
import { Text, TouchableOpacity } from 'react-native';
import Colors from '../common/colors';
import styles from './style'

export default Button = ({ label, func,disable,btnColor }) => {
  return (
    <TouchableOpacity
    disabled={disable}
      onPress={() => func()}
      style={[styles.Button,{backgroundColor:disable||btnColor?Colors.secondary:Colors.primary}]}>
      <Text style={{ color: Colors.white, fontWeight: "bold" }}>{label}</Text>
    </TouchableOpacity>
  );
}
