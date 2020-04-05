import { StyleSheet, View } from "react-native";

import { useTheme } from "react-native-paper";
import { Fab } from "../components/Fab";
import { Header } from "../components/Header";
import { OrdersList } from "../components/OrdersList";
import { OrderDetails } from "./OrderDetails";
import { QRScanner } from "./QRScanner";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const orders = [
  {
    userId: "61F1C1DC-E262-470A-950C-D6F3A1356C18",
    storeId: "19351FF9-AC6B-427F-9BBE-8170436BB752",
    id: "19351FF9-AC6B-427F-9BBE-8170436CB752",
    orderNumber: "123",
    products: [
      {
        id: "3325F3AE-DD84-41A8-A4D0-1043743C6C90",
        storeId: "19351FF9-AC6B-427F-9BBE-8170436BB752",
        name: "prod",
        brand: "bradadadna",
        quantity: 0,
        quantityUnit: "string",
        price: 22,
        category: "food"
      },
      {
        id: "51AD90BE-FB14-4815-9C18-69FA1554C1F0",
        storeId: "19351FF9-AC6B-427F-9BBE-8170436BB752",
        name: "string",
        brand: "string",
        quantity: 15,
        quantityUnit: "string",
        price: 1,
        category: "string"
      },
      {
        id: "96AB6B4D-1E8B-4C3B-81B6-0E0DB891B48D",
        storeId: "19351FF9-AC6B-427F-9BBE-8170436BB752",
        name: "string",
        brand: "string",
        quantity: 0,
        quantityUnit: "string",
        price: 12,
        category: "string"
      }
    ]
  }
];

const OrdersScreen = props => {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <OrdersList orders={orders} />
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
          title: `#${route.params.order.orderNumber} - szczegóły`,
          headerStyle: {
            // backgroundColor: colors.primary.main
            backgroundColor: "red"
          },
          headerTintColor: colors.primary.contrastText
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
