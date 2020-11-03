import React, { useEffect, useState } from 'react'
import { View, FlatList, Dimensions, ScrollView, Text } from 'react-native'
import Colors from '../../common/colors'
import AppContainer from '../../container/AppContainer';
const screenHeight = Dimensions.get('window').height;
import { connect } from 'react-redux';
import AppointmentCart from '../../components/Appointment/AppointmentCart';
import { getCurrentUserBooking } from '../../store/action/action';
import styles from './style'
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-datepicker'
import NoDataFound from '../../components/NoDataFound';
const Appointments = ({ navigation, currentUser, getCurrentUserBooking, currentUserBooking }) => {
  var dateInFormat = new Date;
  var dd = String(dateInFormat.getDate()).padStart(2, '0');
  var mm = String(dateInFormat.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = dateInFormat.getFullYear();
  dateInFormat = yyyy + '-' + mm + '-' + dd;
  const [date, dateFrmState] = useState(dateInFormat);
  useEffect(() => {
    getCurrentUserBooking(currentUser)
  }, []);


  console.log(Date.now()-4.32e+7,"5555asasasas555555",Date.now())
  return (
    <AppContainer drawerProps={true} heading={"Appointments"} navigation={navigation}>
      {/* body */}
      <View style={{ flex: 8, width: "100%", backgroundColor: "#f8f8f8" }}>
        {currentUserBooking.length > 0 ?
          <ScrollView contentContainerStyle={{ justifyContent: "center", }}>

            {/* <View style={{paddingHorizontal:10, marginTop: 15, marginBottom: 2, width: "100%", alignItems: "center",  }}>
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
                  minDate={moment(new Date()).format().split("T")[0]}
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  customStyles={{
                    dateInput: {
                      borderColor: "black", borderWidth: 0, alignItems: "flex-start"
                    }
                  }}
                  onDateChange={(date) => {
                    dateFrmState(date)
                  }}
                />
              </View>
            </View>
          </View> */}

            <View style={{ justifyContent: "center", marginTop: 15, paddingHorizontal: 20 }}>
              <FlatList
                style={{}}
                // horizontal={true}
                data={currentUserBooking}
                renderItem={({ item, index }) => (
                  moment(`${item.appointmentDate.split("-")[1]}/${item.appointmentDate.split("-")[0]}/${item.appointmentDate.split("-")[2]} ${item.appointmentTime}`).format("x")
                  >Date.now()-4.32e+7&&   
                  <AppointmentCart data={item} index={index} />
                  // console.log(Date.now(),"+++++-559++++++",moment(`${item.appointmentDate.split("-")[1]}/${item.appointmentDate.split("-")[0]}/${item.appointmentDate.split("-")[2]} ${item.appointmentTime}`).format("x"),new Date(`${item.appointmentDate.split("-")[1]}-${item.appointmentDate.split("-")[0]}-${item.appointmentDate.split("-")[2]} ${item.appointmentTime}` ).getTime())
                  )}
                // inverted
                keyExtractor={item => item.userDetail.Email}
              />
              

            </View>
          </ScrollView>
          : <View style={{ flex: 1, justifyContent: "center" }}>
            <NoDataFound local={require("../../assets/search.png")} text={"No appointment found"} />
          </View >
        }
      </View >
    </AppContainer >
  );
}

function mapStateToProp(states) {
  return ({
    currentUser: states.root.currentUser,
    currentUserBooking: states.root.currentUserBooking,

  })
}
function mapDispatchToProp(dispatch) {
  return ({
    getCurrentUserBooking: (currentUser,) => {
      dispatch(getCurrentUserBooking(currentUser,));
    },
  })
}
export default connect(mapStateToProp, mapDispatchToProp)(Appointments);