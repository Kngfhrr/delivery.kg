import * as React from "react";
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";

import Card from "../components/Card";
import Colors from "../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Tap from "../components/Tap";
import { useState } from "react";
import OrderService from "../services/orders.service";
import TopButton from "../components/TopButton";
const order = new OrderService();

export default function OrderList(props) {
  const [orders, setOrders] = useState(null);
  const [touched, setTouched] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(!touched ? 20 : -99));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: !touched ? -99 : 20,
      duration: 500,
    }).start();
  }, [touched]);

  React.useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    try {
      setLoading(true);
      const res = await order.allOrders();
      const sorted = res.sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      );
      setOrders(sorted);
    } catch (e) {
      console.log("e", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TopButton />
      <View
        style={{
          width: 35,
          height: 35,
          backgroundColor: "#fff",
          borderRadius: 6,
          borderWidth: 0.1,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "flex-end",
          marginRight: 16,
            elevation: 3,
        }}
      >
        <Ionicons name={"md-funnel"} size={30} color={"#000"} />
      </View>
      <Tap onPress={() => props.navigation.navigate("CreateOrder")}>
        <Animated.View style={{ ...styles.addButton, right: fadeAnim }}>
          <Ionicons name={"md-add"} size={30} color={"#fff"} />
        </Animated.View>
      </Tap>
      <FlatList
        onScrollBeginDrag={() => setTouched(false)}
        onScrollEndDrag={() => setTouched(true)}
        style={{ alignSelf: "center", flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={orders && orders.length > 0 && orders}
        renderItem={({ item: i, idx }) => {
          return (
            <View key={idx}>
              <Card
                onPress={() =>
                  props.navigation.push("OrderDetails")
                }
                style={{ marginBottom: 14, alignSelf: "center" }}
                name={i.name}
                date={i.created_at}
                from={i.from}
                where={i.where}
                notes={i.notes}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    flex: 1,
    backgroundColor: "#f4fdfe",
    display: "flex",
    paddingBottom: 60,
  },
  addButton: {
    backgroundColor: Colors.tintColor,
    borderColor: Colors.tintColor,
    borderWidth: 1,
    height: 60,
    width: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 2,
    bottom: 70,
    shadowColor: "#000000",
    elevation: 5,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
});
