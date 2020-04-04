import { StyleSheet, View } from "react-native";

import { Fab } from "../components/Fab";
import { Header } from "../components/Header";
import { MyList } from "../components/List";
import { Products } from "./Products";
import { QRScanner } from "./QRScanner";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const orderss = [
  {
    id: "1",
    number: "32321",
    products: ["mleko", "miód", "wódeczka", "chlebek"],
    date: "12.12.2019 14:32"
  },
  {
    id: "2",
    number: "30985",
    products: ["mleko", "miód", "wódeczka", "chlebek"],
    date: "12.12.2019 14:32"
  },
  {
    id: "3",
    number: "74628",
    products: ["mleko", "miód", "wódeczka", "chlebek"],
    date: "12.12.2019 14:32"
  },
  {
    id: "4",
    number: "5934u953",
    products: ["mleko", "miód", "wódeczka", "chlebek"],
    date: "12.12.2019 14:32"
  }
];

const TakeOrdersScreen = props => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <MyList items={orderss} />
      </View>
      <Fab onPress={() => navigation.navigate("QRScanner")} />
    </View>
  );
};

const Stack = createStackNavigator();

const TakeOrdersStack = () => {
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
        name="Order"
        component={TakeOrdersScreen}
        options={{ headerTitle: "Do wzięcia" }}
      />
      <Stack.Screen
        name="Products"
        component={Products}
        options={{ headerTitle: "Produkty" }}
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

export { TakeOrdersStack };
