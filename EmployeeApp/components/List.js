import { Text, View } from "react-native";

import { List } from "react-native-paper";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const MyList = ({ items, justWatch }) => {
  const navigation = useNavigation();
  return (
    <List.Section>
      {items.map(item => {
        const productsString =
          item.products.length === 1
            ? "produkt"
            : item.products.length < 5
            ? "produkty"
            : "produktów";
        return (
          <List.Item
            key={item.id}
            title={item.number}
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
            description={item.date}
            right={() => (
              <View
                style={{
                  marginRight: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    color: "red"
                  }}
                >
                  {`${item.products.length} ${productsString}`}
                </Text>
              </View>
            )}
            onPress={() =>
              navigation.navigate("Products", {
                items: item.products,
                justWatch
              })
            }
          />
        );
      })}
    </List.Section>
  );
};
export { MyList };
