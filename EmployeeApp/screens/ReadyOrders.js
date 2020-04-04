import { StyleSheet, View } from "react-native";

import { Fab } from "../components/Fab";
import { Header } from "../components/Header";
import { MyList } from "../components/List";
import { QRScanner } from "./QRScanner";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const orderss = [
  {
    id: "1",
    number: "32321",
    products: ["mleko", "miód", "wódeczka", "chlebek"],
  },
  {
    id: "2",
    number: "30985",
    products: ["mleko", "miód", "wódeczka", "chlebek"],
  },
  {
    id: "3",
    number: "74628",
    products: ["mleko", "miód", "wódeczka", "chlebek"],
  },
  {
    id: "4",
    number: "5934u953",
    products: ["mleko", "miód", "wódeczka", "chlebek"],
  },
];
const Stack = createStackNavigator();

const ReadyOrdersStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ReadyOrders"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, navigation }) => (
          <Header scene={scene} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen
        name="ReadyOrders"
        component={ReadyOrders}
        options={{ headerTitle: "Gotowe" }}
      />
      <Stack.Screen
        name="QRScanner"
        component={QRScanner}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ReadyOrders = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <MyList items={orderss} justWatch />
      </View>
      <Fab onPress={() => navigation.navigate("QRScanner")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  listContainer: {
    top: 30,
    width: "100%",
  },
});

export { ReadyOrdersStack };
