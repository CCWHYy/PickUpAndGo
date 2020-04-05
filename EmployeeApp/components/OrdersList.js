import { Text, View } from "react-native";

import { List } from "react-native-paper";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const OrdersList = ({ orders = [] }) => {
  const navigation = useNavigation();
  return (
    <List.Section>
      {orders.map(order => {
        const productsString =
          order.products.length === 1
            ? "produkt"
            : order.products.length < 5
            ? "produkty"
            : "produktów";
        return (
          <List.Item
            key={order.id}
            title={order.date}
            description={`#${order.orderNumber}`}
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
            right={() => (
              <View
                style={{
                  marginRight: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text>
                  {order.products.length} {productsString}
                </Text>
              </View>
            )}
            onPress={() =>
              navigation.navigate("OrderDetails", {
                order
              })
            }
          />
        );
      })}
    </List.Section>
  );
};
export { OrdersList };
