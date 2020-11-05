import React, { Component } from 'react';
import { StyleSheet, TextInput,View } from 'react-native';

// import ModalPickerImage from './ModalPickerImage';

export default CustomTextInput = ({ defaultVal,_onNumChange,placeHolder }) => {
    return (
      <View style={{ backgroundColor: "#F2F7FB", width: "73%", height: 50, borderRadius: 15, }}>
                    <TextInput
                    // placeholderStyle={}
                    placeholder={placeHolder}
                        keyboardType="number-pad"
                        style={{ height: "100%", width: "100%",marginLeft:15  }}
                        onChangeText={num => _onNumChange(num)}
                    value={defaultVal}
                    />
                </View>
    );
}

let styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
      paddingTop: 60,
    },
  });

