import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, FlatList } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../common/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style'
import { connect } from 'react-redux';

const Title = ({ shopName, price, shopRating, address, _func, shopId, favoriteShops }) => {
    const [favorite, favoriteState] = useState(false);
    useEffect(() => {
        var array = favoriteShops
        array.filter(arr => arr.shopId === shopId)[0] && favoriteState(true)
    }, []);

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
     }


     class shopRatingCollection extends Array {
        sum(key) {
            return this.reduce((a, b) => a + (b[key] || 0), 0);
        }
    }
    const traveler = new shopRatingCollection(...shopRating);
    
    console.log(traveler.sum('star')); //~> 235
     
    return (
        <View style={{ backgroundColor: Colors.white }}>
            <View style={styles.title}>
                <View>
                    <Text style={{ fontWeight: "bold", fontSize: 16, color: Colors.primary }}>{titleCase(shopName)}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    _func(!favorite)
                    favoriteState(!favorite)
                }}>
                    <AntDesign name={favorite ? "heart" : "hearto"} size={25} style={{ color: Colors.black }} />
                </TouchableOpacity>
            </View>
            <View style={styles.titleStar}>
                <FlatList
                    style={{ flexDirection: "row" }}
                    horizontal={true}
                    data={[ 1, 2, 3, 4,5]}
                    renderItem={({ item }) => (
                        traveler.sum('star')/shopRating.length>= item ?
                            <FontAwesome name={"star"} size={13} style={{ color: "orange" }} />:
                            traveler.sum('star') / shopRating.length > item - 1 ?
                            <FontAwesome name={"star-half-empty"} size={13} style={{ color: "orange" }} />
                            : <FontAwesome name={"star-o"} size={13} style={{ color: "orange" }} />
                    )}
                    keyExtractor={item => item}
                />

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons name={"location-on"} size={22} style={{ color: "#fa6957" }} />
                    <Text style={{fontSize:12}}>{address[0]+", "+address[1]+", "+address[2]}</Text>
                </View>

            </View>
            <View style={styles.titleStar}>
                <Text style={{ fontWeight: "bold" }}>{price} £ / hr </Text>
            </View>
        </View>
    )
}



function mapStateToProp(states) {
    return ({
        favoriteShops: states.root.favoriteShops,
    })
}
function mapDispatchToProp(dispatch) {
    return ({
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(Title);