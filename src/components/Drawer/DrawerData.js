import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../common/colors';
export default  data = [
    {
        id: 0,
        title: 'Appointments',
        route: 'Appointments',
        icon: <MaterialIcons name="date-range" size={20} style={{ color: Colors.primary, fontSize: 25 }} />,
    },
    {
        id: 1,
        title: 'Setting',
        route: 'Profile',
        icon: <MaterialIcons name="settings" size={20} style={{ color: Colors.primary, fontSize: 25 }} />
    },
    {
        id: 2,
        route: 'Favorites',
        title: 'Favorites',

        icon: <AntDesign name="heart" size={20} style={{ color: Colors.primary, fontSize: 25 }} />
    },
    {
        id: 3,
        title: 'Logout',
        icon: <AntDesign name="logout" size={20} style={{ color: Colors.primary, fontSize: 25 }} />
    },
];