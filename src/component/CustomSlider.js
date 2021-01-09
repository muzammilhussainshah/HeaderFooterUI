import React from 'react'
import { connect } from 'react-redux';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';
const CustomSlider = ({ item }) => (
    <View style={styles.slider}>
        <Image
            style={{
                height: "100%", width: "100%", elevation: 2,
            }}
            source={item}
        />
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
export default connect(mapStateToProp, mapDispatchToProp)(CustomSlider);
const styles = StyleSheet.create({
    slider: {
        height: 180,
        width: 300,
        marginLeft: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    }
});