import React, { Component } from 'react';
import { PanResponder, FlatList, Text, View, BackHandler, Alert } from 'react-native';
import Colors from '../../common/colors';
import DrawerOpt from '../Drawer/DrawerOpt';
import DrawerData from '../Drawer/DrawerData';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import styles from './style'
import { Actions } from 'react-native-router-flux';
class Drawer extends Component {
    constructor() {
        super()
        this.state = {
            rout: "Feeds",
            animationStyle: ""
        }
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                return !(gestureState.dx === 0 && gestureState.dy === 0)
            },
            onStartShouldSetPanResponderCapture: (evt, gestureState) => {
                return !(gestureState.dx === 0 && gestureState.dy === 0)
            },
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return !(gestureState.dx === 0 && gestureState.dy === 0)
            },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                return !(gestureState.dx === 0 && gestureState.dy === 0)
            },
            onPanResponderGrant: (evt, gestureState) => {
            },
            onPanResponderMove: (evt, gestureState) => {
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx < -40) {
                    this.setState({
                        animationStyle: "fadeOutLeftBig"
                    })
                    this.props.animateParent(false)
                }
            },
            onPanResponderTerminate: (evt, gestureState) => {
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                return true;
            },
        });
    }
    UNSAFE_componentWillMount() {
        var str = this.props.currentUser.fullName;
        console.log(this.props.currentUser)
        var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
        var acronym = matches.join(''); // JSON

        this.setState({
            animationStyle: this.props.animationStyle,acronym
        })
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );



    }
    backAction = () => {
        this.setState({
            animationStyle: "fadeOutLeftBig"
        })
        this.props.animateParent(false)
        return true;
    };
    componentWillUnmount() {
        this.backHandler.remove();
    }
    render() {
        const { currentUser } = this.props
        const { acronym} = this.state
        return (
            <Animatable.View
                // {...this._panResponder.panHandlers}
                animation={this.state.animationStyle}
                duration={500}
                style={[styles.Animatable, { borderRightRadius: 2, }]}>
                <View style={{ flex: 2.7, backgroundColor: Colors.primary, }}>
                    <View style={{ flex: 3, }}>
                        {/* circle */}
                        <View style={styles.circle}>
                            <Text style={{}}>{acronym}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 2, }}>
                        <View style={{
                            margin: 15
                        }}>
                            <Text style={{ color: Colors.white, }}>{currentUser.fullName}</Text>
                            <Text style={{ color: Colors.white, }}>{currentUser.Email}</Text>
                        </View>
                    </View>
                </View>
                <SafeAreaView style={{ flex: 7.3, backgroundColor: Colors.white }}>
                    <FlatList
                        data={DrawerData}
                        renderItem={({ item }) => (
                            <DrawerOpt
                                navigation={this.props.navigation}
                                id={item.id}
                                title={item.title}
                                icon={item.icon}

                                func={(index) => {
                                    // alert("s")
                                    Actions[item.route]()
                                }}
                                keyExtractor={item => item.id}
                            />
                        )}
                    />
                </SafeAreaView>
            </Animatable.View>
        );
    }
}

function mapStateToProp(states) {
    return ({
        isError: states.root.isError,
        thankYou: states.root.thankYou,
        bookings: states.root.bookings,
        currentUser: states.root.currentUser,

    })
}
function mapDispatchToProp(dispatch) {
    return ({
        _DateChange: (date) => {
            dispatch(_DateChange(date));
        },
        _CreateBooking: (selectedSlot, date, userDetail, shop_id, bookings, shop) => {
            dispatch(_CreateBooking(selectedSlot, date, userDetail, shop_id, bookings, shop));
        },
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(Drawer);
