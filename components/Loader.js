import * as React from 'react'
import styled from 'styled-components'
import { ActivityIndicator } from 'react-native'

const Indicator = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
`

export default function Loading() {
    return (
        <Indicator>
            <ActivityIndicator size="large" color="#5C8DE8" />
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