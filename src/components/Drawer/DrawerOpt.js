import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../../common/colors'
// import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-community/google-signin';

// import { LoginManager } from 'react-native-fbsdk'
import { Actions } from 'react-native-router-flux';
export default DrawerOpt = ({ title, icon, navigation, func }) => {
    const logout = async () => {
        try {
            await AsyncStorage.removeItem("Email");
            //  LoginManager.logOut()
            //  GoogleSignin.revokeAccess();
            //  GoogleSignin.signOut();
            Actions.SignIn()
            // return true;
        }
        catch (exception) {
            // return false;
        }
    }
    return (
        <TouchableOpacity
            onPress={() => title === "Logout" ? logout() : func()}
            style={{ flexDirection: "row", height: 60, alignItems: "center", }}>
            <View style={{ justifyContent: "center", alignItems: "center", margin: 10 }}>
                {icon}
            </View>
            <View style={{ flex: 5 }}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{
                        color: Colors.primary, fontFamily: 'Verdana-Bold',
                    }}>{title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}