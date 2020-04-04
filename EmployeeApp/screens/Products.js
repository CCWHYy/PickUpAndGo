import { Button, List, useTheme } from "react-native-paper";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { ProductItem } from "../components/ProductItem";

const Products = ({ route }) => {
  const [orderTaken, setOrderTaken] = useState(false);
  const { colors } = useTheme();
  const { items, justWatch } = route.params;
  console.log(justWatch);

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <List.Section>
          {items.map((product, index) => (
            <ProductItem
              key={index}
              product={product}
              orderTaken={orderTaken}
            />
          ))}
        </List.Section>
      </View>
      {!justWatch && (
        <Button
          mode="contained"
          labelStyle={{ fontWeight: "600", fontSize: 16 }}
          style={{
            width: "40%",
            marginTop: 50,
            height: 50,
            justifyContent: "center"
          }}
          color={colors.primary.main}
          onPress={() => setOrderTaken(true)}
        >
          Weź
        </Button>
      )}
    </View>
  );
};

export { Products };
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
