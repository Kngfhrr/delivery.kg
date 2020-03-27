import * as React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components'
import {DEVICE_WIDTH } from '../constants/Layout'
import Colors from '../constants/Colors'
import {ButtonLoader} from "./Loader";

const Btn = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${DEVICE_WIDTH - 32};
  height: 54;
  border-radius: 4;
  padding-left: ${props => (props.icon ? '54' : '0')}
  flex-direction: row;
  background-color: ${props =>
    props.color ? props.color : (!props.disabled ? Colors.tintColor : '#B1BED6')};
`

export default function Button(props) {
    return (
        <Btn
            onPress={props.onPress}
            style={props.style}
            color={props.color}
            disabled={props.disabled || props.loading}
        >
            {props.loading ? (
                <ButtonLoader />
            ) : (
                <>
                    <Text
                        style={
                            props.labelStyle
                                ? props.labelStyle
                                : { fontSize: 16, color: '#FFFFFF'}
                        }
                    >
                        {props.label}
                    </Text>
                </>
            )}
        </Btn>
    )
}
