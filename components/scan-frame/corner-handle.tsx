import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { GREEN, CORNER_SIZE, CORNER_THICKNESS, CORNER_RADIUS } from "./constants";

type Position = "TL" | "TR" | "BL" | "BR";

interface CornerHandleProps {
  gesture: ReturnType<typeof Gesture.Pan>;
  position: Position;
}

export function CornerHandle({ gesture, position }: CornerHandleProps) {
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.handle, handlePositions[position]]} hitSlop={12}>
        <View style={[styles.l, lShapes[position]]} />
      </Animated.View>
    </GestureDetector>
  );
}

const handlePositions: Record<Position, object> = {
  TL: { top: -22, left: -22 },
  TR: { top: -22, right: -22 },
  BL: { bottom: -22, left: -22 },
  BR: { bottom: -22, right: -22 },
};

const lShapes: Record<Position, object> = {
  TL: { bottom: 0, right: 0, borderTopWidth: CORNER_THICKNESS, borderLeftWidth: CORNER_THICKNESS, borderTopLeftRadius: CORNER_RADIUS },
  TR: { bottom: 0, left: 0, borderTopWidth: CORNER_THICKNESS, borderRightWidth: CORNER_THICKNESS, borderTopRightRadius: CORNER_RADIUS },
  BL: { top: 0, right: 0, borderBottomWidth: CORNER_THICKNESS, borderLeftWidth: CORNER_THICKNESS, borderBottomLeftRadius: CORNER_RADIUS },
  BR: { top: 0, left: 0, borderBottomWidth: CORNER_THICKNESS, borderRightWidth: CORNER_THICKNESS, borderBottomRightRadius: CORNER_RADIUS },
};

const styles = StyleSheet.create({
  handle: {
    position: "absolute",
    width: 44,
    height: 44,
    zIndex: 20,
  },
  l: {
    position: "absolute",
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderColor: GREEN,
  },
});
