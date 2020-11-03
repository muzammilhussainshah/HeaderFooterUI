import { StyleSheet, Dimensions } from 'react-native'
import Colors from '../../common/colors'
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    Button: {
        width: "95%", height: 45, backgroundColor: Colors.primary,
        justifyContent: "center", alignItems: "center",
        borderRadius: 5, shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    cardContainer: {
        margin: 10,
        flexDirection: "row",
        marginBottom: 20,
        height: screenHeight / 2,
        width: 250,
    },
    cardFilter: {
        position: "absolute", zIndex: 1,
        width: "100%", height: "100%",
        backgroundColor: 'rgba(189, 16, 224, 0.1)'
    },
    cardBodyContainer: {
        top: -20,
        height: 50,
        borderBottomRightRadius: 6, elevation: 3,
        borderBottomLeftRadius: 6,
        padding: "5%",
        borderColor: "#E8E6E7",
        borderWidth: 1,
        flex: 1,
        backgroundColor: "white",
    },
    input: {
        width: "95%", height: 50,
        backgroundColor: Colors.white,
        borderRadius: 100,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
   
    TextArea: {
        width: "95%", 
        backgroundColor: Colors.white,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
   
    timeSlot: {
        width: 70, height: 35,
        borderColor: Colors.primary,
        borderWidth: 2, borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
});