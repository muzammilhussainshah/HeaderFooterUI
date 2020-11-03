import React, { useState, } from 'react'
import { ScrollView, Dimensions, View, Text, TouchableOpacity, BackHandler, Alert } from 'react-native';
import AppContainer from '../../container/AppContainer';
import SearchInput from '../../components/SearchInput';
import Colors from '../../common/colors';
import DeckSwipper from '../../components/DeckSwipper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import { connect } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import { _getShops, _loading } from "../../store/action/action";
const screenHeight = Dimensions.get('window').height;

// const App = (props,) => {
//   const { navigation, _getShops, _loading } = props
//   const [rangInKm, rangInKmState] = useState(5);
//   Geolocation.getCurrentPosition(info => console.warn(info));
//   return (

//   );
// }

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rangInKm: 5
    }
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', BackHandler.exitApp());
  }
  
  render() {
    const { rangInKm } = this.state
    const { navigation, _getShops, _loading,currentUser } = this.props
    console.log(currentUser.subscriptionExpiry,"aaaassssssssssaaaaaa",Date.now()+ 8.64e+7)
    return (
      <AppContainer drawerProps={true} heading={"Home"} navigation={navigation}>
        {/* body */}
        <View style={{ flex: 8, width: "100%", backgroundColor: "#f8f8f8" }}>
          <ScrollView contentContainerStyle={{ justifyContent: "center", }}>
            <View style={{ height: screenHeight / 15, justifyContent: "center", marginHorizontal: "2%", marginVertical: "3%" }}>
              <View style={{ justifyContent: "center", }}>
                {/* <Text style={{ margin: 5, fontWeight: "bold", }}>{currentUser.fullName}</Text> */}
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons name={"location-on"} size={22} style={{ color: "#fa6957" }} />
                  <Text style={{}}>Your Location</Text>
                </View>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <Slider
                    onValueChange={(km) => this.setState({ rangInKm: Math.round(km) })}
                    onSlidingComplete={(km) => {
                      var obj = {
                        rangInKm,
                        lat: 24.98349067,
                        long: 67.05463529,
                      }
                      _loading(true)
                      _getShops(obj)
                    }}
                    value={rangInKm}
                    style={{ width: 200, }}
                    minimumValue={0}
                    maximumValue={20}
                    minimumTrackTintColor={Colors.primary}
                    maximumTrackTintColor="#000000"
                    thumbTintColor={Colors.primary}
                  />
                  <Text style={{ fontSize: 12 }}>Search Radius in {rangInKm} miles</Text>
                </View>
              </View>
            </View>

            <View style={{ height: screenHeight / 15, alignItems: "center", marginTop: "1%" }}>
              <SearchInput />
            </View>

            <View style={{ borderBottomWidth: 0.2, borderBottomColor: Colors.secondary, width: "95%", marginHorizontal: "2%" }}>
              <Text></Text>
            </View>

            <View style={{ marginHorizontal: "3%", height: screenHeight / 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{}}>
                <Text style={{ fontSize: 20, }}>Search results</Text>
              </View>
              <TouchableOpacity style={{}}>
                <Text style={{ color: Colors.primary, textDecorationLine: "underline" }}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: screenHeight / 2, }}>
              <DeckSwipper rangInKm={rangInKm} navigation={navigation} />
            </View>
          </ScrollView>
        </View >
      </AppContainer >
    );
  }
}

function mapStateToProp(states) {
  return ({
    currentUser: states.root.currentUser,

  })
}
function mapDispatchToProp(dispatch) {
  return ({
    _getShops: (obj) => {
      dispatch(_getShops(obj));
    },
    _loading: (bol) => {
      dispatch(_loading(bol));
    },
  })
}
export default connect(mapStateToProp, mapDispatchToProp)(App);