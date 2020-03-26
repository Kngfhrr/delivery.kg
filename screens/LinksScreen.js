import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from "../constants/Layout";

export default function LinksScreen() {
  return (
      <View style={styles.container}>
          <MapView style={styles.mapStyle}>
              <Marker
                  coordinate={{
                      latitude: 37.78825,
                      longitude: -122.4324,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                  }}
                  title={'gdffdsffffffffffffffffgdf'}
                  description={'gdf'}
              />
          </MapView>
      </View>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
    },
});
