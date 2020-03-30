import React from 'react'
import styled from 'styled-components'
import {Title} from '../../OrderDetails'
import Input from "../../../components/Input";
const InputType = (props) => {
    return <>
        <Title>props.notes</Title>
        <Input/>
    </>
}
export default InputType
