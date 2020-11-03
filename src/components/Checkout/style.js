import { StyleSheet } from 'react-native'
import Colors from '../../common/colors'

export default StyleSheet.create({
    AvailbleSlots: {
        backgroundColor: Colors.white, height: "95%", borderRadius: 15, borderColor: Colors.primary, borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 15,
    },
    timeSlot: {
        width: 70, height: 35,
        borderColor: Colors.primary,
        borderWidth: 2, borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        height: "100%", justifyContent: "center",
        alignItems: "center"
    },
    modalChild: {
        borderRadius: 15, width: "90%",
        height: "35%", backgroundColor: Colors.white,
        justifyContent: "center", alignItems: "center",
    },
    slotsContainer: {
        position: "absolute",
        justifyContent: "center", bottom: 0,
        width: "100%", height: "40%",
        paddingHorizontal: 25
    }
});