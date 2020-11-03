import React,{useState,useEffect} from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../common/colors';
import { Actions } from 'react-native-router-flux';
export default FavoriteCart = ({ data,_func,navigation }) => {
  const [favorite, favoriteState] = useState(true);
  const {shopName,price,shopRating,address,coverImg,location,phone,workingHours,description,shopId,closingDay} = data;
//   useEffect(() => {
//     var array = favoriteShops
//     array.filter(arr => arr.shopId === shopId)[0] && favoriteState(true)
// }, []);
  return (
    <TouchableOpacity
    onPress={()=> Actions.FullShop({shopName:shopName,price, shopRating, address, coverImg,location,phone,description,workingHours,shopId,closingDay,navigation})}
    style={{ flexDirection: "row", backgroundColor: Colors.white, marginBottom: 5, height: 100, padding: 10 }}>
      <View style={{ flex: 3 }}>
        <Image
          // resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
          source={{ uri: data.coverImg[0] }}
        />
      </View>
      <View style={{ flex: 6, justifyContent: "center",paddingLeft:5 }}>
        <Text style={{ fontWeight: "bold" }}>{data.price} £ / hr</Text>
        <Text style={{ fontWeight: "bold" }}>{data.shopName}</Text>
        <Text style={{ fontWeight: "bold" }}>{data.address}</Text>
        <Text style={{ fontWeight: "bold" }}>{data.phone}</Text>
      </View>
      <View style={{ flex: 1, }}>
        <TouchableOpacity 
        onPress={() => {
          _func(data)
          favoriteState(!favorite)
      }}
        >
          <AntDesign name={ "heart"} size={25} style={{ color: Colors.black }} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}