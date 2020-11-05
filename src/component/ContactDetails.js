import React from 'react'
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Colors from '../common/colors';
const screenHeight = Dimensions.get('window').height;

const ContactDetails = ({ }) => (
    <View style={{ flex: 1, alignItems: "center", }}>
        <View style={{ width: "90%", flex: 1, }}>
            <Text style={styles.heading}>
                Contact Detail
            </Text>
            <View style={styles.detail}>
                <Text style={{ fontSize: 16, }}>
                    Phone Number
                </Text>
                <Text style={styles.phoneEmail}>
                    +32 428 115 989
                </Text>
            </View>
            <View style={[styles.detail, { backgroundColor: 'rgba(92, 50, 31, 0.07)' }]}>
                <Text style={{ fontSize: 16, }}>
                    Email Address
                </Text>
                <Text style={[styles.phoneEmail, { color: Colors.primary }]}>
                    vernaellons@cl1.be
                </Text>
            </View>
            <Text style={styles.heading}>
                Your Logged Calls
            </Text>
            <View style={styles.logContainer}>
                <View style={styles.logCalls}>
                    <Text style={styles.noOfCall}>
                        30
                    </Text>
                    <Text style={styles.logCallTxt}>
                        Number of logged calls
                    </Text>
                </View>
                <View style={styles.logCalls}>
                    <Text style={styles.noOfCall}>
                        06
                    </Text>
                    <Text style={[styles.logCallTxt, { width: "80%" }]}>
                        Number of monthly logged calls
                        </Text>
                </View>
            </View>
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
export default connect(mapStateToProp, mapDispatchToProp)(ContactDetails);

const styles = StyleSheet.create({
    detail: {
        paddingHorizontal: "5%", marginTop: "3%", backgroundColor: 'rgba(0, 217, 182, 0.1)', height: 55, borderRadius: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center"
    },
    phoneEmail: { fontWeight: "bold", fontSize: 18, color: Colors.reverse },
    heading: { fontWeight: "bold", fontSize: 20, marginTop: "3%" },
    logContainer: { flexDirection: "row", marginBottom: 25, flex: 1, justifyContent: "space-between", marginTop: "2%" },
    logCalls: { justifyContent: "center", alignItems: "center", borderRadius: 15, elevation: 1, height: "100%", flex: 0.48, height: screenHeight / 5 },
    noOfCall: { fontWeight: "bold", fontSize: 40, marginTop: "3%" },
    logCallTxt: { fontSize: 16, marginTop: "3%", width: "50%", color: "grey", textAlign: "center" },
});
