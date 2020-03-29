import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DEVICE_WIDTH } from "../constants/Layout";
import Colors from "../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Tap from "./Tap";
import moment from "moment";
import styled from "styled-components";
import Dash from "react-native-dash";

const Line = styled.View`
  height: 95%;
  width: 1.5;
  background-color: #dbdddc;
  align-self: center;
  margin-left: 15;
  margin-right: 15;
`;

const AddressText = styled.Text`
  margin-left: 10;
  width: 100%;
`;

const Title = styled.Text`
  font-size: 18;
  font-weight: bold;
  margin-bottom: 15;
  margin-top: 10;
`;
const Photo = styled.View`
  width: 50;
  height: 50;
  border-radius: 50;
  background: #e2e0ee;
  margin-top: 10;
  align-items: center;
  justify-content: center;
`;
const Name = styled.Text`
  color: #7869a8;
  margin-top: 10;
  font-size: 14;
  max-width: 60;
  font-weight: bold;
`;
const Cash = styled.Text`
  font-size: 20;
`;
const Date = styled.Text``;
const Card = (props) => {
  moment.locale("de");
  const name = "Nikolay";
  const onPress = () => {
    props.onPress && props.onPress()
  }
  return (
    <Tap onPress={onPress}>
      <View style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "space-between" }}>
          <View>
              <Photo>
                  <Ionicons name={"md-person"} size={30} color={"#fff"} />
              </Photo>
            <Name numberOfLines={1} ellipsizeMode="tail">
              {props.name}
            </Name>
          </View>
          <View style={{ alignItems: "center" }}>
            <Cash>{`$${props.price ? props.price : "144"}`}</Cash>
            <Ionicons size={35} name={"md-cash"} color={"#919191"} />
          </View>
        </View>
        <Line />
        <View style={{ justifyContent: "space-between" }}>
          <Title>{props.notes ? props.notes : "Title"}</Title>
          <View style={{ marginTop: -15 }}>
            <View
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                marginTop: -8,
              }}
            >
              <Ionicons size={15} name={"md-disc"} color={"#705eb2"} />
              <AddressText>{props.from}</AddressText>
            </View>
            <Dash
              dashGap={4}
              style={{
                width: 1,
                height: 50,
                flexDirection: "column",
                marginLeft: 5,
                marginBottom: 1,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                marginBottom: -8,
              }}
            >
              <Ionicons size={15} name={"md-disc"} color={"#705eb2"} />
              <AddressText>{props.where ? props.where : "fdssdf"}</AddressText>
            </View>
          </View>
          <View>
            <Date>{props.date ? props.date : "23/04/2020"}</Date>
          </View>
        </View>
      </View>
    </Tap>
  );
};
const styles = StyleSheet.create({
  container: {
    minHeight: 210,
    width: DEVICE_WIDTH - 32,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderColor: "#B1BED6",
    paddingBottom: 15,
    marginTop: 10,
    marginBottom: 10,
    elevation: 2,
    flexDirection: "row",
    paddingLeft: 15,
    paddingTop: 15,
    borderWidth: 0.3,
    paddingRight: 15,
  },
  titleContainer: {
    minHeight: 46,
    width: "100%",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#B1BED6",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: "space-between",
    // wordBreak: 'break-word'
  },
  text: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  titleText: {},
});

export default Card;
