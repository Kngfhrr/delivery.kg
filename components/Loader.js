import * as React from 'react'
import styled from 'styled-components'
import { ActivityIndicator } from 'react-native'
import Colors from "../constants/Colors";

const Indicator = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
`

export default function Loading() {
    return (
        <Indicator>
            <ActivityIndicator size="large" color={Colors.tintColor} />
        </Indicator>
    )
}

export function ButtonLoader() {
    return (
        <Indicator>
            <ActivityIndicator size="small" color="#FFFFFF" />
        </Indicator>
    )
}