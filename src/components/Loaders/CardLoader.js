
import React from 'react';
import { View, Dimensions } from 'react-native';
import ContentLoader, { Rect,  } from 'react-content-loader/native'
const ScreenWidth = Dimensions.get('window').width;
const CardLoader = () => (
    <View style={{  width: ScreenWidth, padding: 5 }}>
        <ContentLoader
        //  backgroundColor={"#E7F0EB"}
        //  foregroundColor={'#999'}
            active={true}
            primaryColor="rgba(0, 0, 0, 1)"
            viewBox="0 0 1000 900" style={{   }}>
            <Rect x="0" y="0" rx="0" ry="4" width="650" height="520"  />
            <Rect x="0" y="550" rx="0" ry="4" width="650" height="270"  />
        </ContentLoader>
    </View>
)
export default (CardLoader);