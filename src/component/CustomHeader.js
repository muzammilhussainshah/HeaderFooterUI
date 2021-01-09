import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Colors from '../common/colors';
import { Container, Header, Item, Input, Icon, Button,  } from 'native-base';

const CustomHeader = ({ iconRight, iconLeft }) => (
    <View style={styles.header}>
        <TouchableOpacity style={{ flex: 1.5, alignItems: "center" }}>
            {iconLeft && iconLeft}
        </TouchableOpacity>
        <View style={{ flex: 8,width:"100%", backgroundColor:"white" }}>
            
        <Header style={{width:"100%"}} searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        </View>
        <TouchableOpacity style={{ flex: .5, }}>
            {iconRight && iconRight}
        </TouchableOpacity>
    </View>
);

function mapStateToProp(state) {
    return ({
    })
}
function mapDispatchToProp(dispatch) {
    return ({
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(CustomHeader);

const styles = StyleSheet.create({
    header: { flex:1,width:"100%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: Colors.primary, borderBottomEndRadius: 20, borderBottomStartRadius: 20 },
});