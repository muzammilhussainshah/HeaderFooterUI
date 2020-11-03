import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import Colors from '../../common/colors';
import { _CancelAppointment } from '../../store/action/action';
import Button from '../Button';
import styles from './style'
import Communications from 'react-native-communications';

const AppointmentCartBarber = ({ data, shops, _CancelAppointment, isLoader, currentBarberBooking, index }) => {

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }

  return (
    <View
      style={{
        backgroundColor: Colors.white, marginBottom: 15, padding: 10, borderRadius: 20,
        elevation: 1.5
      }}>
      <Text style={{ color: Colors.secondary, fontWeight: "bold", alignSelf: "center" }}>{titleCase(data.userDetail["Full Name"])}</Text>
      <Text style={{ color: Colors.secondary, fontWeight: "bold", alignSelf: "center", fontSize: 11 }}>{data.userDetail.Address}</Text>

      <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 15, alignItems: "center" }}>
        <TouchableOpacity onPress={() => Communications.phonecall(data.userDetail.Phone, true)} style={styles.phone}>
          <Feather name={"phone"} size={20} style={{ color: Colors.white }} />
        </TouchableOpacity>
        <View >
          <Image
            style={styles.coverImg}
            source={{
              uri: "data:image/jpeg;base64,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",
            }}
          />
        </View>
        <TouchableOpacity onPress={() => Communications.text(data.userDetail.Phone)} style={[styles.phone, { backgroundColor: Colors.secondary }]}>
          <MaterialIcons name={"sms"} size={20} style={{ color: Colors.white }} />

        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", paddingHorizontal: 15 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: Colors.secondary, fontWeight: "bold", }}>Appointment Date</Text>
        </View>
        <View style={{}}>
          <Text style={{ color: Colors.secondary, fontWeight: "bold", alignSelf: "flex-end" }}>|</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: Colors.secondary, fontWeight: "bold", alignSelf: "flex-end" }}>{data.appointmentDate}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", paddingHorizontal: 15 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: Colors.secondary, fontWeight: "bold", }}>Appointment Time</Text>
        </View>
        <View style={{}}>
          <Text style={{ color: Colors.secondary, fontWeight: "bold", alignSelf: "flex-end" }}>|</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: Colors.secondary, fontWeight: "bold", alignSelf: "flex-end" }}>{data.appointmentTime}</Text>
        </View>
      </View>
      {isLoader ?
        <ActivityIndicator size="small" color={Colors.primary} style={{ marginTop: 15 }} /> :
        <TouchableOpacity onPress={() => _CancelAppointment(data, currentBarberBooking, index)}
          style={{ marginTop: 15, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: Colors.secondary, width: "85%", height: 40, alignSelf: "center", borderRadius: 19 }}>
          <View>
            <MaterialCommunityIcons name={"table-cancel"} size={20} style={{ color: Colors.white }} />
          </View>
          <View>
            <Text style={{ color: Colors.white, fontWeight: "bold", alignSelf: "center" }}>Cancel Appointment</Text>
          </View>
        </TouchableOpacity>}
    </View>
  )
}


function mapStateToProp(states) {
  return ({
    shops: states.root.shops,
    isLoader: states.root.isLoader,
    currentBarberBooking: states.root.currentBarberBooking,

  })
}


function mapDispatchToProp(dispatch) {
  return ({
    _CancelAppointment: (data, currentBarberBooking, index) => {
      dispatch(_CancelAppointment(data, currentBarberBooking, index));
    },
  })
}


export default connect(mapStateToProp, mapDispatchToProp)(AppointmentCartBarber);