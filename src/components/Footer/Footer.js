import React from 'react'
import { View, FlatList, } from 'react-native'
import FooterTab from '../Footer/FooterTab';
import FooterData from '../Footer/FooterData';
import styles from './style'

import Colors from '../../common/colors';
import { Actions } from 'react-native-router-flux';
class AppFooter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: FooterData
        }
    };
    componentWillMount(){
        const { navigation,heading } = this.props
        const { data } = this.state
        var dataClone = data
        dataClone.map((v, i) => {
            dataClone[i].color = Colors.secondary
        })
        let index = dataClone.findIndex(x => x.title === heading);

        data[index].color = Colors.primary
        this.setState({ data: dataClone })

    }
    render() {
        const { data } = this.state
        const { navigation,heading } = this.props
        return (
            <View style={styles.footerContainer}>
                <FlatList
                    horizontal={true}
                    data={data}
                    renderItem={({ item }) => (
                        <FooterTab
                            id={item.id}
                            title={item.title}
                            iconName={item.iconName}
                            color={item.color}
                            func={(index) => {
                                // var dataClone = data
                                // dataClone.map((v, i) => {
                                //     dataClone[i].color = Colors.secondary
                                // })
                                // data[index].color = Colors.primary
                                // this.setState({ data: dataClone })
                                Actions[item.route]()
                            }}
                            keyExtractor={item => item.id}
                        />
                    )}
                />
            </View>
        );
    }
}
export default (AppFooter);