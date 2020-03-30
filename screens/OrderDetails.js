import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DEVICE_WIDTH } from '../constants/Layout'
import Colors from '../constants/Colors'
import { createStackNavigator } from '@react-navigation/stack'
import Button from '../components/Button'
import {ScrollView, Text, TextInput} from 'react-native'
import moment from 'moment'
import Loading from '../components/Loader'
import OrderService from '../services/orders.service'
const order = new OrderService()
const StackNavigator = createStackNavigator()
import { GoogleAutoComplete } from 'react-native-google-autocomplete';

const Wrapper = styled.View`
    display: flex;
    flex: 1;
    background: #fff;
`
export const Title = styled.Text`
    font-size: 24px;
    line-height: 24px;
    margin-top: 52px;
`
const Content = styled.View`
    align-self: center;
    height: 100%;
    padding-bottom: 50px;
    width: ${DEVICE_WIDTH - 60}px;
`
export const HeadLine = styled.Text`
    font-size: 14px;
    line-height: 16;
    margin-top: 45px;
    margin-bottom: 15px;
    color: ${Colors.tintColor};
`
export const Answer = styled.Text`
    font-size: 18px;
    line-height: 28px;
`
const Agenda = styled.Text`
    font-size: 18px;
    line-height: 28px;
    color: #000000;
`
export default class OrderDetails extends React.Component {

    state = {
        orders: null,
        loading: false,
    }

    componentDidMount() {
        // const { id } = this.props.route.params;
        const getOneEvent = async () => {
            this.setState({ loading: true })
            const res = await order.oneOrder(11)
            this.setState({ orders: res })
            this.setState({ loading: false })
        }
        getOneEvent()
    }

    render() {
        const { orders, loading } = this.state
        return (
            <Wrapper>
                {!loading ? (
                    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
                        <Content>
                            <Title>{orders && orders.notes}</Title>
                            <HeadLine>{`Дата создания`}</HeadLine>
                            <Answer>{orders && orders.created_at}</Answer>
                            <HeadLine>{`Откуда`}</HeadLine>
                            <GoogleAutoComplete apiKey="AIzaSyAi26HnlWQfj2CDuRk3g72HOLEbjLzdoKE" debounce={300}>
                                {({ inputValue, handleTextChange, locationResults, fetchDetails }) => (
                                    <React.Fragment>
                                        <TextInput
                                            style={{
                                                height: 40,
                                                width: 300,
                                                borderWidth: 1,
                                                paddingHorizontal: 16,
                                            }}
                                            value={inputValue}
                                            onChangeText={handleTextChange}
                                            placeholder="Location..."
                                        />
                                        <ScrollView style={{ maxHeight: 100 }}>
                                            {locationResults.map((el, i) => (
                                                <LocationItem
                                                    {...el}
                                                    fetchDetails={fetchDetails}
                                                    key={String(i)}
                                                />
                                            ))}
                                        </ScrollView>
                                    </React.Fragment>
                                )}
                            </GoogleAutoComplete>
                            <Answer>{orders && orders.from}</Answer>
                            <HeadLine>{`Куда`}</HeadLine>
                            <Answer>{orders && orders.where}</Answer>
                            <HeadLine>{`Контакты`}</HeadLine>
                            <Answer>{orders && orders.phone}</Answer>
                            <Answer>{orders && orders.name}</Answer>
                        </Content>
                    </ScrollView>
                ) : (
                    <Loading />
                )}
            </Wrapper>
        )
    }
}

// const OrderDetailsStack = StackNavigator({screen: 'OrderDetails', navigationOptions: {}})
