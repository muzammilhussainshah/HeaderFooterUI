import React from 'react'
import { Text, TouchableOpacity, Dimensions } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style'

export default FooterTab = ({ id, title, iconName, color, func }) => {
    return (
        <TouchableOpacity onPress={() => func(id)}
            style={styles.footerTabs}>
            <MaterialIcons name={iconName} size={22} style={{ color: color }} />
            <Text style={{ fontSize: 12, color: color }}>{title}</Text>
        </TouchableOpacity>
    )
}
