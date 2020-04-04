import { Avatar, Badge, Caption, Drawer, Title } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Feather } from "@expo/vector-icons";

const DrawerContent = ({ navigation }) => {
  return (
    <DrawerContentScrollView>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri:
                "https://miro.medium.com/fit/c/80/80/1*9ZtET_L1852yXaDZJUo9CQ.png",
            }}
            size={50}
          />
          <Title style={styles.title}>Kent C. Doods</Title>
          <Caption style={styles.caption}>@kcd</Caption>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <View style={styles.iconContainer}>
                <Feather name="inbox" color={color} size={size} />
                <Badge style={styles.badge} size={16}>
                  3
                </Badge>
              </View>
            )}
            label="Do wzięcia"
            onPress={() => {
              navigation.navigate("TakeOrdersStack");
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Feather
                style={styles.icon}
                name="check-circle"
                color={color}
                size={size}
              />
            )}
            label="Gotowe"
            onPress={() => {
              navigation.navigate("ReadyOrdersStack");
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Feather
                style={styles.icon}
                name="archive"
                color={color}
                size={size}
              />
            )}
            label="Archiwum"
            onPress={() => {
              navigation.navigate("ArchiveOrdersStack");
            }}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    width: 35,
  },
  badge: { position: "relative", top: 3, right: 5 },
  icon: {
    width: 35,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
});

export default DrawerContent;
