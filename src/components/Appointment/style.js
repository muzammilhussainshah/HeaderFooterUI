import { StyleSheet, Dimensions } from 'react-native'
import Colors from '../../common/colors'
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
  
    phone: {
        elevation:10,backgroundColor:Colors.primary,width:40,height:40,borderRadius:20,justifyContent:"center",alignItems:"center"
    },
    coverImg: {
       width:100,height:100,borderRadius:50,elevation:100
    },
});