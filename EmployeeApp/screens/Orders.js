import { Text, AsyncStorage, StyleSheet, View } from "react-native";

import { useTheme } from "react-native-paper";
import { Fab } from "../components/Fab";
import { Header } from "../components/Header";
import { OrdersList } from "../components/OrdersList";
import { OrderDetails } from "./OrderDetails";
import { QRScanner } from "./QRScanner";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

const OrdersScreen = props => {
  const { navigation } = props;
  const [userInfo, setUserInfo] = useState({ unfetched: true, info: {} });
  const [orders, setOrders] = useState({ unfetched: true, orders: [] });

  useEffect(() => {
    if (userInfo.unfetched) {
      AsyncStorage.getItem("AUTH_TOKEN")
        .then(token =>
          fetch(
            "https://pickupandgo20200404185015.azurewebsites.net/api/users/me",
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              }
            }
          )
        )
        .then(r => r.json())
        .then(json => setUserInfo({ unfetched: false, info: json }))
        .then(() => console.log("fetched info"))
        .catch(err => console.log(err));
    }
  }, [userInfo, setUserInfo]);

  useEffect(() => {
    if (!userInfo.unfetched && userInfo.info.storeId && orders.unfetched) {
      AsyncStorage.getItem("AUTH_TOKEN").then(token =>
        fetch(
          `https://pickupandgo20200404185015.azurewebsites.net/api/orders?${userInfo.storeId}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        )
          .then(r => r.json())
          .then(json => setOrders({ unfetched: false, orders: json }))
          .then(() => console.log("fetched orders"))
          .catch(err => console.error(err))
      );
    }
  }, [userInfo.unfetched, userInfo.storeId, orders.unfetched]);

  console.log(orders);

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        {orders.unfetched ? (
          <Text>Loading...</Text>
        ) : (
          <OrdersList orders={orders.orders} />
        )}
      </View>
      <Fab onPress={() => navigation.navigate("QRScanner")} />
    </View>
  );
};

const Stack = createStackNavigator();

const OrdersStack = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Orders"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, navigation, previous }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        )
      }}
    >
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          title: "Nowe zamówienia",
          headerStyle: {
            backgroundColor: colors.primary.main
          },
          headerTintColor: colors.primary.contrastText
        }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={({ route }) => ({
          title: `#${route.params.order.orderNumber} - szczegóły`
        })}
      />
      <Stack.Screen
        name="QRScanner"
        component={QRScanner}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  listContainer: {
    top: 30,
    width: "100%"
  }
});

export { OrdersStack };
