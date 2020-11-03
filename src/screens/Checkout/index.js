import React, { useState,useEffect } from 'react'
import { FlatList, ScrollView, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import AppContainer from '../../container/AppContainer';
import Button from '../../components/Button';
import InputFeildData from '../../components/Checkout/InputFeildData';
import AvailbleSlots from '../../components/Checkout/AvailbleSlots';
import Colors from '../../common/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import styles from './style'
const screenHeight = Dimensions.get('window').height;
import InputSucces from "../../components/InputSucces";
import ThankYou from "../../components/ThankYou";
import LinearGradient from 'react-native-linear-gradient' // import LinearGradient
import DatePicker from 'react-native-datepicker'
import { _DateChange, _CreateBooking } from '../../store/action/action'
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

const Checkout = ({ navigation, _DateChange, _CreateBooking, isError, thankYou, bookings,currentUser,shop, }) => {
  console.log(shop,"66666666666666666")
  // let shop = navigation.getParam('shop',)
  var dateInFormat = new Date;
  var dd = String(dateInFormat.getDate()).padStart(2, '0');
  var mm = String(dateInFormat.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = dateInFormat.getFullYear();
  dateInFormat = dd + '-' + mm + '-' + yyyy;
  const [date, dateFrmState] = useState(dateInFormat);
  const [selectedSlot, selectedSlotFrmState] = useState("");
  const [userDetail, userDetailFrmState] = useState({clientId:currentUser.currentUserUid});


  useEffect(() => {
    console.log(currentUser,"currentUser")
    let userDetailClone = userDetail
    userDetail["Full Name"] = currentUser.fullName
    userDetail["Phone"] = currentUser.phoneNumber
    userDetail["Email"] = currentUser.Email
    userDetailFrmState(userDetailClone)
    return () => {
      var today = new Date;
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy + '-' + mm + '-' + dd;
       _DateChange(today)
      }
}, []);

  return (
    <AppContainer drawerProps={false} navigation={navigation} FooterHide={true} >
      {/* body */}
      {(thankYou) ? (
        <ThankYou modalState={thankYou} navigation={navigation} />
      ) : (null)}
      <View style={{
        flex: 8, width: "100%",
        backgroundColor: "#f8f8f8",
      }}>
        <ScrollView contentContainerStyle={{ justifyContent: "center", paddingBottom: 25 }}>
          {/* Availble Slots */}
          <View style={{ height: screenHeight / 3, }}>
            <LinearGradient
              colors={[Colors.primary, '#E14F32']}
              start={{ x: 0, y: 0 }}
              end={{ x: 2, y: 1 }}
              style={{
                justifyContent: 'center',
                height: "80%",
                padding: 15,
                borderBottomLeftRadius: 70,
                borderBottomRightRadius: 70,
              }}
            >
              <Text style={{ color: Colors.white, fontWeight: "bold" }}>Availble Slots</Text>
            </LinearGradient>
            <TouchableOpacity
              onPress={() => Actions.pop()}
              style={{
                position: "absolute", padding: 10
              }}>
              <AntDesign name={"arrowleft"} size={32} style={{ color: Colors.white }} />
            </TouchableOpacity>
            <AvailbleSlots shop={shop} _func={(slotTime) => selectedSlotFrmState(slotTime)} />
          </View>
          <View style={{ marginTop: 15, borderWidth: 0.2, borderColor: "#A6B5AD" }}>
          </View>
          {/* Calender */}
          <View style={{ marginTop: 15, marginBottom: 2, width: "100%", alignItems: "center", paddingHorizontal: 15 }}>
            <View style={styles.input}>
              <View style={{ flex: 1.5, alignItems: "center" }}>
                <AntDesign name={"calendar"} size={20} style={{ color: Colors.primary }} />
              </View>
              {/* {console.log(moment(,"ssssssssss")} */}
              <View style={{ flex: 8.5 }}>
                <DatePicker
                  style={{ width: "100%", }}
                  date={date}
                  mode="date"
                  placeholder="Booking Slot"
                  minDate={moment(new Date()).format().split("T")[0].split("-")[2]+"-"+moment(new Date()).format().split("T")[0].split("-")[1]+"-"+moment(new Date()).format().split("T")[0].split("-")[0]}
                  format="DD-MM-YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  customStyles={{
                    dateInput: {
                      borderColor: "black", borderWidth: 0, alignItems: "flex-start"
                      // marginLeft: 36
                    }
                  }}
                  onDateChange={(date) => {
                    dateFrmState(date)
                    _DateChange(date.split("-")[2]+"-"+date.split("-")[1]+"-"+date.split("-")[0])
                  }}
                />
              </View>
            </View>
          </View>
          {/* Input feilds */}
          <FlatList
            data={InputFeildData}
            renderItem={({ item }) => (
              <View style={{ marginTop: 15, marginBottom: 2, width: "100%", alignItems: "center", paddingHorizontal: 15 }}>
                <InputSucces
                  defaultValue={item.label === "Email" ? userDetail["Email"] : item.label === "Phone" ? userDetail["Phone"] : item.label === "Full Name" ? userDetail["Full Name"] : ""}
                  label={item.label}
                  _func={(text, label) => {
                    let userDetailClone = userDetail
                    userDetail[label] = text
                    userDetailFrmState(userDetailClone)
                  }}
                  iconProps={item.iconProps}
                  keyExtractor={item => item.id}
                />
              </View>
            )}
          />
          <View style={{ marginTop: 15, alignItems: "center", justifyContent: "center", paddingHorizontal: 15 }}>
            <Button label={"Book "} func={() => _CreateBooking(selectedSlot, date, userDetail, shop.shopId, shop)} />
            {isError !== "" && <Text style={{ color: "red" }}>{isError}</Text>}
          </View>
        </ScrollView>
      </View >
    </AppContainer >
  );
}
function mapStateToProp(states) {
  return ({
    isError: states.root.isError,
    thankYou: states.root.thankYou,
    bookings: states.root.bookings,
    currentUser: states.root.currentUser,

  })
}
function mapDispatchToProp(dispatch) {
  return ({
    _DateChange: (date) => {
      dispatch(_DateChange(date));
    },
    _CreateBooking: (selectedSlot, date, userDetail, shop_id, bookings, shop) => {
      dispatch(_CreateBooking(selectedSlot, date, userDetail, shop_id, bookings, shop));
    },
  })
}
export default connect(mapStateToProp, mapDispatchToProp)(Checkout);