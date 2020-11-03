import React, { } from 'react'
import { View, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import Color from '../../common/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions } from 'react-native-router-flux';
import { submitAccountDetails,payBookingInDb } from '../../store/action/action';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import styles from './style'
import Button from '../../components/Button'
import { connect } from 'react-redux';

const WebViewScreen = ({ uri, currentUserEmail, submitAccountDetails, connected,shopId,payBookingInDb,bookingId,shopName }) => {
    console.log(bookingId,"++++" )
    return (
        <View style={{ flex: 1, backgroundColor: "red" }}>
            <WebView
                source={
                    {
                        uri,
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: `price=${"this.state.buyerNSeller.price"}&name=${"this.state.buyerNSeller.name"}&catogery=${"this.state.buyerNSeller.catogery"}`
                    }}
                onNavigationStateChange={(data) => {
                    console.log(data)
                    if (data.title === "cancel") {
                        Actions.pop()
                        // setTimeout(() => {
                        // }, 3000)
                    }
                    else if (data.title === "success") {
                        if (connected) {
                            // Actions.Home()
                            payBookingInDb(bookingId,shopId,shopName)
                            // setTimeout(() => {
                            //     Actions.Home()
                            // }, 3000)
                        }
                        else {

                            submitAccountDetails(true, currentUserEmail)
                            // alert("Go to stripe setting & upload document")
                            // let settingUrl = "https://dashboard.stripe.com/settings/"
                            // Linking.canOpenURL(settingUrl).then(supported => {
                            //     if (supported) {
                            //         Linking.openURL(settingUrl);
                            //     } else {
                            //         console.log("Don't know how to open URI: " + settingUrl);
                            //     }
                            // });
                        }
                    }
                    // data.title === "success" && savePaymentInDb(currentUser)
                }
                }
            />
        </View>
    )
}



function mapStateToProp(states) {
    return ({
        // currentUser: states.root.currentUser,
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        submitAccountDetails: (bol, currentUserEmail) => {
            dispatch(submitAccountDetails(bol, currentUserEmail));
        },
        payBookingInDb: (bookingId,shopId,shopName) => {
            dispatch(payBookingInDb(bookingId,shopId,shopName));
        },
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(WebViewScreen);