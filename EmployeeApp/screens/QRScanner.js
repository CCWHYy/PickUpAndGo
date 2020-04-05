import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";
import { Feather } from "@expo/vector-icons";

import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  useTheme
} from "react-native-paper";

const QRScanner = props => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [packageNo, setPackageNo] = useState(false);

  const { colors } = useTheme();

  const { navigation } = props;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async data => {
    setScanned(true);
    handleScan(data);
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleScan = data => {
    setPackageNo(data);
    setConfirmVisible(true);
  };

  const handleClose = () => {
    setConfirmVisible(false);
    navigation.pop();
  };

  return (
    <View
      style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
    >
      <BarCodeScanner
        onBarCodeScanned={
          scanned ? () => undefined : ({ data }) => handleBarCodeScanned(data)
        }
        style={styles.absoluteFillObject}
      >
        <View style={styles.topAndDownRow}>
          <View
            style={{
              alignSelf: "flex-start",
              marginLeft: 20
            }}
          >
            <Feather
              name="arrow-left"
              color="white"
              size={30}
              onPress={() => navigation.goBack()}
            />
          </View>
          <Text style={styles.text}>Zeskanuj kod z telefonu klienta</Text>
        </View>
        <View style={styles.middleRow}>
          <View style={styles.middleRowColumn} />
          <View style={styles.middleRowContent} />
          <View style={styles.middleRowColumn} />
        </View>
        <View style={styles.topAndDownRow} />
      </BarCodeScanner>
      <Portal>
        <Dialog visible={confirmVisible} onDismiss={handleClose}>
          <Dialog.Title>Kod wykryty</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Proszę wydać paczkę {packageNo} i potwierdzić poniżej.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button color={colors.secondary} onPress={handleClose}>
              Potwierdź
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  middleRowContent: {
    borderWidth: 3,
    borderColor: "white",
    width: "100%",
    height: "100%",
    flex: 3
  },
  middleRowColumn: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)" },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 24
  },
  absoluteFillObject: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  middleRow: {
    flex: 1,
    flexDirection: "row"
  },
  topAndDownRow: {
    backgroundColor: "rgba(0,0,0,0.7)",
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderColor: "white"
  }
});

export { QRScanner };
