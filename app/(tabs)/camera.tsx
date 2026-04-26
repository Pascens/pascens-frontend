import { ScanFrame } from "@/components/scan-frame";
import { SearchSheet } from "@/components/search-sheet";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useIsFocused } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router, useFocusEffect, type Href } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [locked, setLocked] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const lockRef = useRef(false);
  const isFocused = useIsFocused();
  const cameraActive = isFocused && !searchExpanded;

  useFocusEffect(
    useCallback(() => {
      lockRef.current = false;
      setLocked(false);
    }, []),
  );

  if (!permission) {
    return <ThemedView style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle" style={styles.message}>
          Necesitamos permiso para usar la cámara
        </ThemedText>
        <Button title="Conceder permiso" onPress={requestPermission} />
      </ThemedView>
    );
  }

  const handleBarCodeScanned = (data: string) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setLocked(true);
    router.push(`/products/${encodeURIComponent(data)}` as Href);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {cameraActive && (
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: [
              "qr",
              "ean13",
              "ean8",
              "upc_a",
              "upc_e",
              "code39",
              "code93",
              "code128",
              "itf14",
              "pdf417",
              "aztec",
              "datamatrix",
            ],
          }}
          onBarcodeScanned={locked ? undefined : (result) => handleBarCodeScanned(result.data)}
        />
      )}
      <View style={styles.overlay} pointerEvents="box-none">
        <ScanFrame />
      </View>

      <SearchSheet onExpandedChange={setSearchExpanded} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  scanFrameWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hintBox: {
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 32,
  },
  hintText: {
    color: "#fff",
  },
  resultBox: {
    backgroundColor: "rgba(0,0,0,0.75)",
    borderRadius: 12,
    padding: 16,
    gap: 8,
    marginBottom: 32,
  },
  codeText: {
    color: "#fff",
    fontSize: 16,
  },
});
