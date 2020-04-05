import { Appbar, Avatar, useTheme } from "react-native-paper";
import { Feather } from "@expo/vector-icons";

import React from "react";
import { TouchableOpacity } from "react-native";

const Header = ({ scene, previous, navigation }) => {
  const theme = useTheme();
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;
  return (
    <Appbar.Header>
      {previous ? (
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      ) : (
        <Feather
          name="menu"
          style={{
            marginLeft: 16
          }}
          size={24}
          onPress={() => navigation.openDrawer()}
        />
      )}
      <Appbar.Content titleStyle={{ fontWeight: "600" }} title={title} />
    </Appbar.Header>
  );
};
export { Header };
