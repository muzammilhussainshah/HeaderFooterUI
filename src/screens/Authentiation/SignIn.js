import React, { useState, useEffect } from 'react'
import { Dimensions, View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import CustomButton from '../../component/CustomButton';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').screenWidth;


const SignIn = ({ }) => {
    return (
        <View style={{ flex: 1, backgroundColor: "red" }}>

            <View style={{ flex: 3, backgroundColor: "blue", justifyContent: "flex-end" }}>
                <Image
                    style={{ width: screenWidth, flex: 1 }}
                    resizeMode="stretch"
                    source={require('../../assets/logoWithLayer.png')}
                />
                <Image
                    style={{ width: "70%", position: "absolute", alignSelf: "center", }}
                    resizeMode="contain"
                    source={require('../../assets/logo.png')}
                />

            </View>
            <View style={{ flex: 5, backgroundColor: "green", justifyContent: "flex-end",alignItems:"center" }}>
                <Image
                    style={{ width: 25, }}
                    resizeMode="contain"
                    source={require('../../assets/smartphone.png')}
                />
            <Text style={{  fontWeight: "bold", fontSize: 30 }}>{`Login with Phone`}</Text>
            <Text style={{textAlign:"center",width:"80%",color:"#15132E",marginTop:20   }}>{`Please enter your phone number. We will send verification code on your phone number`}</Text>

            </View>
            <View style={{ flex: 2, backgroundColor: "yellow", justifyContent: "center", alignItems: "center" }}>
                <CustomButton label={"Send OTP"} />
            </View>
        </View>
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