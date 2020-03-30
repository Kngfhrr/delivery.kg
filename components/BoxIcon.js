import React from 'react'
import { View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import Colors from '../constants/Colors'

const BoxIcon = () => {
    return (
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <View
                style={{
                    height: 40,
                    width: 40,
                    backgroundColor: Colors.tintColor,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 2,
                }}
            >
                <Ionicons name={'md-cube'} size={30} color={'#fff'} />
            </View>
            <Ionicons name={'md-disc'} size={17} color={Colors.tintColor} />
        </View>
    )
}
export default BoxIcon
