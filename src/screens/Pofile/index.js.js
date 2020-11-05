import React from 'react'
import { View, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import CustomHeader from '../../component/CustomHeader'
import CustomFooter from '../../component/CustomFooter'
import ProfilePicWithName from '../../component/ProfilePicWithName';
import ContactDetails from '../../component/ContactDetails';
const screenHeight = Dimensions.get('window').height;

const Profile = () => (
    <View style={{ flex: 1 }}>
        {/* app container */}
        <View style={{ flex: 8.7, }}>
            {/* header */}
            <View style={{ flex: 2, }}>
                <CustomHeader
                    iconRight={
                        <Image
                            style={styles.rightIcon}
                            resizeMode="contain"
                            source={require("../../assets/Edit.png")}
                        />
                    } />
            </View>
            {/* body */}
            <View style={{ flex: 8, }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ height: screenHeight / 3, }}>
                        <ProfilePicWithName />
                    </View>
                    <View style={{}}>
                        <ContactDetails />
                    </View>
                </ScrollView>
            </View>
        </View>
        {/* Footer */}
        <View style={{ flex: 1.3, }}>
            <CustomFooter />
        </View>
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

export default connect(mapStateToProp, mapDispatchToProp)(Profile);

const styles = StyleSheet.create({
    rightIcon: { height: 20, width: 20, alignItems: "flex-end" }
});