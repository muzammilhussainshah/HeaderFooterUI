import SignIn from '../screens/Authentiation/SignIn';
import React, { Component } from 'react';
import { Router, Scene, Actions,  } from 'react-native-router-flux'

class Route extends Component {
  render() {
    return (
      <Router navigationBarStyle={{ backgroundColor: "#f27500" }}
        titleStyle={{ color: "white" }}
        tintColor="white">
        <Scene>
          {/* <Scene key='GooglePlacesInput' component={GooglePlacesInput} hideNavBar={true} /> */}
          <Scene key='SignIn' component={SignIn} hideNavBar={true} initial />
        </Scene>
      </Router>
    )
  }
}

export default Route;