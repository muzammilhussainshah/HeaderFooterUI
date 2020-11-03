import React, { Component, } from 'react'
import { ScrollView, View, Text, TouchableOpacity, FlatList, Modal } from 'react-native';
import Colors from '../../common/colors';
import styles from './style'
import { _loading, _getBookings } from '../../store/action/action'
import { connect } from 'react-redux';
import SlotsLoader from '../Loaders/SlotsLoader'
import AvailbleMintsModal from '../../components/Checkout/AvailbleMintsModal'
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

class AvailbleSlots extends Component {
    constructor() {
        super()
        this.state = {
            selectedSlot: "",
            modalVisible: false,selectedSlotIndex:"",
            availBleSlots: "", AvailblemintData: []
        }
    }

    BookingCall = (date) => {
        const { shop, _getBookings, } = this.props
        _getBookings(shop, moment(date).format('DD-MM-YYYY'))
    }
    componentWillMount() {
        const { date, } = this.props
        this.BookingCall(date)
    }
    componentWillReceiveProps(nextProps) {
        const { date, } = this.props
        // console.log(nextProps, "nextPropsnextProps")
        if (nextProps.date !== date) {
            this.BookingCall(nextProps.date)
        }
        else if (nextProps.availBleSlots) {
            const { availBleSlots } = this.props
            this.setState({ availBleSlots })
        }
    }

    render() {
        const { navigation, isLoader, _func, date, shop } = this.props
        const { selectedSlot, modalVisible, selectedSlotIndex, AvailblemintData, availBleSlots, timeRange } = this.state
        return (
            <View
                onPress={() => Actions.pop()}
                style={styles.slotsContainer}>
                {modalVisible && <AvailbleMintsModal
                    // availBleSlots={availBleSlots}
                    // timeRange={timeRange}
                    modalVisible={modalVisible}
                    // selectedSlotIndex={selectedSlotIndex}
                    selectedSlot={selectedSlot}
                    // AvailblemintData={AvailblemintData}
                    _func={(selectedSlot, bol) => {
                        console.log(selectedSlot, bol, "selectedSlot,bol", availBleSlots)
                        let availBleSlotsClone = availBleSlots
                        availBleSlotsClone.splice(selectedSlotIndex, 1, selectedSlot)
                        this.setState({ modalVisible: bol, availBleSlots: availBleSlotsClone }, () => {
                            _func(selectedSlot)
                        })
                    }}
                    _close={(bol) => {
                        this.setState({ modalVisible: bol, selectedSlot: "",selectedSlotIndex:"" })
                    }}
                />}
                <View style={styles.AvailbleSlots}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true} contentContainerStyle={{ alignItems: "center", padding: 15, justifyContent: "center" }} >
                        {!isLoader && availBleSlots && moment(date).format('LLLL').split(",")[0] !== shop.closingDay && shop.shopStatus

                            ? <FlatList
                                horizontal={true}
                                data={availBleSlots}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ modalVisible: true, selectedSlot: item, selectedSlotIndex: index })
                                    }}
                                        style={[styles.timeSlot, {
                                            marginLeft: index === 0 ? 0 : 15,
                                            backgroundColor: index === selectedSlotIndex ? Colors.primary : null
                                        }]}>
                                        <Text style={{ color: index === selectedSlotIndex ? Colors.white : Colors.black,fontSize:12 }}>
                                            {/* {item.split(" ")[0]+" "}  */}
                                            {item.toLowerCase()}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                            : (moment(date).format('LLLL').split(",")[0] === shop.closingDay || shop.shopStatus === false) ?
                                // <View style={{backgroundColor:"green",}}>
                                <Text style={{ fontSize: 16, color: Colors.secondary }}>The business is closed</Text>
                                // </View>
                                :
                                <SlotsLoader />
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}

function mapStateToProp(states) {
    return ({
        date: states.root.dateChange,
        isLoader: states.root.isLoader,
        bookings: states.root.bookings,
        availBleSlots: states.root.availBleSlots,
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        _getBookings: (shop, date) => {
            dispatch(_getBookings(shop, date));
        },
        _loading: (bol) => {
            dispatch(_loading(bol));
        },

    })
}
export default connect(mapStateToProp, mapDispatchToProp)(AvailbleSlots);