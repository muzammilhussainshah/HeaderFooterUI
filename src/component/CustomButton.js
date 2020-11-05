import React from 'react'
import { Text, TouchableOpacity } from 'react-native';
import Colors from '../common/colors';

export default CustomButton = ({ label, _login }) => {
    return (
        <TouchableOpacity onPress={() => _login()}
            style={{
                backgroundColor: Colors.reverse,
                width: "90%", justifyContent: "center",
                height: 55, borderRadius: 15
            }}>
            <Text style={{
                alignSelf: "center", color: "white",
                fontWeight: "bold", fontSize: 18
            }}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}
