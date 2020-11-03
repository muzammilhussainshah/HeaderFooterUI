import React from 'react'
import { Text, View, TouchableOpacity, FlatList, } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../common/colors';

export default class ClientReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            star: 0
        };
    }
    UNSAFE_componentWillMount() {
        const { dummyData } = this.props
        this.setState({
            star: dummyData.Ratings[1].UserRating
        })
    }
    render() {
        const { rate, dummyData } = this.props
        const { star } = this.state
        console.log(rate, "raterateraterate")
        return (
            <View style={{ paddingHorizontal: "3%" }}>
                <View style={{ flexDirection: "row", flex: 1 }}>
                    <View style={{ flex: 1.5, }}>
                        <View style={{ backgroundColor: "#BC1CEA", width: 42, height: 42, borderRadius: 21, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 20, color: Colors.white }}>{rate.fullName[0]}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 7, justifyContent: "center", paddingHorizontal: 25 }}>
                        <Text style={{ color: Colors.primary }}>{rate.fullName}</Text>
                    </View>
                    <View style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}>
                        <View>
                            <Entypo name="dots-three-vertical" style={{ color: Colors.primary, fontSize: 18 }} />
                        </View>
                    </View>
                </View>

                <View style={{ paddingVertical: "3%" }}>
                    <View style={{ flexDirection: "row", }}>

                        <FlatList
                            style={{ flexDirection: "row" }}
                            horizontal={true}
                            data={[1, 2, 3, 4, 5]}
                            renderItem={({ item }) => (
                                rate.star >=  item ?
                                    <FontAwesome name={"star"} size={17} style={{ color: "orange" }} />
                                    : <FontAwesome name={"star-o"} size={17} style={{ color: "orange" }} />
                            )}
                            keyExtractor={item => item}
                        />

                        <View style={{ paddingHorizontal: 15 }}>
                            <Text style={{ color: Colors.primary, }}>{rate.date}</Text>
                        </View>

                    </View>
                    <View style={{ paddingVertical: 10,borderBottomColor:Colors.secondary,borderBottomWidth:0.2}}>
                        <Text style={{ color: Colors.primary, }}>{rate.review}</Text>
                    </View>
                </View>
            </View>
        )
    }
}
