import React, { useState, } from 'react'
import {Dimensions, View, Text,  } from 'react-native';
import { connect } from 'react-redux';
import { _getShops, _loading } from "../../store/action/action";
const screenHeight = Dimensions.get('window').height;
import LinearGradient from 'react-native-linear-gradient' // import LinearGradient
import Colors from '../../common/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Mask from '../../components/Mask';

const SocialSignupForm = ({ navigation,email,routName }) => {
//   let email = navigation.getParam('email',)
//   let routName = navigation.getParam('routName',)
    return (
        <View style={{ height: screenHeight - 25 }}>
            <View style={{ flex: 2, backgroundColor: "green", }}>
                <LinearGradient
                    colors={[Colors.primary, '#E14F32']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 2, y: 1 }}
                    style={{
                        height: "100%",
                        padding: 15, alignItems: "center"
                    }}
                >
                    <Text style={{ marginTop: 15, color: Colors.white, fontSize: 32 }}>Welcome</Text>
                    <Text style={{ marginTop: 15, color: Colors.white, }}>please provide you contact details</Text>
                </LinearGradient>
            </View>
            <View style={{ backgroundColor: "white", flex: 3, justifyContent: "flex-end", alignItems: "center" }}>
                <View>
                    {/* <Text style={{ fontWeight: "bold" }}>Verify Code</Text> */}
                </View>
            </View>
            {/* MASK */}
            <Mask SignInData={[
                {
                    id: 0,
                    label: 'Full Name',
                    icon: <AntDesign name="user" size={20} style={{ color: Colors.primary, }} />,
                },
                {
                    id: 1,
                    label: 'Phone',
                    icon: <AntDesign name="phone" size={20} style={{ color: Colors.primary, }} />
                },
                {
                    id: 2,
                    label: 'Business Name',
                    icon: <FontAwesome5 name="shopping-basket" size={20} style={{ color: Colors.primary, }} />
                },
                {
                    id: 3,
                    label: 'Description',
                    icon: <MaterialIcons name="description" size={20} style={{ color: Colors.primary, }} />
                },
                {
                    id: 4,
                    label: 'Address',
                    icon: <FontAwesome5 name="address-card" size={20} style={{ color: Colors.primary, }} />
                },
            ]} navigation={navigation} route="Social" maskHeight={250} button={"Submit"} nextRout={routName} email={email} />
            {/* MASK */}
        </View>
    );
}

function mapStateToProp(state) {
    return ({
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        _getShops: (obj) => {
            dispatch(_getShops(obj));
        },
        _loading: (bol) => {
            dispatch(_loading(bol));
        },
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(SocialSignupForm);