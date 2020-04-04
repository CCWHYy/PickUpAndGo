import { Appbar, Avatar, useTheme } from "react-native-paper";

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
    <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }}>
      {previous ? (
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          color={theme.colors.primary.contrastColor}
        />
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Avatar.Image
            size={40}
            source={{
              uri:
                "https://miro.medium.com/fit/c/80/80/1*9ZtET_L1852yXaDZJUo9CQ.png"
            }}
          />
        </TouchableOpacity>
      )}
      <Appbar.Content titleStyle={{ fontWeight: "600" }} title={title} />
    </Appbar.Header>
  );
};
export { Header };
