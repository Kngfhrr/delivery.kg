import React from 'react'
import styled from 'styled-components'
import Input from '../../components/Input'
import SelectAddress from "../../components/SelectAddress";
import InputType from "./Modules/InputType";

const Container = styled.View`
    flex: 1;
`

const questions = [
    {
        step: 0,
        type: 'input',
        title: 'Опишите товар',
        required: true,
    },
    {
        step: 1,
        type: 'select',
        title: 'Укажите адрес, откуда нужно забрать посылку',
        required: true,
    },
    {
        step: 2,
        type: 'select',
        title: 'Выберите место, куда нужно доставить посылку',
        required: true,
    },
    {
        step: 3,
        type: 'input',
        title: 'Укажите сумму',
        required: false,
    },
    {
        step: 4,
        type: 'input',
        title: 'Укажите Ваше имя',
        required: true,
    },
]

const Stepper = (props) => {
    const { step, onChange } = props
    const strategy = () => ({
        'input': <InputType onChange={onChange}/>,
        'select': <SelectAddress onChange={onChange}/>,
    })
    return (
        <Container>
            {questions.map((q, i) => {
                return step === q.step && strategy(q)[q.type]
            })}
        </Container>
    )
}
export default Stepper
