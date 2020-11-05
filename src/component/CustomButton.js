import React from 'react'
import { Text, TouchableOpacity } from 'react-native';

export default CustomButton = ({ label, _login }) => {
    return (
        <TouchableOpacity onPress={() => _login()}
            style={{
                backgroundColor: "#00D9B6",
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
