import { Provider as PaperProvider } from "react-native-paper";
import React from "react";
import { Router } from "./routes";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <Router />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
