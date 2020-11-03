import { StyleSheet, Dimensions } from 'react-native'
import Colors from '../../common/colors'
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    topBarContainer: {
        height: 400,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
    },
    topBarText: { color: Colors.secondaryColor, fontSize: 16, textAlign: 'center' },
    mapContainer: {
        // ...StyleSheet.absoluteFillObject,
        flex: 0.9,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        height: 150,

        ...StyleSheet.absoluteFillObject,
    },
    title: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: "center"
    },
    titleStar: {
        flexDirection: "row",
        // justifyContent: "space-between",
        // paddingVertical: 0,
        paddingHorizontal: 10,
        alignItems: "center"
    },
});