import React, { useState } from 'react'
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Colors from '../../common/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import styles from './style'
import { _selectTime } from '../../store/action/action'
import moment from 'moment';

const AvailbleMintsModal = ({
    modalVisible, _func, selectedSlot,
    bookings, _close,dateChange

}) => {
    const [isError, isErrorState] = useState("");
    function getTimeMilliseconds(timeString) {
        var t = timeString.match(/(\d{1,2}):(\d{2}) ([AP]M)/),
            h = parseInt(t[1], 10),
            isAm = t[3] === 'AM',
            isMidnight = h === 12 && isAm,
            isNoon = h === 12 && !isAm;
        return new Date(0).setUTCHours(isMidnight ? 0 : h + (isAm || isNoon ? 0 : 12), parseInt(t[2], 10));
    }
    console.log(bookings,"dateChangedateChangedateChange")
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}
        >
            <View style={styles.modal}>
                <View style={styles.modalChild}>
                    <TouchableOpacity onPress={() => {
                        _close(false)
                    }}
                        style={{ position: "absolute", top: 20, right: 25 }}>
                        <AntDesign name={"closecircle"} size={25} style={{ color: Colors.primary, }} />
                    </TouchableOpacity>
                    <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
                        {
                            [":00 ", ":05 ", ":10 ", ":15 ", ":20 ", ":25 ",
                                ":30 ", ":35 ", ":40 ", ":45 ", ":50 ", ":55 ",].map((v, i) => {
                                    let disable = false
                                    bookings.map((reserved, i) => {
                                        console.log(reserved.appointmentTime, "555555151561561",moment().format('D-M-YYYY'))
                                        if (
                                            (getTimeMilliseconds(reserved.appointmentTime) - 3.6e+6
                                                < getTimeMilliseconds(selectedSlot.split(":")[0] + v + selectedSlot.split(" ")[1]) &&
                                                getTimeMilliseconds(reserved.appointmentTime) + 3.6e+6
                                                > getTimeMilliseconds(selectedSlot.split(":")[0] + v + selectedSlot.split(" ")[1])) ||
                                            (reserved.appointmentDate === moment().format('D-M-YYYY')
                                                && getTimeMilliseconds(reserved.appointmentTime) < getTimeMilliseconds(moment().format('h:mm A')))
                                        ) {
                                            disable = true
                                        }
                                    })
                                    // console.log(dateChange,moment().format('YYYY-M-DD'),"6666666666666666aa",getTimeMilliseconds(selectedSlot.split(":")[0] + v + selectedSlot.split(" ")[1])< getTimeMilliseconds(moment().format('h:mm A')))
                                    if( dateChange === moment().format('YYYY-M-DD')&& getTimeMilliseconds(selectedSlot.split(":")[0] + v + selectedSlot.split(" ")[1])< getTimeMilliseconds(moment().format('h:mm A'))){
                                        disable = true
                                    }

                                    return (
                                        <View key={i} style={{ padding: 5, }}>
                                            <TouchableOpacity
                                                disabled={
                                                    disable
                                                }
                                                onPress={() => {
                                                    _func(selectedSlot.split(":")[0] + v + selectedSlot.split(" ")[1], false)
                                                }}
                                                style={[styles.timeSlot, {
                                                    backgroundColor: disable ? Colors.secondary : Colors.white,
                                                    borderColor: disable ? Colors.secondary : Colors.primary,
                                                }]}
                                            >
                                                <Text style={{
                                                    color:
                                                        disable ? Colors.white : Colors.primary,fontSize:12
                                                }}>
                                                    {selectedSlot.split(":")[0]}
                                                    {v}
                                                    {selectedSlot.split(" ")[1].toLowerCase()}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                    </View>
                    {isError !== "" && <Text style={{ color: "red", position: "absolute", bottom: 15 }}>{isError}</Text>}
                </View>
            </View>
        </Modal>
    );
}

function mapStateToProp(states) {
    return ({
        bookings: states.root.bookings,
        dateChange: states.root.dateChange,
    })
}
function mapDispatchToProp(dispatch) {
    return ({
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(AvailbleMintsModal);