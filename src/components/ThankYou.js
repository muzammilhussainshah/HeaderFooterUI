import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text,  Dimensions,Modal } from 'react-native';
import { thankYou  } from '../store/action/action'
import { connect } from 'react-redux';
import Colors from '../common/colors';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';
class ThankYou extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    };

    render() {
        const {  navigation,modalState,thankYou} = this.props
        return (
            <Modal
                style={{
                }}
                animationType="slide"
                transparent={true}
                visible={modalState}
                onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                }}>



                <Animatable.View
                    animation="pulse"

                    style={{
                        position: "absolute", zIndex: 1, backgroundColor: "white", width: "80%", height: 165,
                        marginHorizontal: "9.5%", marginVertical: "20%",
                        flexDirection: "column",
                        borderWidth: 1,
                        marginVertical: "60%",
                        borderBottomLeftRadius: 12,
                        borderBottomRightRadius: 12,
                        borderColor: '#ddd',
                        borderBottomWidth: 0,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 14,
                        elevation: 115,
                        // marginLeft: 5,
                        // marginRight: 5,
                        // marginTop: 10,
                    }}>
                    {/* <View style={{  flexDirection: "column",}}>
<Text>
aaaaaaa
aaaaaaa
aaaaaaa
</Text>
</View> */}
                    <View style={{ height: 40, flexDirection: "row", justifyContent: "center", alignItems: "center",  backgroundColor: Colors.secondary, }}>
                        <View
                            style={{ flexDirection: "row",color:"white" }}
                        >
                            <Text style={{ color:"white",fontFamily: 'Verdana-Bold', }}>
                                Confirmation !
</Text>
                            {/* <TouchableOpacity
                                style={{ right: -75 }}
                                onPress={() => { that.setState({ modalVisible: false, }) }}

                            >

                                <FontAwesome name="close" style={{ color: "red", fontSize: 25, }} />
                            </TouchableOpacity> */}
                        </View>

                    </View>
                    <View style={{ height: 40, flexDirection: "row", justifyContent: "center", marginTop: 15 }}>
                        <View style={styles.input}>
                          <Text style={{textAlign:"center",fontFamily: 'Verdana-Bold',color:"grey"}}>
                          {/* Thank You for the Order, Our representative will call you back shortly */}
                          Thank you for choosing Barber, your appointment has been approved.
                          </Text>
                        </View>
                        {/* <TouchableOpacity style={{ width: "20%", justifyContent: "center", alignItems: "center", }}
// onPress={this.comments.bind(this, index, key.addId)}
>
<Icon name='send' style={{ fontSize: 30, color: "#004D94" }} />
</TouchableOpacity> */}
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 0 }}>
                        <TouchableOpacity style={{
                            justifyContent: "center", alignItems: "center", height: 45, width: "80%",
                            backgroundColor: Colors.secondary,
                        }}
                            onPress={() => {
                                // this.offer()
                              thankYou(false)
                                Actions.Home()
                            }}
                        >
                            <Text style={{ color: "white", fontWeight: "bold",fontFamily: 'Verdana-Bold', textAlign: "center" }}> Ok </Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({

})


function mapStateToProps(states) {
    return ({
    })
}

function mapDispatchToProps(dispatch) {
    return {
        thankYou: (bool) => {
            dispatch(thankYou(bool));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThankYou);