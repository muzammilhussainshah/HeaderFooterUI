import React, { useState, useEffect } from 'react'
import { Dimensions, View, Text, TouchableOpacity, Image, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { _getShops, _loading, _signInFacebook, checkUser, saveCurrentUserInStore } from "../../store/action/action";
const screenHeight = Dimensions.get('window').height;
import LinearGradient from 'react-native-linear-gradient' // import LinearGradient
import Colors from '../../common/colors';
import Mask from '../../components/Mask';
import { createStripeAcc, } from '../../store/action/action';
import { Actions } from 'react-native-router-flux';
const LandingPage = ({ account, email,createStripeAcc }) => {
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
          <Text style={{ marginTop: 15, color: Colors.white, }}>Read instruction to continue</Text>
        </LinearGradient>
      </View>
      <View style={{ backgroundColor: "white", flex: 3, padding: 5 }}>
        <Text style={{ fontSize: 16, letterSpacing: 1, }}>
          In order for your business to receive and send online payments, please take a few moments to register
          with Stripe by clicking on the link below.
                    </Text>

        <Text style={{ fontSize: 16, letterSpacing: 1,marginTop:5 }}>Stripe is our preferred payment partner.
        </Text>

        <Text style={{ fontSize: 16, letterSpacing: 1, marginTop:5 }}>
         It is essential that you do this, otherwise your onboarding will be incomplete and your customers
          will not be able to use our platform to
          book your services.
                    </Text>

                    <TouchableOpacity onPress={()=>createStripeAcc(account, email)} style={{marginTop:25,alignSelf:"center"}}>
                      <Text style={{textDecorationLine:"underline",color:"blue"}}>Register with stripe</Text>
                    </TouchableOpacity>
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
    createStripeAcc: (account, email) => {
      dispatch(createStripeAcc(account, email));
  },
  })
}
export default connect(mapStateToProp, mapDispatchToProp)(LandingPage);