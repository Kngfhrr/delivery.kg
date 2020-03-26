import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import Profile from "../screens/Profile";
import {Text} from "react-native";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {

  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
            tabBarLabel: ({ tintColor }) => (
                <Text style={{color: tintColor}}>
                    Заказы
                </Text> ),
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-briefcase" />,
            tabBarOptions: { activeTintColor:'#00ff00'}
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
            tabBarLabel: ({ tintColor }) => (
                <Text style={{color: tintColor}}>
                    Карта
                </Text> ),
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-navigate" />,
        }}
      />
        <BottomTab.Screen
            name="Options"
            component={Profile}
            options={{
                tabBarLabel: ({ tintColor }) => (
                    <Text style={{color: tintColor}}>
                        Профиль
                    </Text> ),
                tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
            }}
        />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Express.KG'
    case 'Links':
      return 'Links to learn more';
      case 'Options':
          return 'Options...'
  }
}
