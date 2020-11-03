import React from 'react'
import { ScrollView, View, TouchableOpacity, FlatList } from 'react-native';
import AppContainer from '../../container/AppContainer';
import Title from '../../components/FullShop/Title';
import Button from '../../components/Button';
import Description from '../../components/FullShop/Description';
import ContactMap from '../../components/FullShop/ContactMap';
import RatingChart from '../../components/RatingChart';
import ClientReview from '../../components/ClientReview';
import dummyData from '../../components/dummyData';
import Colors from '../../common/colors';
import { _favorite } from '../../store/action/action';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { SliderBox } from "react-native-image-slider-box";
import { Actions } from 'react-native-router-flux';
const FullShop = ({ navigation, currentUser, ownerId, account, _favorite, favoriteShops, shopName, shopStatus, price, phone, workingHours, shopId, description, shopRating, address, coverImg, location, closingDay }) => {

  console.log(shopName, "**********deck*aaaa**********", navigation)


  // let name = navigation.getParam('name',)
  // let phone = navigation.getParam('phone',)
  // let workingHours = navigation.getParam('workingHours',)
  // let shopId = navigation.getParam('shopId',)
  // let description = navigation.getParam('description',)
  // let shopRating = navigation.getParam('shopRating',)
  // let address = navigation.getParam('address',)
  // let coverImg = navigation.getParam('coverImg',)
  // let location = navigation.getParam('location',)
  // let closingDay = navigation.getParam('closingDay',)
  let shop = { shopName, price, phone, ownerId, account, workingHours, shopId, description, shopRating, shopStatus, address, coverImg, location, closingDay }
  console.log(shop, "currentUser")
  const favorite = (bol) => {
    // alert(bol)
    _favorite(currentUser, shop, bol, favoriteShops)
  }


  //   const [rangInKm, rangInKmState] = useState(5);
  return (
    <AppContainer drawerProps={false} navigation={navigation} FooterHide={true} >
      {/* body */}
      <View style={{
        flex: 8, width: "100%",
        backgroundColor: "#f8f8f8",
        alignItems: "center"
      }}>
        <ScrollView contentContainerStyle={{ justifyContent: "center", paddingBottom: "5%" }}>
          {/* image slider */}
          <View style={{ backgroundColor: Colors.black, }}>
            <SliderBox resizeMode={'contain'}
              images={coverImg && coverImg} />
            <TouchableOpacity
              onPress={() => Actions.pop()}
              style={{
                position: "absolute", padding: 10
              }}>
              <AntDesign name={"arrowleft"} size={32} style={{ color: Colors.white }} />
            </TouchableOpacity>
          </View>
          {/* image slider */}
          <Title shopName={shopName && shopName} price={price && price} shopRating={shopRating && shopRating} address={address && address} shopId={shopId && shopId} _func={(bol) => favorite(bol)} />
          <View style={{ marginTop: 6 }}>
            <Description description={description && description} />
          </View>
          <View style={{ marginTop: 6 }}>
            <ContactMap location={location && location} phone={phone && phone} />
          </View>
          <View style={{ marginTop: 6, alignItems: "center" }}>
            <Button label={"Book Now"} func={() => navigation.push("Checkout", { shop })} />
          </View>

          <RatingChart shopRating={shopRating} />
          {shopRating.map((rate, index) => {
            return <ClientReview rate={rate} dummyData={dummyData}/>
          })}
        </ScrollView>
      </View >
    </AppContainer >
  );
}
function mapStateToProp(states) {
  return ({
    currentUser: states.root.currentUser,
    favoriteShops: states.root.favoriteShops,

  })
}
function mapDispatchToProp(dispatch) {
  return ({
    _favorite: (currentUser, shop, bol, favoriteShops) => {
      dispatch(_favorite(currentUser, shop, bol, favoriteShops));
    },
  })
}
export default connect(mapStateToProp, mapDispatchToProp)(FullShop);