import React, { useState, } from 'react'
import { ScrollView, Dimensions, View, Text, TouchableOpacity, FlatList, ActivityIndicator, } from 'react-native';
import { connect } from 'react-redux';
import { Picker, Textarea } from 'native-base';
import Geolocation from '@react-native-community/geolocation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const screenHeight = Dimensions.get('window').height;
import LinearGradient from 'react-native-linear-gradient' // import LinearGradient
import Colors from '../common/colors';
import InputSucces from '../components/InputSucces';
import { _signUp, _verifyCode, _signIn, _ForgotPassword, _NewPassword, _signUpSocial,_error } from '../store/action/action';
import OpeningHours from '../components/Checkout/OpeningHours';
import ClosingHours from '../components/Checkout/ClosingHours';
import Button from '../components/Button';
import { Col } from 'native-base';
import { RadioButton } from 'react-native-paper';
import styles from './style'
import DefaultImage from '../components/defaultImage'
import ImagePicker from 'react-native-image-crop-picker';
import { Actions } from 'react-native-router-flux';
import  CustomTextarea  from '../components/TextArea';

const Mask = ({
    SignInData, maskHeight, navigation,
    nextRout, email, route, isLoader,
    isError, _signUp, _verifyCode, button,_error,
    _signIn, _ForgotPassword, _NewPassword, _signUpSocial }) => {
    const [userRole, userRoleState] = useState('User');
    const [user, userState] = useState({
        // Email: "momo@gmail.com",
        // userRole: "Barber",
        // "Full Name": "Momo",
        // Phone: "0345",
        // Password: "aaa",
        // "Confirm Password": "aaa",
        // "Shop Name": "aaa",
        // "Description": "aaa",
        // Address: "aaa",
        // "openingHours": "9:00 AM",
        // "closingHours": "5:00 PM",
    });
    const [selectedValue, setSelectedValue] = useState("Sunday");

    const [selectOpenTime, selectOpenTimeState] = useState({ index: "", item: "" });
    const [selectCloseTime, selectCloseTimeState] = useState({ index: "", item: "" });
    const [selectedImage1, selectedImages1State] = useState("");
    const [selectedImage2, selectedImages2State] = useState("");

    function _Auth() {
        let userClone = user
        switch (route) {
            case 'Signup':
                userClone.userRole = userRole
                userClone.images = [selectedImage1, selectedImage2]
                userClone.closingDay = selectedValue
                _signUp(userClone, navigation,);
                break;
            case 'Verify':
                // let userClone = user
                userClone.Email = email
                _verifyCode(userClone, navigation, nextRout);
                break;
            case 'Login':
                _signIn(user, navigation);
                break;
            case 'Forgot':
                _ForgotPassword(user, navigation);
                break;
            case 'New Password':
                userClone.Email = email
                _NewPassword(user, navigation, nextRout);
                break;
            case 'Social':
                userClone.Email = email
                userClone.userRole = userRole
                _signUpSocial(userClone, navigation, nextRout);
                break;

            // default:
            //   Alert.alert("NUMBER NOT FOUND");
        }

    }
    const imagePicker = (setState) => {
        ImagePicker.openPicker({
            mediaType: "photo",
            // includeBase64: true
            // multiple: true
        }).then(images => {
            console.log(images, "---")
            if(images.size<5000000){
                setState(images)
            }
            else{
                _error("Image is too large, maximum image size is 5MB.",6000)
            }

            // if (images.length > 2) {
            //     selectedImagesState(images.slice(0, 2))
            // }
            // else {
            //     var shopImage = images.concat(selectedImagesClone); 

            //     selectedImagesState(shopImage)
            // }
        });
    }
    return (
        <View style={{
            position: "absolute", top: "20%", width: "100%", alignItems: "center"
        }}>
            <View style={{
                padding: 15, backgroundColor: "white", width: "90%", height: "100%", borderRadius: 35,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                paddingBottom: 30,
                elevation: 5,
            }}>
                <View style={{ alignItems: "center", }}>

                    {(route !== "Verify" && route !== "Social" && route !== "Forgot" && route !== "New Password") && <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around" }}>
                        <TouchableOpacity style={{ backgroundColor: Colors.primary, width: 100, borderRadius: 5, alignItems: "center" }} onPress={() => Actions.SignIn()}>
                            <Text style={{
                                fontSize: 20, textDecorationLine: route === "Login" ? "underline" : null,
                                color: Colors.white
                            }}>LOGIN </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: Colors.primary, width: 100, borderRadius: 5, alignItems: "center" }} onPress={() => Actions.SignUp()}>
                            <Text style={{ fontSize: 20, textDecorationLine: route !== "Login" ? "underline" : null, color: Colors.white }}>
                                SIGNUP </Text>
                        </TouchableOpacity>
                    </View>}
                    <View style={{ height: maskHeight, width: "100%",marginTop:15}}>
                        <ScrollView persistentScrollbar={true}
                            showsVerticalScrollIndicator={true}
                            contentContainerStyle={{ alignItems: "center", paddingBottom: 15 }}>
                            {(route === "Signup" || route === "Social") && <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around" }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text>User</Text>
                                    <RadioButton
                                        color={Colors.primary}
                                        value="User"
                                        status={userRole === 'User' ? 'checked' : 'unchecked'}
                                        onPress={() => userRoleState('User')}
                                    />
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text>Business</Text>

                                    <RadioButton
                                        color={Colors.primary}
                                        value="Barber"
                                        status={userRole === 'Barber' ? 'checked' : 'unchecked'}
                                        onPress={() => userRoleState('Barber')}
                                    />
                                </View>
                            </View>}
                            {userRole === "User" && route !== "Social" && SignInData && SignInData.map((input, index) => {
                                let { stateName } = input
                                return (
                                    index < 5 && <View key={index} style={{ marginTop: 15 }}>
                                        <InputSucces label={input.label}
                                            iconProps={input.icon}
                                            _func={(text, label) => {
                                                let userClone = user
                                                userClone[label] = text
                                                userState(userClone)
                                            }}
                                        />
                                    </View>
                                )
                            })}
                            {route === "Social" && userRole === "User" && SignInData && SignInData.map((input, index) => {
                                return (
                                    index < 2 && <View key={index} style={{ marginTop: 15 }}>
                                        <InputSucces label={input.label}
                                            iconProps={input.icon}
                                            _func={(text, label) => {
                                                let userClone = user
                                                userClone[label] = text
                                                userState(userClone)
                                            }}
                                        />
                                    </View>
                                )
                            })}
                            {userRole === "Barber" && SignInData && SignInData.map((input, index) => {
                                let { stateName } = input
                                return (
                                    input.label === "Description" ?
                                        <View key={index} style={{ marginTop: 15 }}>
                                            <CustomTextarea label={input.label}
                                                iconProps={input.icon}
                                                multiline={true}
                                                _func={(text, label) => {
                                                    let userClone = user
                                                    userClone[label] = text
                                                    userState(userClone)
                                                }}
                                            />
                                        </View>
                                        :
                                        <View key={index} style={{ marginTop: 15 }}>
                                            <InputSucces label={input.label}
                                                iconProps={input.icon}
                                                _func={(text, label) => {
                                                    let userClone = user
                                                    userClone[label] = text
                                                    userState(userClone)
                                                }}
                                            />
                                        </View>
                                )
                            })}
                            {userRole === "Barber" &&
                                <View style={{ width: "95%", marginTop: 15 }}>
                                    <Text style={{ color: Colors.primary }}>Opening Hours</Text>
                                    <ScrollView
                                        showsHorizontalScrollIndicator={false}
                                        horizontal={true} contentContainerStyle={{ alignItems: "center", marginTop: 10 }} >
                                        <FlatList
                                            horizontal={true}
                                            data={OpeningHours}
                                            renderItem={({ item, index }) => (
                                                <TouchableOpacity onPress={() => {
                                                    let userClone = user
                                                    userClone.openingHours = item
                                                    userState(userClone)
                                                    selectOpenTimeState({ item, index })
                                                }}
                                                    style={[styles.timeSlot, { marginLeft: 15, backgroundColor: selectOpenTime.index === index ? Colors.primary : Colors.white }]}>
                                                    <Text style={{fontSize:13, color: selectOpenTime.index === index ? Colors.white : Colors.primary }}>
                                                        {item.toLowerCase()}
                                                    </Text>
                                                </TouchableOpacity>
                                            )}
                                        />
                                    </ScrollView>
                                </View>}
                            {userRole === "Barber" &&
                                <View style={{ width: "95%", marginTop: 15 }}>
                                    <Text style={{ color: Colors.primary }}>Closing Hours</Text>
                                    <ScrollView
                                        showsHorizontalScrollIndicator={false}
                                        horizontal={true} contentContainerStyle={{ alignItems: "center", marginTop: 10 }} >
                                        <FlatList
                                            horizontal={true}
                                            data={ClosingHours}
                                            renderItem={({ item, index }) => (
                                                selectOpenTime.index !== "" && selectOpenTime.index < index + 4 && <TouchableOpacity onPress={() => {
                                                    let userClone = user
                                                    userClone.closingHours = item
                                                    userState(userClone)
                                                    selectCloseTimeState({ item, index })
                                                }}
                                                    style={[styles.timeSlot, { marginLeft: 15, backgroundColor: selectCloseTime.index === index ? Colors.primary : Colors.white }]}>
                                                    <Text style={{fontSize:13, color: selectCloseTime.index === index ? Colors.white : Colors.primary }}>
                                                        {item.toLowerCase()}
                                                    </Text>
                                                </TouchableOpacity>
                                            )}
                                        />
                                    </ScrollView>
                                </View>}
                            {userRole === "Barber" &&
                                <View style={{ width: "95%", marginTop: 15 }}>
                                    <Text style={{ color: Colors.primary }}>Closed day</Text>
                                    <View style={{ flexDirection: "row", width: "95%", }}>
                                        <Picker
                                            mode="dropdown"
                                            // iosHeader="Select your SIM"
                                            iosIcon={<FontAwesome name="arrow-circle-o-down" style={{ color: "#007aff", fontSize: 25 }} />}
                                            style={{ width: undefined }}
                                            selectedValue={selectedValue}
                                            onValueChange={(day) => setSelectedValue(day)}
                                        >
                                            <Picker.Item label="Sunday" value="Sunday" />
                                            <Picker.Item label="Monday" value="Monday" />
                                            <Picker.Item label="Tuesday" value="Tuesday" />
                                            <Picker.Item label="Wednesday" value="Wednesday" />
                                            <Picker.Item label="Thursday" value="Thursday" />
                                            <Picker.Item label="Friday" value="Friday" />
                                            <Picker.Item label="Saturday" value="Saturday" />
                                        </Picker>
                                    </View>
                                </View>
                            }
                            {userRole === "Barber" &&
                                <View style={{ width: "95%", marginTop: 15 }}>
                                    <Text style={{ color: Colors.primary }}>Images</Text>
                                    <View style={{ flexDirection: "row", width: "95%", }}>
                                        <DefaultImage _func={() => imagePicker(selectedImages1State)} local={selectedImage1 && selectedImage1.path} />
                                        {/* <DefaultImage _func={() => imagePicker(selectedImages2State)} local={selectedImage2 && selectedImage2.path} /> */}
                                        {/* <DefaultImage _func={() => imagePick} local={(selectedImages && selectedImages[2]) ? selectedImages[2].path : ""} />
                                        <DefaultImage _func={() => imagePick} local={(selectedImages && selectedImages[3]) ? selectedImages[3].path : ""} /> */}
                                    </View>
                                </View>
                            }
                        </ScrollView>
                    </View>
                </View>
                {route !== "Verify" && route !== "Social" && route !== "Forgot" && route !== "New Password" && <TouchableOpacity
                    onPress={() => Actions.ForgotPassword()}
                    style={{ marginTop: 15, alignItems: "flex-end", marginRight: 15, }}>
                    <Text style={{}}>Forgot password?</Text>
                </TouchableOpacity>
                }
                <View style={{ marginTop: 15, alignItems: "center", justifyContent: "center", paddingHorizontal: 15 }}>
                    {
                        !isLoader ?
                            <Button label={button ? button : route} func={() => _Auth()} /> :
                            <ActivityIndicator size="small" color={Colors.primary} />
                    }
                    {isError !== "" && <Text style={{ color: "red", position: "absolute", top: "100%",fontSize:12 }}>{isError}</Text>}
                </View>
            </View>
        </View>
    );
}

function mapStateToProp(states) {
    return ({
        isError: states.root.isError,
        isLoader: states.root.isLoader,

    })
}
function mapDispatchToProp(dispatch) {
    return ({
        _signUp: (user, navigation) => {
            dispatch(_signUp(user, navigation));
        },
        _signIn: (user, navigation) => {
            dispatch(_signIn(user, navigation));
        },
        _verifyCode: (user, navigation, nextRout) => {
            dispatch(_verifyCode(user, navigation, nextRout));
        },
        _ForgotPassword: (user, navigation) => {
            dispatch(_ForgotPassword(user, navigation));
        },
        _NewPassword: (msg,time) => {
            dispatch(_NewPassword(msg,time));
        },
        _error: (user, navigation, nextRout) => {
            dispatch(_error(user, navigation, nextRout));
        },
        _signUpSocial: (userClone, navigation, nextRout) => {
            dispatch(_signUpSocial(userClone, navigation, nextRout));
        },
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(Mask);