import React, { useState, useEffect } from 'react'
import { Dimensions, View, Text,  } from 'react-native';
import { connect } from 'react-redux';
const screenHeight = Dimensions.get('window').height;


const SignIn = ({ navigation, _signInFacebook, checkUser, saveCurrentUserInStore }) => {
    return (
        <View style={{ height: screenHeight - 25 }}>
          <Text>heeeee</Text>
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