import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "../components/TabBarIcon";
import OrderList from "../screens/OrderList";
import Profile from "../screens/Profile";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tap from "../components/Tap";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../constants/Colors";
import CreateOrder from "../screens/CreateOrder";
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Map";

export default function BottomTabNavigator({ navigation, route }) {
  return (
    <>
      <Tap onPress={() => navigation.navigate("CreateOrder")}>
        <View style={{ ...styles.addButton }}>
          <Ionicons name={"md-add"} size={30} color={"#fff"} />
        </View>
      </Tap>
      <BottomTab.Navigator
        initialRouteName={INITIAL_ROUTE_NAME}
        navigationOptions={{
          title: '5476556'
        }}
        tabBarOptions={{
          showLabel: false,
          style: {
            height: 60,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            position: "absolute",
          },
        }}
      >
        <BottomTab.Screen
          name="Map"
          component={OrderList}
          options={{
            tabBarLabel: () => <Text>Заказы</Text>,
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name="md-navigate"
                style={{ alignSelf: "flex-start", marginLeft: 50 }}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Options"
          component={Profile}
          options={{
            tabBarLabel: () => <Text>Профиль</Text>,
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name="md-person"
                style={{ alignSelf: "flex-end", marginRight: 50 }}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    </>
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
    bottom: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 9999,
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
