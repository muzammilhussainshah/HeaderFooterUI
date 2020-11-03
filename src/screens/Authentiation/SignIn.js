import React, { useState, useEffect } from 'react'
import { Dimensions, View, Text, TouchableOpacity, Image, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { _getShops, _loading, _signInFacebook, checkUser, saveCurrentUserInStore } from "../../store/action/action";
const screenHeight = Dimensions.get('window').height;
import LinearGradient from 'react-native-linear-gradient' // import LinearGradient
import Colors from '../../common/colors';
import Mask from '../../components/Mask';
import { SignInData, } from '../Authentiation/SignInData';
import AsyncStorage from '@react-native-community/async-storage';
// import { LoginManager, LoginButton, AccessToken } from "react-native-fbsdk";
// import {
//     GoogleSignin,
//     GoogleSigninButton,
//     statusCodes,
//   } from '@react-native-community/google-signin';
import { Actions } from 'react-native-router-flux';
const SignIn = ({ navigation, _signInFacebook, checkUser, saveCurrentUserInStore }) => {
    const getData = async () => {
        try {
            console.log(await AsyncStorage.getItem('subscriptionExpiry'),"aaa")
            const Email = await AsyncStorage.getItem('Email')
            const userRole = await AsyncStorage.getItem('userRole')
            const subscriptionExpiry = await AsyncStorage.getItem('subscriptionExpiry')
            const fullName = await AsyncStorage.getItem('fullName')
            const phoneNumber = await AsyncStorage.getItem('phoneNumber')
            const currentUserUid = await AsyncStorage.getItem('currentUserUid')
            const freeTrialUsed = await AsyncStorage.getItem('freeTrialUsed')
            console.log(Email,freeTrialUsed, "UserName", phoneNumber, fullName, userRole, currentUserUid)
            if (Email && userRole === "User") {
                saveCurrentUserInStore({ Email, userRole, fullName, phoneNumber,subscriptionExpiry, currentUserUid,freeTrialUsed })
                Actions.Home()
            }
            else if (Email && userRole === "Barber" ) {
                console.log(subscriptionExpiry,"subscriptionExpiry",Date.now())
                saveCurrentUserInStore({ Email, userRole, fullName, phoneNumber,freeTrialUsed,subscriptionExpiry, currentUserUid })
                if (subscriptionExpiry > Date.now()) {
                    Actions.BarberHome()
                }
                else {
                    Actions.Subscription()
                }
            }
        } catch (e) {
        }
    }
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        // GoogleSignin.configure({
        //     scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        //     webClientId: '894934583471-e9t5brmavlimh5g4onn9i4jrto51khr9.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        //     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        //     // hostedDomain: '', // specifies a hosted domain restriction
        //     // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
        //     forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        //     // accountName: '', // [Android] specifies an account name on the device that should be used
        //     // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        //   });



        getData()
        return () => { BackHandler.removeEventListener('hardwareBackPress', onBackPress); }
    }, []);
    function onBackPress() {
        console.log(Actions,"Actions",Actions.prevScene)
        if (Actions.state.index === 0||Actions.prevScene==="SignIn") {
            BackHandler.exitApp()
            return false;
        }
        Actions.pop();
        return true;
    }

    // const signIn = async () => {
    //     try {
    //       await GoogleSignin.hasPlayServices();
    //       const userInfo = await GoogleSignin.signIn();
    //       checkUser(userInfo.user.email,navigation)
    //     } catch (error) {
    //       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //         // user cancelled the login flow
    //       } else if (error.code === statusCodes.IN_PROGRESS) {
    //         // operation (e.g. sign in) is in progress already
    //       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //         // play services not available or outdated
    //       } else {
    //         // some other error happened
    //       }
    //     }
    //   };

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
                    <Text style={{ marginTop: 15, color: Colors.white, }}>Signin to continue</Text>
                </LinearGradient>
            </View>
            <View style={{ backgroundColor: "white", flex: 3, justifyContent: "flex-end", alignItems: "center" }}>
                {/* <View>
                    <Text style={{ fontWeight: "bold" }}>Or signup with</Text>
                </View>
                <View style={{ flexDirection: "row",}}>
                    <TouchableOpacity 
                    onPress={()=>_signInFacebook(navigation)}
                    style={{ flex: 1, alignItems: "flex-end" }}>
                        <Image resizeMode={"contain"} style={{
                            height: 50, width: 160
                        }}
                            source={require('../../assets/facebook1.png')}
                        />

                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>signIn(navigation)}
                    style={{ flex: 1, alignItems: "flex-start" }}>
                        <Image resizeMode={"contain"} style={{
                            height: 50, width: 160
                        }}
                            source={require('../../assets/goolge1.png')}
                        />
                    </TouchableOpacity>
                </View> */}
            </View>
            {/* MASK */}

            <Mask SignInData={[SignInData[1], SignInData[3]]} route="Login" />
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
        _signInFacebook: (navigation) => {
            dispatch(_signInFacebook(navigation));
        },
        checkUser: (email, navigation) => {
            dispatch(checkUser(email, navigation));
        },
        saveCurrentUserInStore: (user) => {
            dispatch(saveCurrentUserInStore(user));
        },
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(SignIn);