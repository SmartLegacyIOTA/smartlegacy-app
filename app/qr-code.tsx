import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView } from "expo-camera";
import { Platform, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/src/theme/use-theme";

import { router, useLocalSearchParams } from "expo-router";
import { navigationCallbackRegistry } from "@/src/utils/navigation-callback-registry";

const QrCode = () => {
  const theme = useTheme();

  const { onCompleteId } = useLocalSearchParams<{
    onCompleteId: string;
  }>();

  const handleScanned = (data: string) => {
    if (onCompleteId) {
      const callback = navigationCallbackRegistry.getAndRemove(onCompleteId);
      if (callback) {
        callback(data);
        router.back();
        return;
      }
    }

    console.error("No onCompleteId callback find!");
  };

  return (
    <>
      <SafeAreaView
        style={[styleSheet.container, { backgroundColor: theme.colors.slBg }]}
      >
        {Platform.OS === "android" ? <StatusBar hidden /> : null}

        <CameraView
          style={styleSheet.camStyle}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={({ data }) => {
            if (data) {
              handleScanned(data);
            }
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default QrCode;

const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 20,
  },
  camStyle: {
    position: "absolute",
    width: 300,
    height: 300,
  },
});
