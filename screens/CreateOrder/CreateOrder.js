import React, { useEffect, useState } from 'react'
import {
    KeyboardAvoidingView,
    ScrollView,
    View,
    Keyboard,
    Platform,
    SafeAreaView,
} from 'react-native'
import styled from 'styled-components'
import Input from '../../components/Input'
import StepIndicator from 'react-native-step-indicator'

import moment from 'moment'
import OrderService from '../../services/orders.service'
import Button from '../../components/Button'
import Colors from '../../constants/Colors'
import Stepper from './Stepper'
const orders = new OrderService()

const Wrapper = styled.View`
    flex: 1;
    background: #fff;
`
const Title = styled.Text`
    display: flex;
    align-items: center;
    text-align: center;
    color: #3a3d3d;
    font-size: 24px;
    margin-top: 40px;
    margin-bottom: 40px;
`
const Indicator = styled.View`
    margin-top: 50px;
`
const labels = [
    'Описание Товара',
    'Откуда забрать',
    'Куда доставить',
    'Стоимость',
    'Ваше имя',
]
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: Colors.tintColor,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: Colors.tintColor,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: Colors.tintColor,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: Colors.tintColor,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: Colors.tintColor,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: Colors.tintColor,
}

const Content = styled.View``

const InitialState = {
    name: '',
    from: '',
    where: '',
    phone: '',
    notes: '',
}

const InitialErrors = {
    name: '',
    from: '',
    where: '',
    phone: '',
    notes: '',
}

export default function CreateOrder(props) {
    const [fields, setFields] = useState(InitialState)
    const [validated, setValidate] = useState(false)
    const [errors, setError] = useState(InitialErrors)
    const [loading, setLoading] = useState(false)
    const [current, setCurrent] = useState(0)
    useEffect(() => {
        const validated = stateValidator()
        setValidate(validated)
    }, [fields])

    const handleSave = async () => {
        stateValidator()
        const data = {
            name: fields.name,
            from: fields.from,
            where: fields.where,
            phone: fields.phone,
            notes: fields.notes,
        }
        try {
            setLoading(true)
            const res = await orders.createOrder(data)
            if (res && res.id) {
                props.navigation.push('Root')
            }
        } catch (e) {
            console.log('e', e)
        } finally {
            setLoading(false)
        }
    }

    const onValidate = (field, valid, msg) => {
        if (!valid) {
            setError({ ...errors, [field]: msg })
            return false
        }
        return true
    }

    const stateValidator = () => {
        const state = [
            fields.name && onValidate('name', fields.name, 'Required field'),
            fields.from && onValidate('from', fields.from, 'Required field'),
            fields.where && onValidate('where', fields.where, 'Required field'),
            fields.phone && onValidate('phone', fields.phone, 'Required field'),
            fields.notes && onValidate('notes', fields.notes, 'Required field'),
        ]
        return !state.some((val) => !val)
    }

    const onHandleChange = () => {

    }

    return (
        <Wrapper>
            <Indicator>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={current}
                    labels={labels}
                />
            </Indicator>
            <KeyboardAvoidingView
                style={{ flex: 1, alignSelf: 'center' }}
                behavior={'height'}
                keyboardVerticalOffset={100}
            >
                <ScrollView>
                    <Content>
                        <Stepper step={current} />
                    </Content>
                </ScrollView>
            </KeyboardAvoidingView>
            <View
                style={{
                    display: 'flex',
                    width: '100%',
                    paddingRight: 20,
                    paddingLeft: 20,
                    backgroundColor: 'rgba(36, 36, 36, 0)',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    position: 'absolute',
                    bottom: 0,
                    zIndex: 0
                }}
            >
                <Button
                    loading={loading}
                    disabled={validated}
                    style={{
                        marginTop: 15,
                        marginBottom: 40,
                        width: 100,
                        backgroundColor: '#fff',
                        borderWidth: 0
                    }}
                    labelStyle={{
                        color: Colors.tintColor,
                        fontWeight: 'bold',
                    }}
                    label={'Назад'}
                    onPress={() =>
                        current > 0 && setCurrent(current - 1)
                    }
                />
                <Button
                    loading={loading}
                    disabled={validated}
                    style={{
                        marginTop: 15,
                        marginBottom: 40,
                        width: 100,
                    }}
                    label={'Далее'}
                    onPress={() => setCurrent(current + 1)}
                />
            </View>
        </Wrapper>
    )
}
