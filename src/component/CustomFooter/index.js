import React, { useState, useEffect } from 'react'
import { Dimensions, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import FooterData from './FooterData';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').screenWidth;


const CustomFooter = ({ }) => {
    return (
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Image
                style={{ width: "100%", flex: 1 }}
                resizeMode="cover"
                source={require('../../assets/Footer.png')}
            />
            <View activeOpacity={0.9} style={{ width: "100%", paddingHorizontal: 10, flexDirection: "row", height: "100%", zIndex: 1, position: "absolute", flex: 1.3, alignItems: "flex-end", }}>
                {
                    FooterData.map((value, index) => {
                        return (
                            <TouchableOpacity style={{ height: index === 2 ? "90%" : "25%", width: "20%", marginBottom: index === 2 ? "6%" : "5%", }}>
                                <Image
                                    style={{ height: "100%", width: "100%", elevation: 1, }}
                                    resizeMode="contain"
                                    source={value.Icon}
                                />
                            </TouchableOpacity>
                        )
                    })
                }
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
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(CustomFooter);