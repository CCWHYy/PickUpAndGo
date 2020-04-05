import { Checkbox, List, useTheme } from "react-native-paper";
import React, { useState } from "react";

import { Text, View } from "react-native";

const ProductItem = ({ product, modifyProduct }) => {
  const { colors } = useTheme();
  return (
    <List.Item
      title={product.name}
      description={product.brand}
      titleStyle={{ fontWeight: "600", fontSize: 18 }}
      style={{
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center"
      }}
      right={
        modifyProduct
          ? () => (
              <View
                style={{
                  fontSize: 16,
                  marginRight: 10,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                  width: 70
                }}
              >
                <Checkbox
                  color="black"
                  status={product.found ? "checked" : "unchecked"}
                  onPress={() => modifyProduct(product.id)}
                />
                <Text>
                  {product.quantity} {product.quantityUnit}
                </Text>
              </View>
            )
          : null
      }
    />
  );
};

export { ProductItem };
