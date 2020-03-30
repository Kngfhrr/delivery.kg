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
import MapScreen from "./MapScreen";
import Loader from "../components/Loader";
const order = new OrderService();

export default function OrderList(props) {
  const [orders, setOrders] = useState(null);
  const [touched, setTouched] = useState(true);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);

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
      <TopButton active={active} setActive={setActive} />
      {active ? (
        !loading ? (
          <View style={{ flex: 1 }}>
            <View style={styles.filter}>
              <Ionicons name={"md-options"} size={30} color={"#767676"} />
            </View>
            <FlatList
              onScrollBeginDrag={() => setTouched(false)}
              onScrollEndDrag={() => setTouched(true)}
              style={{ alignSelf: "center", flex: 1 }}
              showsVerticalScrollIndicator={false}
              data={orders && orders.length > 0 && orders}
              keyExtractor={(item, i) => item.key }
              renderItem={({ item: i, idx }) => {
                return (
                    <Card
                      onPress={() => props.navigation.navigate('OrderDetails')}
                      style={{ marginBottom: 14, alignSelf: "center" }}
                      name={i.name}
                      date={i.created_at}
                      from={i.from}
                      where={i.where}
                      notes={i.notes}
                      idx={idx}
                    />
                );
              }}
            />
          </View>
        ) : (
          <Loader />
        )
      ) : (
        <MapScreen />
      )}
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
    position: "relative",
    zIndex: 9999,
    bottom: -500,
    shadowColor: "#000000",
    elevation: 5,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  filter: {
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
  },
});
