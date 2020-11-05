// import React, { Component } from 'react';
// import { StyleSheet, TextInput,View } from 'react-native';

// import PhoneInput from 'react-native-phone-input';
// // import ModalPickerImage from './ModalPickerImage';

// export default CustomTextInput = ({ defaultVal,_onNumChange,placeHolder }) => {
//     return (
//       <View style={{ backgroundColor: "#F2F7FB", width: "80%", height: 60, borderRadius: 15,padding:5 }}>
//                     <TextInput
//                     // placeholderStyle={}
//                     placeholder={placeHolder}
//                         keyboardType="number-pad"
//                         style={{ height: "100%", width: "100%",  }}
//                         onChangeText={num => _onNumChange(num)}
//                     value={defaultVal}
//                     />
//                 </View>
//     );
// }

// let styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: 'center',
//       padding: 20,
//       paddingTop: 60,
//     },
//   });


import React, { Component } from "react";
import {
  View, StyleSheet,
  TouchableOpacity,
  Text, TextInput, Image
} from 'react-native';
import FlagsImg from './flagsImages'
import { Actions } from 'react-native-router-flux'

class CountryCodePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialCode: "1",
      imgPath: require(`../services/resources/flags/images/us.png`),
    };
  }

  changePhoneCode() {
    // this.props.navigate.navigate("CountryLists")
    Actions.CountryLists()


  }

  componentWillMount() {
    const { imgPath,dialCode } = this.props;
    if(imgPath)this.setState({imgPath,dialCode})
  }
  updatePhoneNumber(phoneNumber) {
    this.setState({ phoneNumber })
  }

  render() {
    let { dialCode, phoneNumber, imgPath } = this.state
    return (
    
            <TouchableOpacity
              onPress={() => {
                this.changePhoneCode()
              }}
              style={{flexDirection:"row",width:"25%",padding:15,backgroundColor:"#FFFFFF",borderColor:"grey",borderWidth:0.2,borderRadius:15, height:50,justifyContent:"space-around",alignItems:"center"}}
            >
              <FlagsImg height={20} width={20} imgPath={imgPath} />
                <Text style={{ fontWeight: "bold" }}>{"+" + dialCode}</Text>
            </TouchableOpacity>
    );
  }
}

export default CountryCodePicker

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    marginTop: 20,
    backgroundColor: "red",
    borderRadius: 10
  },
  mainInputContainer: {
    borderRightColor: "#E4E5EA",
    borderRightWidth: 0.5,
    flex: 1.5,
    flexDirection: "row",
  },
  flagContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputNumber: {
    backgroundColor: "#F6F7FB",
    flex: 6,
    flexDirection: "row"
  },
  countryCode: {
    flex: 1.5,
    marginLeft: 5,
    borderColor: 'gray',
    backgroundColor: "#F6F7FB",
    justifyContent: "center",
    alignItems: "center"
  },
  countryCodeChild: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  inputNumberValue: {
    flex: 4,
    borderColor: 'gray',
    backgroundColor: "#F6F7FB",
    justifyContent: "center",
    alignItems: "center"
  },
  cancleNumberContainer: {
    flex: 0.8,
    width: "100%",
    backgroundColor:"red",
    justifyContent: "center",
    alignItems: "center",
  },
})

