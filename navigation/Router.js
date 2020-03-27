import { createAppContainer, createSwitchNavigator } from "react-navigation";
import OrderDetails from "../screens/DetailPage";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/OrderList";
import BottomTabNavigator from "./BottomTabNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateOrder from "../screens/CreateOrder";

// private modal scenes
const Modals = createSwitchNavigator(
  {
    App: {
      screen: BottomTabNavigator,
    },
    OrderDetails: {
      screen: OrderDetails,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: false,
      },
      CreateOrder: {
        screen: CreateOrder,
        navigationOptions: {
          header: null,
          tabBarVisible: false,
          gesturesEnabled: false,
        },
      },
    },
  },
  {
    mode: "modal",
    headerMode: "none",
  }
);

const Router = createAppContainer(
  createSwitchNavigator(
    {
      Modals: Modals,
    },
    {
      initialRouteName: "Modals",
    }
  )
);

export default Router;
