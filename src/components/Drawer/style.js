import {StyleSheet} from 'react-native'
import Colors from '../../common/colors'

export default StyleSheet.create({
    Animatable: {
        borderRightWidth: 1,
        borderRightColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 55,
        flex: 1, width: "82%", height: "100%", position: "absolute", zIndex: 1,
    },
    circle: {
        width: 75,
        height: 75,
        borderRadius: 75 / 2,
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center",
        margin: 15
    },
});