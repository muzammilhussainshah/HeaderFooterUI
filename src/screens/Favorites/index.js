import React, { useEffect } from 'react'
import { View, FlatList, Dimensions, ScrollView } from 'react-native'
import Colors from '../../common/colors'
import AppContainer from '../../container/AppContainer';
const screenHeight = Dimensions.get('window').height;
import { connect } from 'react-redux';
import FavoriteCart from '../../components/FavoriteCart';
import { _favorite } from '../../store/action/action';
import NoDataFound from '../../components/NoDataFound';
class Favorite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rangInKm: 5
    }
  };
  render() {
    const { favoriteShops, navigation, currentUser, _favorite } = this.props
    return (
      <AppContainer drawerProps={true} heading={"Favourites"} navigation={navigation}>
        {/* body */}
        <View style={{ flex: 8, width: "100%", backgroundColor: "#f8f8f8" }}>
          {favoriteShops.length > 0 ?
            <ScrollView contentContainerStyle={{ justifyContent: "center", }}>

              <View style={{ justifyContent: "center", marginTop: 2 }}>
                <FlatList
                  style={{}}
                  // horizontal={true}
                  data={favoriteShops}
                  renderItem={({ item, index }) => (
                    <FavoriteCart data={item} navigation={navigation} _func={(shop) => { _favorite(currentUser, shop, false, favoriteShops) }} />
                  )}
                  keyExtractor={item => item.shopId}
                />
              </View>
            </ScrollView>
            : <View style={{flex:1,justifyContent:"center"}}>
              <NoDataFound local={require("../../assets/favorite.png")} />
            </View >
          }
        </View >
      </AppContainer >
    );
  }
}

function mapStateToProp(states) {
  return ({
    favoriteShops: states.root.favoriteShops,
    currentUser: states.root.currentUser,

  })
}
function mapDispatchToProp(dispatch) {
  return ({
    _favorite: (currentUser, shop, bol, favoriteShops) => {
      dispatch(_favorite(currentUser, shop, bol, favoriteShops));
    },
  })
}
export default connect(mapStateToProp, mapDispatchToProp)(Favorite);