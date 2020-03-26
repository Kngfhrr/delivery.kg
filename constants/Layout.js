import { Dimensions } from 'react-native';
import * as StatusBar from "react-native";

export const { width: DEVICE_WIDTH } = Dimensions.get('window')
export const { height: DEVICE_HEIGHT } = Dimensions.get('window')
export const DEVICE_BOTTOM_NAVBAR_HEIGHT =
    Dimensions.get('screen').height - Dimensions.get('window').height

// export const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight : TopBarIOS()