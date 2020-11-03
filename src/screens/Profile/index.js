import React, { Component } from 'react';
import { View, Text, TouchableOpacity,Modal  } from 'react-native';
import AppContainer from '../../container/AppContainer';
import { WebView } from 'react-native-webview';
import BaseUrl from '../../common/BaseUrl';
// const stripePromise = loadStripe('pk_test_7OcIiZVI0NnpbSG8A1Z2RVXo00208FfVDN');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal:true
    }
};

  render() {
    return (
      <View>
        <TouchableOpacity
        >
          <Text>Profile</Text>
        </TouchableOpacity>
        {/* <Modal visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}>
          <TouchableOpacity
            onPress={() => this.setState({
              showModal: false
            })}
            style={{ position: "absolute", zIndex: 1, right: 0 }}>
            <Icon name='close-circle' style={{ fontSize: 25, color: "#FFCB05" }} />
          </TouchableOpacity  >

          <WebView
            source={
              {
                uri: "http://192.168.0.111:3000/",
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: `price=${this.state.buyerNSeller.price}&name=${this.state.buyerNSeller.name}&catogery=${this.state.buyerNSeller.catogery}`
              }}
              onNavigationStateChange={data =>
             data.title==="success"&&savePaymentInDb()
            }

          />
        </Modal> */}

      </View>
    );
  }
}
