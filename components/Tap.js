import * as React from 'react'
import {
    Platform,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
} from 'react-native'

export default function Tap(props) {
    return Platform.OS === 'ios' ? (
        <TouchableWithoutFeedback style={{borderColor: '#fff'}} {...props}/>
    ) : (
        <TouchableNativeFeedback style={{borderColor: '#fff'}} {...props}/>
    )
}
