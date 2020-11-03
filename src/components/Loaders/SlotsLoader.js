
import React from 'react';
import { View, Dimensions ,Text} from 'react-native';
import ContentLoader, { Rect,  } from 'react-content-loader/native'
import Colors from '../../common/colors'
const ScreenWidth = Dimensions.get('window').width;
const SlotsLoader = () => (
    <View style={{  width: ScreenWidth,height:40 }}>
         <ContentLoader
    // height={140}
    speed={1}
    // backgroundColor={"#D4D9D7"}
    // foregroundColor={'#999'}
    // viewBox="0 0 380 70"
    // style={{alignItems:"center",justifyContent:"center",alignSelf:"center"}}
  >
    {/* Only SVG shapes */}
    <Rect  width="100" height="40" rx="10"/>
    <Rect  width="100" height="40" x="120" rx="10"/>
    <Rect  width="100" height="40" x="240" rx="10"/>
    {/* <Rect  width="100" height="40" y="1" rx="10" ry="1"/> */}
    {/* <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" /> */}
    {/* <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" /> */}
  </ContentLoader>
    </View>
)
export default (SlotsLoader);