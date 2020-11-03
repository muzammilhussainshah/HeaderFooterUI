import React, { useEffect } from 'react'
import { TextInput, View,Text } from 'react-native';
import Colors from '../common/colors';
import styles from './style'
import { connect } from 'react-redux';

const CustomTextarea = ({ label, iconProps, _func, currentUser,defaultValue,multiline }) => {



    useEffect(() => {
        console.log(currentUser, "currentUser", label)
    }, []);
    return (
      <View style={[styles.TextArea,]}>
            <View style={{ flex: 1.5, alignItems: "center" }}>
                {iconProps}
            </View>
            <View style={{ flex: 8.5 }}>
                <TextInput
                multiline={multiline}
                numberOfLines={5}
                maxLength = {500}
                    defaultValue={defaultValue}
                    keyboardType={label === "Phone" ? "numeric" : null}
                    placeholder={label}
                    style={{ borderColor: 'gray', width: "100%" }}
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
export default connect(mapStateToProp, mapDispatchToProp)(CustomTextarea);