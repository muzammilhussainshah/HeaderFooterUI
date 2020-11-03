import React from 'react'
import { Text, View, Dimensions } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../common/colors';

export default RatingChart = ({ shopRating }) => {
    class shopRatingCollection extends Array {
        sum(key) {
            return this.reduce((a, b) => a + (b[key] || 0), 0);
        }
    }
    const traveler = new shopRatingCollection(...shopRating);

    function ratingBar(rate) {
        let ratingBarInPer = shopRating.filter((Rating) => Rating.star === rate);
        ratingBarInPer = `${ratingBarInPer.length / shopRating.length * 100}%`
        return (ratingBarInPer)
    }

    return (
        <View style={{ paddingHorizontal: "3%", marginTop: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16, color: Colors.primary, }}>Rating and reviews</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 5, alignItems: "flex-end", }}>

                    <View style={{ width: "100%", alignItems: "center", }}>
                        <View style={{ alignItems: "flex-end" }}>
                            <Text style={{ fontSize: 42, color: Colors.primary, }}>{shopRating.length > 0 && (traveler.sum('star') / shopRating.length).toFixed(1)}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "flex-end", }}>
                            {[1, 2, 3, 4, 5].map((item, index) => {
                                return (
                                    shopRating.length > 0 && traveler.sum('star') / shopRating.length >= item ?
                                        <FontAwesome name={"star"} size={17} style={{ color: "orange" }} /> :
                                        traveler.sum('star') / shopRating.length > item - 1 ?
                                            <FontAwesome name={"star-half-empty"} size={17} style={{ color: "orange" }} />
                                            : <FontAwesome name={"star-o"} size={17} style={{ color: "orange" }} />
                                )
                            })}
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <Text style={{ color: Colors.primary, }}>{shopRating.length}</Text>
                        </View>
                    </View>

                </View>
                <View style={{ flex: 5 }}>

                    {[{ rate: 5, percent: ratingBar(5) }, { rate: 4, percent: ratingBar(4) }, { rate: 3, percent: ratingBar(3) }, { rate: 2, percent: ratingBar(2) }, { rate: 1, percent: ratingBar(1) }].map((v, i) => {
                        return (
                            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                                <View><Text>{v.rate}</Text></View>
                                <View style={{ backgroundColor: "#EBEBF3", width: "80%", borderRadius: 100, height: 10 }}>
                                    <View style={{ backgroundColor: "#509AFF", width: v.percent, borderRadius: 100, height: 10 }}>
                                        <Text></Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })}

                </View>
            </View>
        </View>
    )
}
