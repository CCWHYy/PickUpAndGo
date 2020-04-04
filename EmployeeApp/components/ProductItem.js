import { Checkbox, List, useTheme } from "react-native-paper";
import React, { useState } from "react";

import { View } from "react-native";

const ProductItem = ({ product, orderTaken }) => {
  const [checked, setChecked] = useState(false);
  const { colors } = useTheme();
  console.log(product, checked);
  return (
    <List.Item
      title={product}
      titleStyle={{ marginLeft: 20, fontWeight: "600", fontSize: 16 }}
      style={{
        height: 60,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
      right={
        orderTaken
          ? () => (
              <View
                style={{
                  marginRight: 30,
                  justifyContent: "center",
                  backgroundColor: colors.secondary.light,
                  borderRadius: "1500",
                  alignItems: "center",
                  height: 40,
                  width: 40,
                }}
              >
                <Checkbox
                  color="black"
                  uncheckedColor="red"
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => setChecked(!checked)}
                />
              </View>
            )
          : null
      }
    />
  );
};

export { ProductItem };
