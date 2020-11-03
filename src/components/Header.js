import React from 'react'
import { View, Text, Dimensions,TouchableOpacity } from 'react-native'
import Colors from '../common/colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
const screenHeight = Dimensions.get('window').height;
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
export default AppHeader = (props,) => {
    const { drawer, heading, func,navigation ,drawerHide} = props
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
        <View style={{ height: screenHeight / 12, backgroundColor: Colors.primary, flexDirection: "row", }}>
            <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
                {drawer ?
                    <TouchableOpacity  onPress={() => func()}>
                        <MaterialIcons name={"menu"} size={25} style={{ color: Colors.white }} />
                    </TouchableOpacity> :
                    drawerHide?null:<TouchableOpacity 
                    onPress={() => Actions.pop()}
                    >
                        <AntDesign name={"arrowleft"} size={25} style={{ color: Colors.white }} />
                    </TouchableOpacity>
                }
            </View>
            <View style={{ flex: 8, justifyContent: "center", }}>
                <Text style={{ color: Colors.white, fontWeight: "bold" }}>{heading}</Text>
            </View>
            {drawerHide&&<TouchableOpacity 
            onPress={()=>logout()}
            style={{  justifyContent: "center",marginRight:15 }}>
            <AntDesign name={"logout"} size={25} style={{ color: Colors.white }} />
            {/* <AntDesign name="logout" size={20} style={{ color: Colors.primary, fontSize: 25 }} /> */}
            </TouchableOpacity>}
        </View>
    )
}
