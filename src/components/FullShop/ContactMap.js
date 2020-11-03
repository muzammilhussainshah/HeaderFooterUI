import React, {  useEffect } from 'react'
import { View, Text, } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../common/colors';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './style'

const getRegionForCoordinates = (points, setRegion, a) => {
  console.log(points, setRegion, a, "++++++")
  points = [{ latitude: points[0], longitude: points[1] }]
  let minX, maxX, minY, maxY;

  // init first point
  ((point) => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  // calculate rect
  // points.map((point) => {
  minX = Math.min(minX, points[0].latitude);
  maxX = Math.max(maxX, points[0].latitude);
  minY = Math.min(minY, points[0].longitude);
  maxY = Math.max(maxY, points[0].longitude);
  // });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = (maxX - minX);
  const deltaY = (maxY - minY);

  return {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

};

export default ContactMap = ({phone}) => {
  useEffect(() => {
    // getRegionForCoordinates(props.x, setRegion, location.coordinates)
  }, []);

  return (
    <View style={{ backgroundColor: Colors.white }}>
      <View style={{
        justifyContent: "space-between",
        paddingVertical: 5,
        paddingHorizontal: 10, flexDirection: "row"
      }}>
        <View>
          <Text style={{ fontSize: 16, color: Colors.primary, }}>{"Contact"}</Text>
        </View>
        <View style={{ flexDirection: "row", }}>
          <FontAwesome name={"phone-square"} size={17} style={{ color: Colors.primary, marginRight: 5 }} />
          <Text style={{ color: Colors.black, fontSize: 13, }}>{phone}</Text>
        </View>
      </View>
      <View style={{ alignItems: "center" }} >

        <View style={{ height: 150, width: "95%" }}>
          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              region={{
                latitude: 67.05766082,
                longitude: 24.95380659,
                latitudeDelta: 0.9,
                longitudeDelta: 0.01,
              }}></MapView>
          </View>
        </View>
      </View>
    </View>
  )
}