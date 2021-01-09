import React from 'react'
import { connect } from 'react-redux';
import AppContainer from '../../container/appContainer';
import Section_One from '../../component/SectionOne';
import CustomSlider from '../../component/CustomSlider';
import Feather from "react-native-vector-icons/Feather"
import {
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    FlatList,
    SectionList
} from 'react-native';
import {
    IMAGES,
    DATA,
    SLIDER
} from "./dummyData"

const Profile = () => (
    <AppContainer
        iconLeft={
            <Feather
                name="menu"
                size={35}
                style={{ color: "#fff" }}
            />
        }
    >
        {/* body */}
        <ScrollView >
            <SafeAreaView style={styles.container}>
                {/* images */}
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ }) =>
                        <FlatList
                            style={{
                                marginTop: "2%"
                            }}
                            horizontal={true}
                            data={IMAGES}
                            renderItem={({ item }) => <Section_One item={item} />}
                            keyExtractor={item => item.id}
                        />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.header}>{title}</Text>
                    )}
                />
                {/* slider */}
                <Text style={styles.header}>{`Section Three`}</Text>
                <FlatList
                    style={{
                        marginTop: "2%"
                    }}
                    horizontal={true}
                    data={SLIDER}
                    renderItem={({ item }) => <CustomSlider item={item} />}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </ScrollView>
    </AppContainer>
);

function mapStateToProp(state) {
    return ({
    })
}
function mapDispatchToProp(dispatch) {
    return ({
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(Profile);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: "5%",
    },
    header: {
        marginTop: "2%",
        fontWeight: "bold",
        fontSize: 18,
        backgroundColor: "#fff",
    },
});