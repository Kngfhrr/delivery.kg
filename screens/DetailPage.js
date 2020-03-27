import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DEVICE_WIDTH } from "../constants/Layout";
import Colors from "../constants/Colors";

import Button from "../components/Button";
import { ScrollView, Text } from "react-native";
import moment from "moment";
import Loading from "../components/Loader";
import OrderService from "../services/orders.service";
const order = new OrderService();

const Wrapper = styled.View`
  display: flex;
  flex: 1;
  background: #fff;
`;
const Title = styled.Text`
  font-size: 24;
  line-height: 24;
  margin-top: 52;
`;
const Content = styled.View`
  align-self: center;
  height: 100%;
  padding-bottom: 50;
  width: ${DEVICE_WIDTH - 60};
`;
export const HeadLine = styled.Text`
  font-size: 14;
  line-height: 16;
  margin-top: 45;
  margin-bottom: 15;
  color: ${Colors.tintColor};
`;
export const Answer = styled.Text`
  font-size: 18;
  line-height: 28;
`;
const Agenda = styled.Text`
  font-size: 18;
  line-height: 28;
  color: #000000;
`;
export default class OrderDetails extends React.Component {

  state = {
    orders: null,
    loading: false,
  };

  componentDidMount() {
    // const { id } = this.props.route.params;
    const getOneEvent = async () => {
      this.setState({ loading: true });
      const res = await order.oneOrder(11);
      this.setState({ orders: res });
      this.setState({ loading: false });
    };
    getOneEvent();
  }

  render() {
    const { orders, loading } = this.state;
    return (
      <Wrapper>
        {!loading ? (
          <ScrollView scrollIndicatorInsets={{ right: 1 }}>
            <Content>
              <Title>{orders && orders.notes}</Title>
              <HeadLine>{`Дата создания`}</HeadLine>
              <Answer>{orders && orders.created_at}</Answer>
              <HeadLine>{`Откуда`}</HeadLine>
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
    );
  }
}
