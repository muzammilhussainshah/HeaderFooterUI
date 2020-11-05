import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Colors from '../common/colors';

const ProfilePicWithName = () => (
    <View style={{ flex: 1, }}>
        <View style={{ flex: 7, flexDirection: "row" }}>
            <View style={{ flex: 3.5 }}>
                <Image
                    style={{ width: "100%", height: "80%", marginTop: "20%", }}
                    resizeMode="contain"
                    source={require("../assets/profileRandomLogo2.png")}
                />
            </View>
            <View style={{ flex: 3, }}>
                <TouchableOpacity activeOpacity={0.8} style={{ elevation: 5, flex: 0.9, marginTop: "20%", borderRadius: 35 }}>
                    <Image
                        style={{ width: "100%", height: "100%", borderRadius: 35, backgroundColor: "pink" }}
                        source={require("../assets/girl.png")}
                    />
                    <Image
                        style={styles.uploadBtn}
                        resizeMode="contain"
                        source={require("../assets/upload.png")}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 3.5, }}>
                <Image
                    style={{ width: "100%", height: "80%", marginTop: "20%", }}
                    resizeMode="contain"
                    source={require("../assets/profileRandomLogo2.png")}
                />
            </View>
        </View>
        <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 26 }}>Verna Elonna</Text>
            <Text style={{ color: Colors.primary, fontSize: 18 }}>Proximus</Text>
        </View>
    </View>
)

function mapStateToProp(state) {
    return ({
    })
}

function mapDispatchToProp(dispatch) {
    return ({
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(ProfilePicWithName);

const styles = StyleSheet.create({
    uploadBtn: { position: "absolute", zIndex: 2, width: "50%", height: "50%", bottom: -10, right: "-7%", borderRadius: 35 },

});
