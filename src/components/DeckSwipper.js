
import React, { useState, useEffect } from 'react';
import { FlatList, BackHandler, Alert } from 'react-native';
import ShopCard from '../components/Card';
import InfiniteScroll from 'react-native-infinite-scroll';
import CardLoader from '../components/Loaders/CardLoader';
import { connect } from 'react-redux';
import { _getShops, _getFavShops, _loading } from '../store/action/action';
import NoDataFound from '../components/NoDataFound';
const DeckSwipper = ({ rangInKm, isLoader, shops, _getShops, _getFavShops, _loading, navigation, currentUser }) => {
    const [offsetNearByShops, offsetNearByShopsState] = useState(0);
    useEffect(() => {
        console.log(require("../assets/search.png"), "searchsearch",)
        _loading(true)
        var obj = {
            rangInKm,
            lat: 24.98349067,
            long: 67.05463529,
            currentUserUid: currentUser.currentUserUid,
        }
        // console.log(currentUser,"deck")
        _getShops(obj)
        _getFavShops(currentUser.currentUserUid)

    }, []);
    return (
        <InfiniteScroll
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        // onLoadMoreAsync={this._onEndReachedNeabyShops.bind(this)}
        >
            {isLoader  ?
                <CardLoader /> :
                shops.length !== 0 ? <FlatList
                    horizontal={true}
                    data={shops}
                    renderItem={({ item }) => (
                        item.subscriptionExpiry>Date.now()?
                        <ShopCard
                            shopId={item._id}
                            closingDay={item.closingDay}
                            name={item.name}
                            shopStatus={item.shopStatus}
                            price={item.price}
                            address={item.address}
                            phone={item.phone}
                            account={item.account}
                            workingHours={item.workingHours}
                            ownerId={item.ownerId}
                            description={item.description}
                            shopRating={item.shopRating}
                            coverImg={item.coverImg}
                            workingHours={item.workingHours}
                            location={item.location}
                            navigation={navigation}
                        />
                        :null
                    )}
                    keyExtractor={item => item._id}
                /> :
                    <NoDataFound local={require("../assets/search.png")} text={"No barber found"} />
            }
        </InfiniteScroll>
    )
}
function mapStateToProp(states) {
    return ({
        shops: states.root.shops,
        isLoader: states.root.isLoader,
        currentUser: states.root.currentUser,
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        _getShops: (obj) => {
            dispatch(_getShops(obj));
        },
        _getFavShops: (currentUserUid) => {
            dispatch(_getFavShops(currentUserUid));
        },
        _loading: (bol) => {
            dispatch(_loading(bol));
        },
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(DeckSwipper);