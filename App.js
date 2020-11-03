import React, { Component } from 'react';
import { StyleSheet,StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import StackNavigation from './src/navigation/StackNavigation'
import { YellowBox } from 'react-native'
import Colors  from './src/common/colors';

export default class App extends Component {
  componentDidMount() {
    console.disableYellowBox = true
    // YellowBox.ignoreWarnings([
    //   'VirtualizedLists should never be nested', // TODO: Remove when fixed
    // ])
  }
  render() {
    return (
      <Provider store={store}>
              {/* <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = {Colors.primary} translucent = {true}/> */}

        <StackNavigation />
      {/* <Text>sssssssss</Text> */}
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
});
