import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from "../constants/Layout";

export default function Profile() {
    return (
        <View style={styles.container}>
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
