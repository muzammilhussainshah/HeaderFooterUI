import React, { useState, useEffect } from 'react'
import { Dimensions, View, Text, TouchableOpacity, Image, BackHandler } from 'react-native';
import { connect } from 'react-redux';
// import Colors from '../';

const DefaultImage = ({ _func, local }) => {
    return (
        <TouchableOpacity
            onPress={()=>_func()}
            style={{ width: 80, height: 80, }}
        >
            {local ?
                <Image
                    resizeMode="contain"
                    style={{ width: "100%", height: "100%" }}
                    source={{uri:local}}
                /> :
                <Image
                    resizeMode="contain"
                    style={{ width: "100%", height: "100%" }}
                    source={require('../assets/default.png')}
                    // source={{uri:"http://192.168.0.111:3002/createShop/1598278319361_photo.jpg"}}
                    
                />
            }
        </TouchableOpacity>
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
export default connect(mapStateToProp, mapDispatchToProp)(DefaultImage);