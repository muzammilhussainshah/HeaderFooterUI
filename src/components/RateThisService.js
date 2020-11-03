import React from 'react'
import { Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { Textarea, } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors  from '../common/colors';
import { connect } from 'react-redux';

export  class RateThisService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            star: 5
        };
    }
    render() {
        const { star } = this.state
        const { _func } = this.props
        return (
            <View style={{ padding: "3%", marginTop: "2%" ,width:"80%"}}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: "5%" }}>
                    {[0, 1, 2, 3, 4].map((v, i) => {
                        return (
                            <TouchableOpacity onPress={() => this.setState({ star: i+1 })}>
                                <AntDesign
                                    name={star > i ? "star" : "staro"}
                                    size={25}
                                    style={{ color: star > i ? "#FFB900" : Colors.primary, }}
                                />
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <Textarea
                maxLength={100}
                onChangeText={review =>_func(review,star) }
                rowSpan={5} bordered placeholder="Write a review" />
                {/* {
          !isLoader ?
            <Button label={"Submit "} func={() => _CreateRating(shopId, star)} /> :
            <ActivityIndicator size="small" color={Colors.primary} />
        } */}
            </View>
        )
    }
}

function mapStateToProp(states) {
    return ({
      isLoader: states.root.isLoader
    })
  }
  function mapDispatchToProp(dispatch) {
    return ({
      _CreateRating: (shopId, star) => {
        dispatch(_CreateRating(shopId, star));
      },
    })
  }
  export default connect(mapStateToProp, mapDispatchToProp)(RateThisService);