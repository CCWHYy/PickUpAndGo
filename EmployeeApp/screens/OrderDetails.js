import { Button, List, useTheme } from "react-native-paper";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { ProductItem } from "../components/ProductItem";
import { find } from "lodash";
import produce from "immer";

const OrderDetails = ({ route }) => {
  const { order, readOnly } = route.params;
  const { colors } = useTheme();

  const [products, setProducts] = useState(
    order.products.map(p => ({ ...p, found: false }))
  );
  const modifyProduct = id => {
    setProducts(state =>
      produce(state, draft => {
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
          {products.map(product => (
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
        style={{
          maxWidth: "80%",
          marginTop: 50,
          height: 50,
          justifyContent: "center"
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
    alignItems: "center"
  },
  listContainer: {
    width: "100%"
  }
});
