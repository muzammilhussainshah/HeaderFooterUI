import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Colors from '../common/colors';

const CustomHeader = ({ iconRight, iconLeft }) => (
    <View style={styles.header}>
        <TouchableOpacity style={{ flex: 1, backgroundColor: "white" }}>
            {iconLeft && iconLeft}
        </TouchableOpacity>
        <View style={{ flex: 7, alignItems: "center" }}>
            <Text style={{ color: Colors.white, fontSize: 18 }}>Profile</Text>
        </View>
        <TouchableOpacity style={{ flex: 1, }}>
            {iconRight && iconRight}
        </TouchableOpacity>
    </View>
);

function mapStateToProp(state) {
    return ({
    })
}
function mapDispatchToProp(dispatch) {
    return ({
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(CustomHeader);

const styles = StyleSheet.create({
    header: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: Colors.primary, borderBottomEndRadius: 20, borderBottomStartRadius: 20 },
});