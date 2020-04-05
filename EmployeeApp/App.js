import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import React from "react";
import { Router } from "./routes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AsyncStorage } from "react-native";

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#efebce",
      secondary: "#bb8588"
    }
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <Router />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
