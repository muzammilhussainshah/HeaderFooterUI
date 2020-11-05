import React, { useState, useEffect } from 'react'
import { Dimensions, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').screenWidth;


export default CustomFooter = [
    {Icon:require('../../assets/BusinessContinuity.png'),rout:""},
    {Icon:require('../../assets/CallAssistant.png'),rout:""},
    {Icon:require('../../assets/home.png'),rout:"Home"},
    {Icon:require('../../assets/setting.png'),rout:""},
    {Icon:require('../../assets/girl.png'),rout:"Profile"},
]

function mapStateToProp(state) {
    return ({
    })
}
function mapDispatchToProp(dispatch) {
    return ({
    })
}