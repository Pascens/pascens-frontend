import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

interface SegmentedControlProps {
  value: "product" | "ingredient";
  onChange: (v: "product" | "ingredient") => void;
}

export function SegmentedControl({ value, onChange }: SegmentedControlProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const translateX = useSharedValue(0);

  useEffect(() => {
    if (containerWidth > 0) {
      const segmentWidth = (containerWidth - 8) / 2;
      translateX.value = withSpring(value === "product" ? 4 : 4 + segmentWidth, {
        stiffness: 1000,
      });
    }
  }, [value, containerWidth]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: containerWidth > 0 ? (containerWidth - 8) / 2 : 0,
  }));

  return (
    <View
      style={styles.container}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <Animated.View style={[styles.indicator, indicatorStyle]} />
      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onChange("product");
        }}
        style={styles.segment}
      >
        <MaterialIcons
          name="shopping-bag"
          size={16}
          color={value === "product" ? "#2D3436" : "#95A5A6"}
        />
        <Text style={[styles.segmentText, { color: value === "product" ? "#2D3436" : "#95A5A6" }]}>
          Producto
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onChange("ingredient");
        }}
        style={styles.segment}
      >
        <MaterialIcons
          name="eco"
          size={16}
          color={value === "ingredient" ? "#2D3436" : "#95A5A6"}
        />
        <Text
          style={[styles.segmentText, { color: value === "ingredient" ? "#2D3436" : "#95A5A6" }]}
        >
          Ingrediente
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    backgroundColor: "#F0F0F0",
    borderRadius: 100,
    padding: 4,
    height: 44,
    flexDirection: "row",
  },
  indicator: {
    position: "absolute",
    top: 4,
    bottom: 4,
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  segment: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    zIndex: 1,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
