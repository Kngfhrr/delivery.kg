import React, { useEffect, useState } from 'react'
import {KeyboardAvoidingView, ScrollView, View, Keyboard, Platform, SafeAreaView} from 'react-native'
import styled from 'styled-components'
import Input from '../components/Input'

import moment from 'moment'
import OrderService from '../services/orders.service'
const orders = new OrderService()

const Wrapper = styled.View`
  display: flex;
  flex: 1;
  background: #fff;
`
const Title = styled.Text`
  display: flex;
  align-items: center;
  text-align: center;
  color: #3a3d3d;
  font-size: 24;
  margin-top: 40;
  margin-bottom: 40;
`
const Content = styled.View`

`

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
     console.log('props', props.navigationOptions)
    const [fields, setFields] = useState(InitialState)
    const [date, setDate] = useState('')
    const [done, setDone] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [validated, setValidate] = useState(false)
    const [errors, setError] = useState(InitialErrors)
    const [loading, setLoading] = useState(false)

    const id = 1
    const add = moment(date)
    const start = moment(fields.startsAt).diff(moment(fields.startsAt).startOf('day'), 'seconds')
    const startEvent = moment(add).add(start, 'seconds').toDate()

    const end = moment(fields.endsAt).diff(moment(fields.endsAt).startOf('day'), 'seconds')
    const endEvent = moment(add).add(end, 'seconds').toDate()

    const durationMeeting = moment(startEvent).diff(moment(fields.startsAt).startOf('day'), 'minutes')
        === moment(endEvent).diff(moment(fields.startsAt).startOf('day'), 'minutes')

    useEffect(() => {
        const validated = stateValidator()
        validated ? setValidate(true) : setValidate(false)
    }, [fields, date]);


    const getOneEvent = async () => {
        // const res = await meeting.oneMeeting(id)
        setFields(res)
        setDate(moment(res && res.startsAt).format('MM/DD/YYYY'))
    }

    const handleSave = async () => {
        const data = {
            name: fields.name,
            from: fields.from,
            where: fields.where,
            phone: fields.phone,
            notes: fields.notes,
        }
        try {
            setLoading(true)
            let res
            if(res && !res.id){
                setValidate(false)
                setError({errors, name: 'Something wrong...'})
                return
            } else {
                props.navigation.navigate('HomeScreen')
            }}
        catch (e) { console.log('e', e) }
        finally { setLoading(false) }
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
            fields.name && onValidate('name', fields.name.length, 'Required field'),
            fields.from && onValidate('from', fields.from, 'Required field'),
            fields.where && onValidate('where', fields.where, 'Required field'),
            fields.phone && onValidate('phone', fields.phone, 'Required field'),
            fields.notes && onValidate('notes', fields.notes, 'Required field'),
        ]
        return !state.some(val => !val)
    }

    const deleteMeeting = async () => {
        await meeting.deleteMeeting(id)
    }


    return (
        <Wrapper>
                <KeyboardAvoidingView
                    style={{flex: 1, alignSelf: 'center'}}
                    behavior={'height'}
                    keyboardVerticalOffset={100}
                >
                        <ScrollView>
                            <Content>
                                <Title>{"Заполните форму"}</Title>
                                <Input
                                    label={'Ваше имя'}
                                    error={errors.name}
                                    style={{ marginBottom: 15 }}
                                    placeholder={''}
                                    value={fields.name}
                                    maxLength={40}
                                    onBlur={() => onValidate('title', fields.name.length, 'Обязательное поле')}
                                    onChange={e => {
                                        setFields({ ...fields, name: e.trimLeft() })
                                        setError({ ...errors, name: '' })
                                    }}
                                />
                                <Input
                                    error={errors.from}
                                    maxLength={40}
                                    style={{ marginBottom: 15 }}
                                    label={'Откуда забрать'}
                                    value={fields.from}
                                    onChange={e => {
                                        setFields({ ...fields, from: e.trimLeft() })
                                        setError({ ...errors, from: '' })
                                    }}
                                />
                                <Input
                                    error={errors.where}
                                    maxLength={40}
                                    style={{ marginBottom: 15 }}
                                    label={'Куда доставить'}
                                    value={fields.where}
                                    onChange={e => {
                                        setFields({ ...fields, where: e.trimLeft() })
                                        setError({ ...errors, where: '' })
                                    }}
                                />
                                <Input
                                    error={errors.phone}
                                    maxLength={40}
                                    style={{ marginBottom: 15 }}
                                    label={'Номер телефона'}
                                    value={fields.phone}
                                    onChange={e => {
                                        setFields({ ...fields, phone: e.trimLeft() })
                                        setError({ ...errors, phone: '' })
                                    }}
                                />
                                <Input
                                    error={errors.notes}
                                    maxLength={40}
                                    style={{ marginBottom: 15 }}
                                    label={'Комментарий'}
                                    value={fields.phone}
                                    onChange={e => {
                                        setFields({ ...fields, notes: e.trimLeft() })
                                        setError({ ...errors, notes: '' })
                                    }}
                                />
                            </Content>
                        </ScrollView>
                </KeyboardAvoidingView>
        </Wrapper>
    )
}

