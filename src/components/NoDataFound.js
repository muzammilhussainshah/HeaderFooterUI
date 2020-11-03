import React from 'react'
import { View, Dimensions, Image, Text, } from 'react-native'
const screenWidth = Dimensions.get('window').width;
export default NoDataFound = ({local,text}) => {
  return (
    <View style={{ alignItems: "center", width: screenWidth }}>

      {text&&<Text style={{ fontSize: 20 }}>{text}</Text>}
      <Image
        style={{ width: "100%", height: "70%",}}
        resizeMode="contain"
        source={local}
      />
    </View>
  )
}