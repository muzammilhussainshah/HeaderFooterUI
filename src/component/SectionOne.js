import React from 'react'
import { connect } from 'react-redux';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';

const SectionOne = ({ item }) => (
    <View style={styles.roundImg}>
        <Image
            style={{
                height: 70, width: 70, borderRadius: 35,
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
export default connect(mapStateToProp, mapDispatchToProp)(SectionOne);

const styles = StyleSheet.create({
    roundImg: {
        marginLeft: 20,
        height: 74,
        width: 74,
        borderRadius: 37,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    }
});