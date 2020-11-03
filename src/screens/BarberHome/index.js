import React, { useState, useEffect, useRef } from 'react'
import { ScrollView, Dimensions, View, Text, FlatList, BackHandler, Switch } from 'react-native';
import AppContainer from '../../container/AppContainer';
import NoDataFound from '../../components/NoDataFound';
import Colors from '../../common/colors';
import { connect } from 'react-redux';
import AppointmentCartBarber from '../../components/Appointment/AppointmentCartBarber';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Tab, Tabs } from 'native-base';
import styles from './style'
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import { getCurrentBarberBooking, _loading, getCurrentShop, shopClose } from "../../store/action/action";

const BarberHome = ({ navigation, _getShops, _loading, currentShop, shopClose, currentUser, getCurrentShop, getCurrentBarberBooking, currentBarberBooking }) => {
  var dateInFormat = new Date;
  var dd = String(dateInFormat.getDate()).padStart(2, '0');
  var mm = String(dateInFormat.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = dateInFormat.getFullYear();
  dateInFormat = dd + '-' + mm + '-' + yyyy;
  const [isEnabled, setIsEnabled] = useState(false);
  const [date, dateFrmState] = useState(dateInFormat);
  const [statusLabel, setStatusLabel] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Now you are online");

  useEffect(() => {
    console.log("barbeeeeeeeeeeee")
    getCurrentBarberBooking(currentUser, date)
    getCurrentShop(currentUser.currentUserUid)
    return () => { BackHandler.removeEventListener('hardwareBackPress', BackHandler.exitApp()); }
  }, []);

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    console.log('count changed', currentShop);
    setIsEnabled(currentShop[0].shopStatus)
    _statusMessage()
  }, [currentShop]);
  const _statusMessage = (() => {
    setStatusMessage("now you are" + isEnabled ? "online" : "offline")
    // setTimeout(() => {
    //   setStatusMessage("")
    // }, 3000);

  })
  console.log("wwwwwwwwwwww")
  return (
    <AppContainer drawerProps={false} drawerHide={true} heading={"Home"} FooterHide={true} navigation={navigation}>
      {/* body */}
      <View style={{ flex: 8, width: "100%", backgroundColor: "#f8f8f8" }}>
        <Tabs>
          <Tab
            style={{ backgroundColor: "#F9FAFA" }}
            activeTabStyle={{ backgroundColor: Colors.primary, }}
            tabStyle={{ backgroundColor: Colors.primary, }}
            heading="Bookings">
            <ScrollView contentContainerStyle={{ justifyContent: "center", backgroundColor: "#F9FAFA" }}>
              <View style={{ paddingHorizontal: 10, marginTop: 15, marginBottom: 2, width: "100%", alignItems: "center", }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                  <Text style={{ alignSelf: "flex-start", color: Colors.primary, marginHorizontal: 15, marginBottom: 10 }}>Bussines status</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: Colors.primary,fontSize:11 }}>{`${isEnabled ? "Open for appointment bookings" : "Closed for appointment bookings"}`}</Text>

                    <Switch
                      trackColor={{ false: "#767577", true: "#81b0ff" }}
                      thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={() => {
                        setStatusLabel(true)
                        shopClose(!isEnabled, currentUser.currentUserUid)
                        setIsEnabled(!isEnabled)
                        // setTimeout(() => {
                        // setStatusLabel(false)
                        // }, 2000);
                      }}
                      value={isEnabled}
                    />
                  </View>
                </View>
                {/* {
                 statusMessage&& <Text style={{ color: Colors.primary, }}>{`now you are ${isEnabled?"online":"offline"}`}</Text>
                } */}

                {/* {statusLabel &&
                  <Text style={{ alignSelf: "center", color: Colors.primary, marginHorizontal: 15, marginBottom: 10 }}> for appointment bookings</Text>
                } */}
                <Text style={{ alignSelf: "center", color: Colors.primary,  marginVertical: 10 }}>Select Date</Text>

                <View style={styles.input}>
                  <View style={{ flex: 1.5, alignItems: "center" }}>
                    <AntDesign name={"calendar"} size={20} style={{ color: Colors.primary }} />
                  </View>
                  <View style={{ flex: 8.5 }}>
                    <DatePicker
                      style={{ width: "100%", }}
                      date={date}
                      mode="date"
                      placeholder="Booking Slot"
                      minDate={moment(new Date()).format().split("T")[0].split("-")[2] + "-" + moment(new Date()).format().split("T")[0].split("-")[1] + "-" + moment(new Date()).format().split("T")[0].split("-")[0]}
                      format="DD-MM-YYYY"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      showIcon={false}
                      customStyles={{
                        dateInput: {
                          borderColor: "black", borderWidth: 0, alignItems: "flex-start"
                        }
                      }}
                      onDateChange={(date) => {
                        getCurrentBarberBooking(currentUser, date)
                        dateFrmState(date)
                      }}
                    />
                  </View>
                </View>
              </View>

              {currentBarberBooking.length > 0 ? <View style={{ justifyContent: "center", marginTop: 15, paddingHorizontal: 20 }}>
                <FlatList
                  style={{}}
                  // horizontal={true}
                  data={currentBarberBooking}
                  renderItem={({ item, index }) => (
                    moment(`${item.appointmentDate.split("-")[1]}/${item.appointmentDate.split("-")[0]}/${item.appointmentDate.split("-")[2]} ${item.appointmentTime}`).format("x")
                    >Date.now()-4.32e+7&&   
                    <AppointmentCartBarber data={item} index={index} />
                  )}
                  keyExtractor={item => item.userDetail.Email}
                />
              </View> :
                <View style={{ marginTop: 15, width: "100%", height: 400, }}>
                  <NoDataFound local={require("../../assets/search.png")} text={"No booking found"} />
                </View>}
            </ScrollView>
          </Tab>

          <Tab
            activeTabStyle={{ backgroundColor: Colors.primary, }}
            tabStyle={{ backgroundColor: Colors.primary, }}
            heading="Service">
            <Text>Under devolopement</Text>
          </Tab>

        </Tabs>
      </View >
    </AppContainer >
  );
}

function mapStateToProp(states) {
  return ({
    currentShop: states.root.currentShop,
    currentUser: states.root.currentUser,
    currentBarberBooking: states.root.currentBarberBooking,

  })
}
function mapDispatchToProp(dispatch) {
  return ({
    getCurrentBarberBooking: (currentUser, date) => {
      dispatch(getCurrentBarberBooking(currentUser, date));
    },
    getCurrentShop: (bol, currentUserUid) => {
      dispatch(getCurrentShop(bol, currentUserUid));
    },
    shopClose: (bol, currentUserUid) => {
      dispatch(shopClose(bol, currentUserUid));
    },
    _loading: (bol) => {
      dispatch(_loading(bol));
    },
  })
}
export default connect(mapStateToProp, mapDispatchToProp)(BarberHome);