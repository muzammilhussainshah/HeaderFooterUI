import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import Colors from '../../common/colors';
import { _CancelAppointment, paymentTaking } from '../../store/action/action';
import Button from '../Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style'
import Communications from 'react-native-communications';
import { Actions } from 'react-native-router-flux';

const AppointmentCart = ({ data, shops, index, isLoader, _CancelAppointment, currentUserBooking, paymentTaking }) => {
  // console.log(data, "data")

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
      <Text style={{ color: Colors.secondary, fontWeight: "bold", alignSelf: "center" }}>{titleCase(data.shopName)}</Text>
      <Text style={{ color: Colors.secondary, fontWeight: "bold", alignSelf: "center", fontSize: 11 }}>{data.address[0] + " " + data.address[1] + " " + data.address[2]}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 15, marginBottom: 15, alignItems: "center" }}>
        <TouchableOpacity onPress={() => Communications.phonecall(data.phone, true)} style={styles.phone}>
          <Feather name={"phone"} size={20} style={{ color: Colors.white }} />
        </TouchableOpacity>
        <View >
          <Image
            style={styles.coverImg}
            source={{
              uri: data.coverImg[0],
            }}
          />
        </View>
        <TouchableOpacity onPress={() => Communications.text(data.phone)} style={[styles.phone, { backgroundColor: Colors.secondary }]}>
          <MaterialIcons name={"sms"} size={20} style={{ color: Colors.white }} />

        </TouchableOpacity>
      </View>
      <Text style={{ color: Colors.secondary, fontWeight: "bold", alignSelf: "center" }}>{data.appointmentDate}</Text>
      <Text style={{ color: Colors.secondary, fontWeight: "bold", alignSelf: "center" }}>{data.appointmentTime}</Text>
      {/* <TouchableOpacity
      // onPress={()=>Actions.mapDirection()}
      style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: Colors.secondary, width: "85%", height: 40, alignSelf: "center", borderRadius: 19 }}>
        <View>
          <Entypo name={"location"} size={20} style={{ color: Colors.white }} />
        </View>
        <View>
          <Text style={{ color: Colors.white, fontWeight: "bold", alignSelf: "center" }}>Go to destination</Text>
        </View>
      </TouchableOpacity> */}
      {isLoader ?
        <ActivityIndicator size="small" color={Colors.primary} style={{ marginTop: 15 }} /> :
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity onPress={() => _CancelAppointment(data, currentUserBooking, index, "User")}
            style={{ marginTop: 15, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: Colors.secondary, width: "45%", height: 40, alignSelf: "center", borderRadius: 19 }}>
            <View>
              <MaterialCommunityIcons name={"table-cancel"} size={20} style={{ color: Colors.white }} />
            </View>
            <View>
              <Text style={{ color: Colors.white, fontWeight: "bold", alignSelf: "center", fontSize: 12 }}>Cancel Appointment</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={data.paid}
            onPress={() => paymentTaking(data, currentUserBooking, index, "User")}
            style={{ marginTop: 15, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: Colors.secondary, width: "45%", height: 40, alignSelf: "center", borderRadius: 19 }}>
            <View>
              <MaterialCommunityIcons name={"table-cancel"} size={20} style={{ color: Colors.white }} />
            </View>
            <View>
              {data.paid ?
                <Text style={{ color: Colors.white, fontWeight: "bold", alignSelf: "center", fontSize: 12 }}>Paid  </Text>
                : <Text style={{ color: Colors.white, fontWeight: "bold", alignSelf: "center", fontSize: 12 }}>Pay Now {data.price}  £ / hr   </Text>
              }
            </View>
          </TouchableOpacity>
        </View>}
    </View>
  )
}


function mapStateToProp(states) {
  return ({
    shops: states.root.shops,
    isLoader: states.root.isLoader,
    currentUserBooking: states.root.currentUserBooking,

  })
}


function mapDispatchToProp(dispatch) {
  return ({
    _CancelAppointment: (data, currentBarberBooking, index, userRole) => {
      dispatch(_CancelAppointment(data, currentBarberBooking, index, userRole));
    },
    paymentTaking: (data, currentBarberBooking, index, userRole) => {
      dispatch(paymentTaking(data, currentBarberBooking, index, userRole));
    },
  })
}


export default connect(mapStateToProp, mapDispatchToProp)(AppointmentCart);