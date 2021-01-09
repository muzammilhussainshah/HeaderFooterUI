import React from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../common/colors';
import { connect } from 'react-redux';
import FooterData from './FooterData';
import {Actions} from 'react-native-router-flux';

const CustomFooter = ({ }) => {
    return (
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Image
                style={{ width: "100%", flex: 1 }}
                resizeMode="cover"
                source={require('../../assets/Footer.png')}
            />
            <View activeOpacity={0.9} style={styles.Footer}>
                {
                    FooterData.map((value, index) => (
                        <TouchableOpacity
                        //  onPress={() => Actions[value.rout]()} 
                         style={footerBtn(index)}
                        >
                            {
                                index !== 4 ?
                                    <Image
                                        style={{ height: "100%", width: "100%", elevation: 1 }}
                                        resizeMode="contain"
                                        source={value.Icon}
                                    /> :
                                    <View style={styles.profileLogo}>
                                        <Image
                                            style={{ width: 30, height: 30, borderRadius: 15, }}
                                            source={value.Icon}
                                        />
                                    </View>
                            }
                        </TouchableOpacity>
                    ))
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

const footerBtn = (index) => ({ height: index === 2 ? "90%" : index === 4 ? "40%" : "25%", alignItems: "center", width: "20%", marginBottom: (index === 2) ? "6%" : "5%", })
const styles = StyleSheet.create({
    Footer: { width: "100%", paddingHorizontal: 10, flexDirection: "row", height: "100%", zIndex: 1, position: "absolute", flex: 1.3, alignItems: "flex-end", },
    profileLogo: { width: 35, height: 35, borderRadius: 17.5, borderWidth: 1, justifyContent: "center", alignItems: "center", borderColor: Colors.primary },
});