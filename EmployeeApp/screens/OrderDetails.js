import { Alert, AsyncStorage, StyleSheet, View } from "react-native";
import { Button, Dialog, List, Portal, useTheme } from "react-native-paper";
import React, { useState } from "react";

import { ProductItem } from "../components/ProductItem";
import { find } from "lodash";
import produce from "immer";
import { useNavigation } from "@react-navigation/native";

const OrderDetails = ({ route }) => {
  const { order, readOnly } = route.params;
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [products, setProducts] = useState(
    (order.products || []).map((p) => ({ ...p, found: false }))
  );
  const modifyProduct = (id) => {
    setProducts((state) =>
      produce(state, (draft) => {
        const toChange = find(draft, { id });
        toChange.found = !toChange.found;
      })
    );
  };
  const productsRemaining = products.reduce(
    (count, p) => (count += p.found === false),
    0
  );
  console.log(productsRemaining);

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <List.Section>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              modifyProduct={modifyProduct}
            />
          ))}
        </List.Section>
      </View>
      <Button
        mode="contained"
        labelStyle={{ fontWeight: "600", fontSize: 16 }}
        onPress={() => {
          AsyncStorage.getItem("AUTH_TOKEN").then((token) =>
            fetch(
              `https://pickupandgo20200404185015.azurewebsites.net/api/orders`,
              {
                method: "PUT",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  id: order.id,
                  state: `Paczka gotowa ${order.id}`,
                }),
              }
            )
              .then((r) => r.json())
              .then((json) => console.log(json))
          );
          Alert.alert(
            "Sukces",
            "Klient został powiadomiony",
            [{ text: "OK", onPress: () => navigation.navigate("Orders") }],
            { cancelable: false }
          );
        }}
        style={{
          maxWidth: "80%",
          marginTop: 50,
          height: 50,
          justifyContent: "center",
        }}
        disabled={productsRemaining > 0}
        color={
          productsRemaining === 0 ? colors.secondary.main : colors.primary.main
        }
      >
        {productsRemaining === 0
          ? "Ustaw status Do Odbioru"
          : "Brakujących produktów: " + productsRemaining}
      </Button>
    </View>
  );
};

export { OrderDetails };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  listContainer: {
    width: "100%",
  },
});
