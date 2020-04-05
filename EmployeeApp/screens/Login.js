import { AsyncStorage, Image, StyleSheet, View, Text } from "react-native";

import { Avatar, Button, TextInput, useTheme } from "react-native-paper";
import { Fab } from "../components/Fab";
import { Header } from "../components/Header";
import { OrdersList } from "../components/OrdersList";
import { OrderDetails } from "./OrderDetails";
import { QRScanner } from "./QRScanner";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StackActions } from "@react-navigation/native";

import { Snackbar } from "react-native-paper";

import Logo from "../assets/icon.png";

const LoginScreen = props => {
  useEffect(() => {
    AsyncStorage.getItem("AUTH_TOKEN").then(token => {
      if (token) {
        navigation.reset({
          index: 0,
          actions: [navigation.navigate("OrdersStack")]
        });
      }
    });
  }, []);

  const { navigation } = props;
  const { colors } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [failToastOpen, setFailToastOpen] = useState(false);
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://pickupandgo20200404185015.azurewebsites.net/api/users/login",
        {
          body: JSON.stringify({ email, password }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST"
        }
      );
      const json = await response.json();
      await AsyncStorage.setItem("AUTH_TOKEN", json.token);
      navigation.reset({ index: 1, routes: [{ name: "OrdersStack" }] });
    } catch (e) {
      console.error(e);
      setFailToastOpen(true);
    }
  };

  return (
    <View style={{ height: "100%" }}>
      <View style={{ paddingTop: 96, paddingLeft: 16, paddingRight: 16 }}>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image style={{ height: 96, width: 96 }} source={Logo} />
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
            Łapu Capu
          </Text>
        </View>
        <TextInput
          style={{ minWidth: 180, marginBottom: 8 }}
          variant="outline"
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={{ minWidth: 180, marginBottom: 8 }}
          variant="outline"
          label="Hasło"
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <Button mode="contained" onPress={handleSubmit}>
          Zaloguj się
        </Button>
      </View>
      <Snackbar
        visible={failToastOpen}
        onDismiss={() => setFailToastOpen(false)}
      >
        Logowanie nie powiodło się! Sprawdź wpisane dane oraz łączność z
        internetem.
      </Snackbar>
    </View>
  );
};

export { LoginScreen };
