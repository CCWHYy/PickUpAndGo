import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import React from "react";
import { Router } from "./routes";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: {
        main: "#efebce",
        light: "#ffffff",
        darkColor: "#bcb99d",
        contrastText: "#000000"
      },
      secondary: {
        main: "#bb8588",
        light: "#eeb5b8",
        dark: "#8a585b",
        contrastText: "#000000"
      }
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
