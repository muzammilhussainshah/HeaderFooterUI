import React from 'react'
import {  Dimensions, View, Text, TouchableOpacity, Image,  } from 'react-native';
import { connect } from 'react-redux';
import { _getShops, _loading,_signInFacebook } from "../../store/action/action";
const screenHeight = Dimensions.get('window').height;
import LinearGradient from 'react-native-linear-gradient' // import LinearGradient
import Colors from '../../common/colors';
import Mask from '../../components/Mask';
import {SignInData} from './SignInData';

const SignUp = ({navigation,_signInFacebook}) => {
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
                    <Text style={{ marginTop: 10, color: Colors.white, fontSize: 32 }}>Welcome</Text>
                    <Text style={{ marginTop: 10, color: Colors.white, }}>Signup to continue</Text>
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
                    <TouchableOpacity style={{ flex: 1, alignItems: "flex-start" }}>
                        <Image resizeMode={"contain"} style={{
                            height: 50, width: 160
                        }}
                            source={require('../../assets/goolge1.png')}
                        />
                    </TouchableOpacity>
                </View> */}
            </View>
            {/* MASK */}
            <Mask SignInData={SignInData} maskHeight={250} navigation={navigation}route="Signup" />
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
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(SignUp);