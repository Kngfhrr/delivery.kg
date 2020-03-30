import * as React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import MapView from 'react-native-maps'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import OverlayComponent from 'react-native-maps'
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../constants/Layout'
import { useState } from 'react'
import { MapStyle } from '../constants/mocked'
import * as PermissionsAndroid from 'react-native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import Colors from '../constants/Colors'
import {useEffect} from "react";

export default function MapScreen(props) {
    const initialPlace = {
        latitude: 42.87504998475012,
        longitude: 74.59457946941257,
        latitudeDelta: 0.08597532080393222,
        longitudeDelta: 0.07062625139951706,
    }
    const [currentPlace, setCurrent] = useState(initialPlace)
    const [padding, setPadding] = useState(1)
    const [local, setLocation] = useState(null)



    useEffect(()=>{
        getLocationAsync()
    }, [])
     console.log('LOCATION', local )
    const getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location)
    };

    const onChangeMarker = (e) => {
        setCurrent(e)
    }



    return (
        <View style={{ ...styles.container }}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ ...styles.mapStyle, paddingBottom: padding }}
                region={initialPlace}
                showsUserLocation={true}
                customMapStyle={MapStyle}
                showsMyLocationButton={true}
                onMapReady={() => setPadding(0)}
            >
                <Marker
                    onEndDrag={onChangeMarker}
                    coordinate={initialPlace}
                    title={'gdffdsffffffffffffffffgdf'}
                    description={'gdf'}
                >
                    <View
                        style={{
                            height: 40,
                            width: 40,
                            backgroundColor: Colors.tintColor,
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Ionicons name={'md-cube'} size={30} color={'#fff'} />
                    </View>
                    <Ionicons
                        name={'md-disc'}
                        size={17}
                        color={Colors.tintColor}
                        style={{ marginLeft: 13 }}
                    />
                </Marker>
            </MapView>
        </View>
    )
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
})
