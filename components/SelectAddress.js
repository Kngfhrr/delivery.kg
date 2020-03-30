import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import MapView from 'react-native-maps'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../constants/Layout'
import { useState } from 'react'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { useEffect } from 'react'
import MapService from '../services/map.service'
import { MapStyle } from '../constants/mocked'
import { useRef } from 'react'
const Map = new MapService()

const initialPlace = {
    latitude: 42.87504998475012,
    longitude: 74.59457946941257,
    latitudeDelta: 0.08597532080393222,
    longitudeDelta: 0.07062625139951706,
}

export default function SelectAddress(props) {
    const [currentPlace, setCurrent] = useState(initialPlace)
    const [local, setLocation] = useState(initialPlace)
    const [padding, setPadding] = useState(1)
    const mapRef = useRef(null)
    const markerRef = useRef(null)

    useEffect(() => {
        getLocationAsync()
    }, [])

    const getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION)
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            })
        }

        let location = await Location.getCurrentPositionAsync({})
        setLocation(location)
    }

    const getCurrentAddress = async (data, markerRef) => {
        const lat = data.coordinate.latitude
        const lon = data.coordinate.longitude
        try {
            const res = await Map.getAddress(lat, lon)
            setCurrent(res)
            markerRef.current.showCallout()
        } catch (e) {
            console.log('E', e)
        } finally {
        }
    }

    return (
        <View style={{ ...styles.container }}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={{ ...styles.mapStyle, marginBottom: padding }}
                region={local}
                showsUserLocation={true}
                customMapStyle={MapStyle}
                showsMyLocationButton={true}
                followsUserLocation={true}
                onMapReady={() => {
                    setPadding(0)
                    mapRef.current.animateCamera(
                        {
                            center: local && local.coords,
                            pitch: 2,
                            heading: 0,
                            altitude: 200,
                            zoom: 15,
                        },
                        1000
                    )
                }}
            >
                <Marker
                    ref={markerRef}
                    draggable
                    description={currentPlace && currentPlace.display_name}
                    title={'Вы здесь'}
                    onDragEnd={(e) => getCurrentAddress(e.nativeEvent, markerRef)}
                    coordinate={
                        local && local.coords ? local.coords : initialPlace
                    }
                >
                    <View
                        style={{
                            height: 40,
                            width: 40,
                            backgroundColor: '#705eb2',
                            borderRadius: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Ionicons name={'md-cube'} size={30} color={'#fff'} />
                    </View>
                    <Ionicons
                        name={'md-disc'}
                        size={17}
                        color={'#705eb2'}
                        style={{ marginLeft: 13 }}
                    />
                </Marker>
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        marginTop: 30,
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
    },
})
