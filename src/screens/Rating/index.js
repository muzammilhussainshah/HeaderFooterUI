import React, { useState, useEffect, useRef } from 'react'
import { ScrollView, TouchableOpacity, View, Text, FlatList, ActivityIndicator, Switch } from 'react-native';
import AppContainer from '../../container/AppContainer';
import { connect } from 'react-redux';
import Button from "../../components/Button";
import RateThisService from "../../components/RateThisService";
import Colors from "../../common/colors";
import { _CreateRating } from "../../store/action/action";
import AntDesign from 'react-native-vector-icons/AntDesign';

const Rating = ({ navigation, shopId, shopName, _CreateRating, isLoader,currentUser }) => {
  const [star, setStar] = useState("5");
  const [review, setReview] = useState("");
  return (
    <AppContainer drawerProps={false} drawerHide={true} heading={"Rating"} FooterHide={true} navigation={navigation}>
      {/* body */}
      <View style={{ flex: 8, width: "100%", backgroundColor: "#f8f8f8", justifyContent: "center", alignItems: "center" }}>
        <View style={{ borderColor: "black", borderBottomWidth: 0.2, padding: 20, width: "100%", justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 26 }}>
            Thank you!
        </Text>
          <Text style={{ fontSize: 20 }}>
            Your redemption was succesful.
        </Text>
        </View>
        <Text style={{ fontSize: 20, paddingHorizontal: 50, textAlign: "center", marginTop: 20 }}>
          How would you rate your experience at <Text style={{ fontWeight: "bold" }}>{shopName}</Text>?
        </Text>
        <View style={{ justifyContent: "center", marginTop: 15, marginBottom: 15, alignItems: "center", flexDirection: "row" }}>

          <RateThisService _func={(review, star) => {
            setStar(star)
            setReview(review)
          }} />
          {/* {[1, 2, 3, 4, 5].map((v, i) => {
            return (
              <TouchableOpacity
                onPress={() => setStar(i + 1)}
                key={i}>
                <AntDesign
                  name={star > i ? "star" : "staro"}
                  size={35}
                  style={{ margin: 8, color: "#FFA601", fontSize: 35 }} />
              </TouchableOpacity>
            )
          })} */}
        </View>
        {
          !isLoader ?
            <Button label={"Submit "} func={() => _CreateRating(shopId, star, review,currentUser.fullName)} /> :
            <ActivityIndicator size="small" color={Colors.primary} />
        }

        <Text style={{ fontSize: 20, paddingHorizontal: 50, textAlign: "center", marginTop: 20 }}>
          Your ratings will help other privilege members in discovering better places.
        </Text>
      </View >
    </AppContainer >
  );
}

function mapStateToProp(states) {
  return ({
    isLoader: states.root.isLoader,
    currentUser: states.root.currentUser,
  })
}
function mapDispatchToProp(dispatch) {
  return ({
    _CreateRating: (shopId, star, review,fullName) => {
      dispatch(_CreateRating(shopId, star, review,fullName));
    },
  })
}
export default connect(mapStateToProp, mapDispatchToProp)(Rating);