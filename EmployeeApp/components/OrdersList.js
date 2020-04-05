import { Text, View } from "react-native";

import { List } from "react-native-paper";
import React from "react";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";

const OrdersList = ({ orders = [] }) => {
  const navigation = useNavigation();
  return (
    <List.Section>
      {orders.map((order, index) => {
        order.products = order.products || [];
        const productsString =
          order.products.length === 1
            ? "produkt"
            : order.products.length < 5
            ? "produkty"
            : "produktów";
        return (
          <List.Item
            key={order.id}
            title={format(new Date(order.timeCreated), "dd.MM.yyyy hh:mm")}
            description={`#${index}`}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
            right={() => (
              <View
                style={{
                  marginRight: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>
                  {order.products.length} {productsString}
                </Text>
              </View>
            )}
            onPress={() =>
              navigation.navigate("OrderDetails", {
                order,
              })
            }
          />
        );
      })}
    </List.Section>
  );
};
export { OrdersList };
