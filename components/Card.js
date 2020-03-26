import React from 'react'
import {Platform, StyleSheet, Text, View} from "react-native";
import {DEVICE_WIDTH} from '../constants/Layout'
import Colors from "../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Tap from "./Tap";
import moment from "moment";

const Card = (props) => {
    return (
        <Tap onPress={()=>alert('fdsfsd')}>
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                    {props.name}
                </Text>
                <Ionicons
                    name={'md-arrow-dropright'}
                    size={25}
                    color={'grey'}
                />
            </View>
            <View>
                <Text style={styles.text}>
                    {moment(props.date).format('LT')}
                </Text>
               <Text style={styles.text}>f</Text>
                <Text style={styles.text}>{props.notes}</Text>

            </View>
        </View>
        </Tap>
    )
}
const styles = StyleSheet.create({
    container: {
        minHeight: 140,
        width: DEVICE_WIDTH-32,
        backgroundColor: '#eaf1f7',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#B1BED6',
        paddingBottom: 15,
        marginTop: 10,
        marginBottom: 10

    },
    titleContainer: {
        minHeight: 46,
        width: '100%',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#B1BED6',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        justifyContent: 'space-between',
        // wordBreak: 'break-word'
    },
    text: {
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
    },
    titleText: {

    }

});

export default Card