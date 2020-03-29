import * as React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import OverlayComponent from "react-native-maps";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../constants/Layout";
import { useState } from "react";
import { MapStyle } from "../constants/mocked";
import * as PermissionsAndroid from "react-native";
import Colors from "../constants/Colors";

export default function MapScreen(props) {
  const initialPlace = {
    latitude: 42.87504998475012,
    longitude: 74.59457946941257,
    latitudeDelta: 0.08597532080393222,
    longitudeDelta: 0.07062625139951706,
  };
  const [currentPlace, setCurrent] = useState(initialPlace);
  const [padding, setPadding] = useState(1);

  const onChangeMarker = (e) => {
    setCurrent(e);
  };
  const onMapReady = () => {
    setPadding(0);
  };
  return (
    <View style={{ ...styles.container }}>
      <MapView
        style={{ ...styles.mapStyle, marginBottom: padding }}
        region={initialPlace}
        customMapStyle={MapStyle}
        onMapReady={onMapReady}
        showsCompass
      >
        <Marker
          onEndDrag={onChangeMarker}
          coordinate={currentPlace}
          title={"gdffdsffffffffffffffffgdf"}
          description={"gdf"}
        >
          <View
            style={{
              height: 40,
              width: 40,
              backgroundColor: Colors.tintColor,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name={"md-cube"} size={30} color={"#fff"} />
          </View>
            <Ionicons name={"md-disc"} size={17} color={Colors.tintColor} style={{marginLeft: 13}} />
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
  },
});
