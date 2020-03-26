import * as React from 'react';
import {FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View, Animated} from 'react-native';

import Card from "../components/Card";
import Colors from "../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Tap from "../components/Tap";
import {useState} from "react";
import OrderService from '../services/orders.service'
const order = new OrderService()

export default function HomeScreen(props) {

    const [orders, setOrders] = useState(null)
    const [touched, setTouched] = useState(true)
    const [loading, setLoading] = useState(false)
    const [fadeAnim] = useState(new Animated.Value(!touched ? 20 : -99))
    React.useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: !touched ? -99 : 20,
                duration: 500,
            }
        ).start();
    }, [touched])

    React.useEffect(()=>{
        getAllOrders()
    }, [])

    const getAllOrders = async () => {
        try {
            setLoading(true)
            const res = await order.allOrders()
            console.log('ORDERS', res)
            setOrders(res)
        }catch (e) {
          console.log('e', e)
        }finally {
        setLoading(false)
        }

    }

  return (
    <View style={styles.container}>
      <Tap onPress={()=>props.navigation.navigate('CreateOrder')}>
        <Animated.View style={{...styles.addButton, right: fadeAnim}}>
            <Ionicons
                name={'md-add'}
                size={30}
                color={'#fff'}
            />
        </Animated.View>
      </Tap>
        <FlatList
            onScrollBeginDrag={()=>setTouched(false)}
            onScrollEndDrag={()=>setTouched(true)}
            style={{alignSelf: 'center', flex: 1}}
            showsVerticalScrollIndicator={false}
            data={orders && orders.length > 0 && orders}
            renderItem={({item: i, idx}) => {

                return (
                    <View key={idx}>
                    <Card
                        style={{ marginBottom: 14, alignSelf: 'center' }}
                        name={i.name}
                        date={i.created_at}
                        notes={i.notes}
                    />
                    </View>

                )
            }}
        />
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

// function DevelopmentModeNotice() {
//   if (__DEV__) {
//     const learnMoreButton = (
//       <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
//         Learn more
//       </Text>
//     );
//
//     return (
//       <Text style={styles.developmentModeText}>
//         Development mode is enabled: your app will be slower but you can use useful development
//         tools. {learnMoreButton}
//       </Text>
//     );
//   } else {
//     return (
//       <Text style={styles.developmentModeText}>
//         You are not in development mode: your app will run at full speed.
//       </Text>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    display: 'flex'
  },
    addButton: {
        backgroundColor: Colors.tintColor,
        borderColor: Colors.tintColor,
        borderWidth: 1,
        height: 60,
        width: 60,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 2,
        bottom: 20,
        shadowColor: "#000000",
        elevation: 5,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
});
