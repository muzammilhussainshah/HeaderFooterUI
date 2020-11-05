import React, { useState, useEffect } from 'react'
import { Dimensions, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import CustomFooter from '../../component/CustomFooter/index';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').screenWidth;


const Home = ({ }) => {
    const [phoneNumber, setPhoneNumber] = useState("3472076097");

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 8.7, backgroundColor: "red" }}>
                <Text style={{ fontWeight: "bold", fontSize: 25 }}>{`Login with Phone`}</Text>
            </View>



            {/* Footer */}
            <View style={{ flex: 1.3, }}>
                <CustomFooter />
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
export default connect(mapStateToProp, mapDispatchToProp)(Home);