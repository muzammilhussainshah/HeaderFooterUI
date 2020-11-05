import React, { useState, useEffect } from 'react'
import { Dimensions, View, Text, Image, TextInput, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import CustomButton from '../../component/CustomButton';
import CustomTextInput from '../../component/CustomTextInput';
import CountryCodePicker from '../../component/CountryCodePicker';
import {Actions} from 'react-native-router-flux';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').screenWidth;


const SignIn = ({ imgPath,dialCode}) => {
    const [phoneNumber, setPhoneNumber] = useState("3472076097");

    return (
        <ScrollView contentContainerStyle={{}}>


            <View style={{ height: screenHeight / 3, justifyContent: "flex-end" }}>
                <Image
                    style={{ width: screenWidth, height: screenHeight / 3 }}
                    resizeMode="stretch"
                    source={require('../../assets/logoWithLayer.png')}
                />
                <Image
                    style={{ width: "70%", position: "absolute", alignSelf: "center", }}
                    resizeMode="contain"
                    source={require('../../assets/logo.png')}
                />

            </View>
            <View style={{ height: screenHeight / 2,justifyContent: "center", alignItems: "center" }}>
                <Image
                    style={{ width: 20,height:50, }}
                    resizeMode="contain"
                    source={require('../../assets/smartphone.png')}
                />
                <Text style={{ fontWeight: "bold", fontSize: 25 }}>{`Login with Phone`}</Text>
                <Text style={{ textAlign: "center", width: "70%", color: "grey", marginTop: 20,fontSize: 12 }}>{`Please enter your phone number. We will send verification code on your phone number`}</Text>
                <View style={{ marginTop: 20, width: "90%", flexDirection:"row",justifyContent:"space-between"}}>
                    <CountryCodePicker  imgPath={imgPath} dialCode={dialCode}/>
                    <CustomTextInput placeHolder={`Phone number`} defaultVal={phoneNumber} _onNumChange={(num) => setPhoneNumber(num)} />
                    {/* <CustomTextInput  /> */}
                </View>
            </View>
            <View style={{ height: screenHeight / 8, alignItems: "center" }}>
                <CustomButton label={"Send OTP"} _login={()=>Actions.Home()} />
            </View>
        </ScrollView>

    );
}

function mapStateToProp(state) {
    return ({
    })
}
function mapDispatchToProp(dispatch) {
    return ({
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(SignIn);