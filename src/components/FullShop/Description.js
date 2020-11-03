import React from 'react'
import { View, Text,  } from 'react-native'
import Colors from '../../common/colors';

export default Description = ({description}) => {
    return (
        <View style={{ backgroundColor: Colors.white }}>
        <View style={{
          justifyContent: "space-between",
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}>
          <View>
            {/* <Text style={{  fontSize: 16, color:Colors.primary, }}>{"Description"}</Text> */}
          </View>
          <View>
            <Text style={{ color:Colors.black, fontSize: 13, }}>{description}</Text>
          </View>
        </View>
      </View>
    )
}