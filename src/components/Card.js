import React,{useEffect} from 'react'
import { View,  TouchableOpacity, Image, Text, FlatList,BackHandler,Alert } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './style'
import BaseUrl from '../common/BaseUrl';
import { Actions } from 'react-native-router-flux';

export default ShopCard = ({ name,shopStatus,price,ownerId,account, shopRating, address, coverImg,location,phone,workingHours,description,navigation,shopId,closingDay }) => {
    // console.log({name, shopRating, address, coverImg,location,phone,description,workingHours,shopId,closingDay,navigation},"coverImgcclosingDayoverImg")
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
    return (
        <TouchableOpacity 
        onPress={()=> Actions.FullShop({shopName:name,shopStatus,price,ownerId, shopRating,account, address, coverImg,location,phone,description,workingHours,shopId,closingDay,navigation})}
         style={styles.cardContainer}>
            <View style={{ width: 250, }}>
                <View style={{ flex: 2, }}>
                    <View style={styles.cardFilter}>
                        <Text></Text>
                    </View>
                    <Image style={{
                        width: "100%", height: "100%",
                        borderTopLeftRadius: 6,
                        borderTopRightRadius: 6,
                    }}
                        resizeMode="cover"
                        source={{ uri: coverImg[0] }}
                    />
                </View>
                <View style={styles.cardBodyContainer}>
                    <View style={{ flex: 5, borderBottomColor: "#F1EAF2", borderBottomWidth: 0.2 }}>
                        <View>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>{titleCase(name)}</Text>
                        </View>
                        <View>
                            <Text style={{ color: "#7F7F7F", fontSize: 12 }}>{address[0]+", "+address[1]+", "+address[2]}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 5 }}>
                        {/* <View>
                            <Text style={{ color: "#7F7F7F", fontSize: 12 }}>Opening time: 9:00 Am</Text>
                        </View> */}
                        <View>
                            <Text style={{ color: "#7F7F7F", fontSize: 12 }}>{workingHours&&workingHours[0]} to {workingHours&&workingHours[1]}</Text>
                        </View>
                        <View>
                            <Text style={{ color: "#7F7F7F", fontSize: 12 }}>{phone}</Text>
                        </View>
                        <View style={{ justifyContent: "center", marginTop: 2 }}>
                            <FlatList
                                style={{ flexDirection: "row" }}
                                horizontal={true}
                                data={[ 1, 2, 3, 4,5]}
                                renderItem={({ item }) => (
                                    shopRating.length>0&&traveler.sum('star')/shopRating.length>= item ?
                                        <FontAwesome name={"star"} size={17} style={{ color: "orange" }} />:
                                        traveler.sum('star') / shopRating.length > item - 1 ?
                                            <FontAwesome name={"star-half-empty"} size={17} style={{ color: "orange" }} />
                                            : <FontAwesome name={"star-o"} size={17} style={{ color: "orange" }} />
                                )}
                                keyExtractor={item => item}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}