import Profile from '../screens/Pofile/index';
import React, { Component } from 'react';
import { Router, Scene,  } from 'react-native-router-flux'

class Route extends Component {
  render() {
    return (
      <Router navigationBarStyle={{ backgroundColor: "#f27500" }}
        titleStyle={{ color: "white" }}
        tintColor="white">
        <Scene>
          <Scene key='Profile' component={Profile} hideNavBar={true} />
        </Scene>
      </Router>
    )
  }
}

export default Route;