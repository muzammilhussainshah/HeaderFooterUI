import React, { useState, useEffect } from 'react'
import { Dimensions, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').screenWidth;


export default CustomFooter = [
    {Icon:require('../../assets/BusinessContinuity.png'),rout:"Home"},
    {Icon:require('../../assets/CallAssistant.png'),rout:"Home"},
    {Icon:require('../../assets/home.png'),rout:"Home"},
    {Icon:require('../../assets/setting.png'),rout:"Home"},
    {Icon:require('../../assets/setting.png'),rout:"Home"},
]

function mapStateToProp(state) {
    return ({
    })
}
function mapDispatchToProp(dispatch) {
    return ({
    })
}