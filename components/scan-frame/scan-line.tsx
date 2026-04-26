import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";
import { GREEN } from "./constants";

export function ScanLine({ progress }: { progress: SharedValue<number> }) {
  const lineStyle = useAnimatedStyle(() => ({
    top: `${progress.value * 100}%` as any,
  }));

  return (
    <View style={styles.clip}>
      <Animated.View style={[styles.line, lineStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  clip: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
    overflow: "hidden",
  },
  line: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: GREEN,
    shadowColor: GREEN,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 6,
  },
});
