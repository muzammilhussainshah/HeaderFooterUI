import React, { useEffect } from 'react'
import { TextInput, View, } from 'react-native';
import Colors from '../common/colors';
import styles from './style'
import { connect } from 'react-redux';

const InputSucces = ({ label, iconProps, _func, currentUser, defaultValue, multiline }) => {



    useEffect(() => {
        console.log(currentUser, "currentUser", iconProps, label)
    }, []);
    return (
        <View style={[styles.input,]}>
            <View style={{ flex: 1.5, alignItems: "center" }}>
                {iconProps}
            </View>
            <View style={{ flex: 8.5 }}>
                <TextInput
                autoCapitalize="none"
                    multiline={multiline}
                    defaultValue={defaultValue}
                    keyboardType={(label === "Phone" || label === "Hourly price") ? "numeric" : null}
                    placeholder={label}
                    style={{ height: 40, borderColor: 'gray', width: "100%" }}
                    onChangeText={text => _func(text, label)}
                //   value={value}
                />
            </View>
        </View>
    );
}



function mapStateToProp(states) {
    return ({

        currentUser: states.root.currentUser,

    })
}
function mapDispatchToProp(dispatch) {
    return ({
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(InputSucces);