import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "../components/TabBarIcon";
import OrderList from "../screens/OrderList";
import LinksScreen from "../screens/LinksScreen";
import Profile from "../screens/Profile";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        initialRouteName={INITIAL_ROUTE_NAME}
        tabBarOptions={{
            style: {
              height: 60,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              position: 'absolute'
            }
        }}
      >
        <BottomTab.Screen
          name="Home"
          component={OrderList}
          options={{
            tabBarLabel: () => (
              <Text>Заказы</Text>
            ),
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name="md-briefcase" />
            ),
          }}
        />
        <BottomTab.Screen
          name="Links"
          component={LinksScreen}
          options={{
            tabBarLabel: () => (
              <Text>Карта</Text>
            ),
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name="md-navigate" />
            ),
          }}
        />
        <BottomTab.Screen
          name="Options"
          component={Profile}
          options={{
            tabBarLabel: () => (
              <Text>Профиль</Text>
            ),
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name="md-book" />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
