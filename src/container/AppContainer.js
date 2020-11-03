import React, { useState } from 'react'
import { View, Dimensions, TouchableOpacity, } from 'react-native'
import AppHeader from '../components/Header'
import AppFooter from '../components/Footer/Footer'
import Drawer from '../components/Drawer/index'
const screenHeight = Dimensions.get('window').height;
const animateParent = (setDrawer, ) => {
    setTimeout(() => {
        setDrawer(false)
    }, 250);
};
export default AppContainer = (props,) => {
    const [drawer, setDrawer] = useState(false);
    const { drawerProps,navigation,heading,FooterHide,drawerHide } = props;
    return (
        <View style={{ flex: 1, }}>
            {drawerProps && drawer &&
                <Drawer
                navigation={navigation}

                    animationStyle="fadeInLeftBig"
                    animateParent={animateParent.bind( props.x,setDrawer)}
                />}
            {/* drawer close view */}
            {drawer &&
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setDrawer(false)}
                    style={{ position: "absolute", height: screenHeight, width: "18%", right: 0, zIndex: 1, }}>
                </TouchableOpacity>
            }

            {heading&&<AppHeader
                heading={heading}
                drawerHide={drawerHide}
                drawer={drawerProps}
                navigation={navigation}
                func={() => setDrawer(true)}
            />}
            {props.children}
            {!FooterHide&&<AppFooter navigation={navigation} heading={heading}  />}
        </View>
    )
}