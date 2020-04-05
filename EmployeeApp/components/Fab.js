import { FAB, useTheme } from "react-native-paper";

import React from "react";

const Fab = ({ onPress }) => {
  const { colors } = useTheme();
  return (
    <FAB
      icon="camera"
      onPress={onPress}
      color="#000000"
      style={{
        position: "absolute",
        bottom: 50,
        right: 16,
        backgroundColor: colors.primary
      }}
    />
  );
};

export { Fab };
