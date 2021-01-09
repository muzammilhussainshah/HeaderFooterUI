import React from 'react'
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import CustomFooter from '../component/CustomFooter/index';
import CustomHeader from '../component/CustomHeader';
const screenHeight = Dimensions.get('window').height;

const AppContainer = ({ children, iconLeft }) => {
    return (
        <View style={{ flex: 1 }}>
            {/* header */}
            <View style={{ height:screenHeight/8, }}>
                    <CustomHeader iconLeft={iconLeft} />
            </View>
            {/* body */}
            <View style={{ flex: 1, }}>
                {children}
            </View>
            {/* Footer */}
            <View style={{ height:screenHeight/8,}}>
                <CustomFooter />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    rightIcon: { height: 20, width: 20, alignItems: "flex-end" }
});

function mapStateToProp(state) {
    return ({
    })
}
function mapDispatchToProp(dispatch) {
    return ({
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(AppContainer);

