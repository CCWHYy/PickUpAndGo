import { FAB, useTheme } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";

import React from "react";
import { useSafeArea } from "react-native-safe-area-context";

const orderss = [
  {
    id: "1",
    number: "32321",
    products: ["mleko", "miód", "wódeczka", "chlebek"],
  },
];

const Orders = (props) => {
  const insets = useSafeArea();
  const { navigation } = props;
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text>Orders</Text>
      <FAB
        icon="camera"
        onPress={() => navigation.navigate("QRScanner")}
        style={{
          position: "absolute",
          bottom: 50,
          right: 16,
          backgroundColor: colors.primary,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { Orders };
