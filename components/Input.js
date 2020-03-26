import * as React from 'react'
import { DEVICE_WIDTH } from '../constants/Layout'
import { TextInput } from 'react-native-paper'
import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.View`
  position: relative;
  
`


const StyledInput = styled(TextInput)`
  width: ${DEVICE_WIDTH - 32};
  justify-content: flex-start;
  display: flex;
  margin: 0;
`
const ErrorText = styled.Text`

`
export default function Input(props) {
    const [secureText, setSecureText] = useState(false)
    const theme = {
        colors: {
            primary: '#6d378f',
            placeholder: '#8E919D',
            backdrop: '#D3D9DB',
            background: '#FFFFFF',
            error: '#FF6F3E',
        },
    }

    return (
        <Container style={props.style}>
            <StyledInput
                value={props.value}
                label={props.label}
                placeholder={props.placeholder}
                mode={'outlined'}
                render={props.render}
                error={!!props.error}
                autoCapitalize={
                    props.autoCapitalize ? props.autoCapitalize : 'sentences'
                }
                secureTextEntry={props.passwordInput && !secureText}
                keyboardType={props.keyboardType}
                onChangeText={e => props.onChange(e)}
                onBlur={props.onBlur}
                theme={props.theme || theme}
                ref={props.reference}
                onFocus={props.onFocus}
                multiline={props.multiline}
                maxLength={props.maxLength}
                dense={false}
            />
            {!!props.error && <ErrorText>{props.error}</ErrorText>}
        </Container>
    )
}
