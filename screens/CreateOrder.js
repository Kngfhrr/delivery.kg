import React, { useEffect, useState } from 'react'
import {KeyboardAvoidingView, ScrollView, View, Keyboard, Platform, SafeAreaView} from 'react-native'
import styled from 'styled-components'
import Input from '../components/Input'

import moment from 'moment'
import OrderService from '../services/orders.service'
import Button from "../components/Button";
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
    const [fields, setFields] = useState(InitialState)
    const [validated, setValidate] = useState(false)
    const [errors, setError] = useState(InitialErrors)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const validated = stateValidator()
         setValidate(validated)
    }, [fields]);

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
            if(res && res.id){
                props.navigation.push('Root')
            }
            }
        catch (e) { console.log('e', e) }
        finally {
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
            fields.name && onValidate('name', fields.name.length, 'Required field'),
            fields.from && onValidate('from', fields.from, 'Required field'),
            fields.where && onValidate('where', fields.where, 'Required field'),
            fields.phone && onValidate('phone', fields.phone, 'Required field'),
            fields.notes && onValidate('notes', fields.notes, 'Required field'),
        ]
        return !state.some(val => !val)
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
                                    onBlur={() => onValidate('name', fields.name.length, 'Обязательное поле')}
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
                                    onBlur={() => onValidate('from', fields.from.length, 'Обязательное поле')}
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
                                    onBlur={() => onValidate('where', fields.where.length, 'Обязательное поле')}
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
                                    onBlur={() => onValidate('phone', fields.phone.length, 'Обязательное поле')}
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
                                    value={fields.notes}
                                    onBlur={() => onValidate('notes', fields.notes.length, 'Обязательное поле')}
                                    onChange={e => {
                                        setFields({ ...fields, notes: e.trimLeft() })
                                        setError({ ...errors, notes: '' })
                                    }}
                                />
                                <Button loading={loading} disabled={!validated} style={{marginTop: 15, marginBottom: 40}} label={'Создать'} onPress={handleSave}/>
                            </Content>
                        </ScrollView>
                </KeyboardAvoidingView>
        </Wrapper>
    )
}

