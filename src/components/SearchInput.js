import React from 'react';
import { TextInput, View, } from 'react-native';
import Colors from '../common/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default SearchInput = () => {
  return (
    <View style={{ 
      elevation:2,
      height: 40,flexDirection:"row",backgroundColor:"#e8e6e7", borderRadius: 5, width: "95%" }}>
      <View style={{flex:1.5,justifyContent:"center",alignItems:"center"}}>
        <MaterialIcons name={"search"} size={22} style={{color:Colors.primary}} />
      </View>
      <View style={{flex:8.5,}}>
         <TextInput
        placeholder="Enter Poscode or City..."
        placeholderTextColor={Colors.primary}
        inlineImageLeft='search_icon'
      // onChangeText={text => onChangeText(text)}
      // value={value}
      />
      </View>
    </View>
  )
}