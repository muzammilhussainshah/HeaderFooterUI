import SignIn from '../screens/Authentiation/SignIn';
import CountryLists from '../component/countryLists';
import Home from '../screens/Home/index.js';
import Profile from '../screens/Pofile/index.js';
import React, { Component } from 'react';
import { Router, Scene, Actions, } from 'react-native-router-flux'

class Route extends Component {
  render() {
    return (
      <Router navigationBarStyle={{ backgroundColor: "#f27500" }}
        titleStyle={{ color: "white" }}
        tintColor="white">
        <Scene>
          {/* <Scene key='GooglePlacesInput' component={GooglePlacesInput} hideNavBar={true} /> */}
          <Scene key='SignIn' component={SignIn} hideNavBar={true} initial />
          <Scene key='Home' component={Home} hideNavBar={true} />
          <Scene key='Profile' component={Profile} hideNavBar={true} />
          <Scene key='CountryLists' component={CountryLists} hideNavBar={true} />
        </Scene>
      </Router>
    )
  }
}

export default Route;