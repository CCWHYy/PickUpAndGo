import { ArchiveOrders } from "./screens/ArchiveOrders";
import { Header } from "./components/Header";
import { Orders } from "./screens/Orders";
import { QRScanner } from "./screens/QRScanner";
import React from "react";
import { ReadyOrders } from "./screens/ReadyOrders";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const HomeScreen = () => {
  return <Text>home</Text>;
};

const OrderStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Order"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, navigation }) => (
          <Header scene={scene} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen
        name="Order"
        component={Orders}
        options={{ headerTitle: "Do wzięcia" }}
      />
      <Stack.Screen
        name="ReadyOrders"
        component={ReadyOrders}
        options={{ headerTitle: "Gotowe" }}
      />
      <Stack.Screen
        name="ArchiveOrders"
        component={ArchiveOrders}
        options={{ headerTitle: "Historia" }}
      />
      <Stack.Screen
        name="QRScanner"
        component={QRScanner}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export { OrderStack };
