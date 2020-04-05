import { ArchiveOrdersStack } from "./screens/ArchiveOrders";
import DrawerContent from "./components/DrawerContent";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { ReadyOrdersStack } from "./screens/ReadyOrders";
import { LoginScreen } from "./screens/Login";
import { OrdersStack } from "./screens/Orders";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export const Router = () => {
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={props => <DrawerContent {...props} />}
        >
          <Drawer.Screen name="LoginScreen" component={LoginScreen} />
          <Drawer.Screen name="OrdersStack" component={OrdersStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};
