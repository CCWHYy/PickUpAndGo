import DrawerContent from "./components/DrawerContent";
import { NavigationContainer } from "@react-navigation/native";
import { OrderStack } from "./OrderStack";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export const Router = () => {
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen name="OrderStack" component={OrderStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};
