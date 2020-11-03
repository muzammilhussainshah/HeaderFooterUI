import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { WebView } from 'react-native-webview';
import { CheckBox } from 'native-base';
import Color from '../../common/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions } from 'react-native-router-flux';
import { savePaymentInDb, freeTrial } from '../../store/action/action';
import styles from './style'
import Button from '../../components/Button'
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const Subscription = ({ currentUser, isLoader, savePaymentInDb, freeTrial }) => {
    const [subsPkg, setSubsPkg] = useState([
        { price: "16", duration: "1 Month", bol: true },
        { price: "40", duration: "3 Months", bol: false },
        { price: "80", duration: "6 Months", bol: false },
        { price: "150", duration: "12 Months", bol: false },
    ]);
    const [flag, setFlag] = useState(false)

    function onChangeCheckbox(indexWantToBeChange) {
        let subsPkgClone = subsPkg
        for (var i = 0; i < subsPkgClone.length; i++) {
            subsPkgClone[i].bol = false
        }
        subsPkgClone[indexWantToBeChange].bol = true
        console.log(subsPkgClone, "subsPkgClone")
        setSubsPkg(subsPkgClone)
        setFlag(!flag)
    }
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
    const selectedCheck = subsPkg.filter(({ bol }) => bol === true);
    console.log(currentUser, "55555")
    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ flex: 2 }}>
                    <TouchableOpacity
                        onPress={() => {
                            logout()
                        }}
                        style={{ justifyContent: "flex-end", alignItems: "flex-end", padding: 10 }}>
                        <Icon name='close-circle' style={{ fontSize: 25, color: Color.primary }} />
                    </TouchableOpacity  >
                    <View style={{}}>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", }}>
                            <View style={{ flex: 2, alignItems: "center" }}>
                                <CheckBox color={"grey"}
                                    checked={subsPkg[0].bol}
                                    onPress={() => onChangeCheckbox(0)}
                                />
                            </View>
                            <Text style={{ flex: 4, fontSize: 22,  color: "grey", }}>{subsPkg[0].price} £ / {subsPkg[0].duration}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", }}>
                            <View style={{ flex: 2, alignItems: "center" }}>
                                <CheckBox color={"grey"}
                                    checked={subsPkg[1].bol}
                                    onPress={() => onChangeCheckbox(1)}
                                />
                            </View>
                            <Text style={{ flex: 4, fontSize: 22, color: "grey", }}>{subsPkg[1].price} £ / {subsPkg[1].duration}</Text>
                        </View>
                       
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", }}>
                            <View style={{ flex: 2, alignItems: "center" }}>
                                <CheckBox color={"grey"}
                                    checked={subsPkg[2].bol}
                                    onPress={() => onChangeCheckbox(2)} />
                            </View>
                            <Text style={{ flex: 4, fontSize: 22,  color: "grey", }}>{subsPkg[2].price} £ / {subsPkg[2].duration}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", }}>
                            <View style={{ flex: 2, alignItems: "center" }}>
                                <CheckBox color={"grey"}
                                    checked={subsPkg[3].bol}
                                    onPress={() => onChangeCheckbox(3)}
                                />
                            </View>
                            <Text style={{ flex: 4, fontSize: 22,  color: "grey", }}>{subsPkg[3].price} £ / {subsPkg[3].duration}</Text>
                        </View>
                    </View>

                    <View style={{ height: 310, backgroundColor: "blue", marginTop: "10%" }}>
                        <WebView
                            source={
                                {
                                    uri: `https://stripe-monthly-subcription.web.app/${selectedCheck[0].price}`,
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    // body: `price=${this.state.buyerNSeller.price}&name=${this.state.buyerNSeller.name}&catogery=${this.state.buyerNSeller.catogery}`
                                }}
                            onNavigationStateChange={data =>
                                data.title === "success" && savePaymentInDb(currentUser, selectedCheck[0].duration.split(" ")[0])
                            }
                        />
                    </View>

                </View>
                {currentUser.freeTrialUsed===!false&&<View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <View style={{ alignItems: "center", justifyContent: "space-around", backgroundColor: Color.primary, height: 150, borderTopRightRadius: 50, borderTopLeftRadius: 50 }}>
                        <Text style={{ fontSize: 25, color: Color.white }}>1 Day Free Trial</Text>
                        {/* <TouchableOpacity
                            onPress={() => savePaymentInDb(currentUser)}
                            style={[styles.Button, { backgroundColor: Color.secondary }]}>
                            <Text style={{ color: Color.white, fontWeight: "bold" }}>{"Subscription"}</Text>
                        </TouchableOpacity> */}
                        {
                            !isLoader ? <Button
                                label="Subscription"
                                btnColor={true}
                                func={() => freeTrial(currentUser)}
                            /> :
                                <ActivityIndicator size="small" color={Color.primary} />
                        }
                    </View>
                </View>
                }
            </ScrollView>
        </View>
    )
}



function mapStateToProp(states) {
    return ({
        isLoader: states.root.isLoader,
        currentUser: states.root.currentUser,

    })
}
function mapDispatchToProp(dispatch) {
    return ({
        savePaymentInDb: (currentUser, duration) => {
            dispatch(savePaymentInDb(currentUser, duration));
        },
        freeTrial: (currentUser) => {
            dispatch(freeTrial(currentUser));
        },
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(Subscription);