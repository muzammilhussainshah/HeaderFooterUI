import React from 'react';
import Zocial from 'react-native-vector-icons/Zocial';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../common/colors';
export const SignInData = [
    {
        id: 0,
        label: 'Full Name',
        icon: <AntDesign name="user" size={20} style={{ color: Colors.primary, }} />,
    },
    {
        id: 1,
        label: 'Email',
        icon: <MaterialIcons name="email" size={20} style={{ color: Colors.primary, }} />
    },
    {
        id: 2,
        label: 'Phone',
        icon: <AntDesign name="phone" size={20} style={{ color: Colors.primary, }} />
    },
    {
        id: 3,
        label: 'Password',
        icon: <MaterialIcons name="lock-open" size={20} style={{ color: Colors.primary, }} />
    },
    {
        id: 4,
        label: 'Confirm Password',
        icon: <MaterialIcons name="lock-open" size={20} style={{ color: Colors.primary, }} />
    },
    {
        id: 5,
        label: 'Business Name',
        icon: <FontAwesome5 name="shopping-basket" size={20} style={{ color: Colors.primary, }} />
    },
    {
        id: 6,
        label: 'Hourly price',
        icon: <Entypo name="price-tag" size={20} style={{ color: Colors.primary, }} />
    },
    {
        id: 7,
        label: 'Number & Street Name',
        icon: <FontAwesome5 name="house-damage" size={20} style={{ color: Colors.primary, }} />
    },
    {
        id: 8,
        label: 'City',
        icon: <MaterialIcons name="location-city" size={20} style={{ color: Colors.primary, }} />
    },
    {
        id: 9,
        label: 'Postcode',
        icon: <Zocial name="posterous" size={20} style={{ color: Colors.primary, }} />
    },
    {
        id: 10,
        label: 'Description',
        icon: <MaterialIcons name="description" size={20} style={{ color: Colors.primary, }} />
    },
];