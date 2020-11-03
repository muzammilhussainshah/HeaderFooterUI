import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../common/colors';
export default  inputFeildData = [
    {
        id: 0,
        label:"Full Name",
        iconProps:<Entypo name="user" size={20} style={{ color: Colors.primary, }} />,
    },
    {
        id: 1,
        label:"Phone",
        iconProps:<Entypo name="phone" size={20} style={{ color: Colors.primary, }} />,
    },
    {
        id: 2,
        label: 'Email',
        iconProps: <MaterialIcons name="email" size={20}  style={{ color: Colors.primary, }} />
    },
    {
        id: 3,
        label: 'Address',
        iconProps: <FontAwesome5 name="address-card" size={20}  style={{ color: Colors.primary, }} />
    },
];