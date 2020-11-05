import React from 'react'
import { View } from 'react-native';
import { connect } from 'react-redux';
import TextInANest from '../../component/PersonalAssistance'
import CustomFooter from '../../component/CustomFooter/index';

const Home = ({ }) => {
    return (
        <View style={{ flex: 1 }}>
            {/* body */}
            <View style={{ flex: 8.7, }}>
                <TextInANest />
            </View>
            {/* Footer */}
            <View style={{ flex: 1.3, }}>
                <CustomFooter />
            </View>
        </View>
    );
}

function mapStateToProp(state) {
    return ({
    })
}
function mapDispatchToProp(dispatch) {
    return ({
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(Home);

