import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  withDelay,
  interpolate,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { GREEN, MIN_W, MAX_W, MIN_H, MAX_H } from "./constants";
import { ScanLine } from "./scan-line";
import { CornerHandle } from "./corner-handle";

interface ScanFrameProps {
  /** Initial frame width (default 288) */
  initialWidth?: number;
  /** Initial frame height (default 192) */
  initialHeight?: number;
  /** Whether the frame can be resized by dragging corners (default true) */
  resizable?: boolean;
  /** Whether the frame can be moved by dragging the center (default true) */
  movable?: boolean;
}

export function ScanFrame({
  initialWidth = 288,
  initialHeight = 192,
  resizable = true,
  movable = true,
}: ScanFrameProps) {
  // ── Scan-line animation ──────────────────────────────────
  const scanProgress = useSharedValue(0);

  useEffect(() => {
    scanProgress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
  }, []);

  // ── Pulse glow animation on corners ──────────────────────
  const cornerPulse = useSharedValue(0);

  useEffect(() => {
    cornerPulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
  }, []);

  // ── Entrance animation ───────────────────────────────────
  const entrance = useSharedValue(0);

  useEffect(() => {
    entrance.value = withDelay(
      100,
      withTiming(1, { duration: 400, easing: Easing.out(Easing.back(1.2)) }),
    );
  }, []);

  // ── Frame dimensions & position (gesture-driven) ─────────
  const frameW = useSharedValue(initialWidth);
  const frameH = useSharedValue(initialHeight);
  const frameX = useSharedValue(0);
  const frameY = useSharedValue(0);
  const savedW = useSharedValue(initialWidth);
  const savedH = useSharedValue(initialHeight);
  const savedX = useSharedValue(0);
  const savedY = useSharedValue(0);

  // ── Move gesture ─────────────────────────────────────────
  const moveGesture = Gesture.Pan()
    .enabled(movable)
    .onStart(() => {
      savedX.value = frameX.value;
      savedY.value = frameY.value;
    })
    .onUpdate((e) => {
      frameX.value = savedX.value + e.translationX;
      frameY.value = savedY.value + e.translationY;
    });

  // ── Corner resize gestures ───────────────────────────────
  const makeCornerGesture = (signX: number, signY: number) =>
    Gesture.Pan()
      .enabled(resizable)
      .onStart(() => {
        savedW.value = frameW.value;
        savedH.value = frameH.value;
      })
      .onUpdate((e) => {
        frameW.value = Math.min(MAX_W, Math.max(MIN_W, savedW.value + signX * e.translationX));
        frameH.value = Math.min(MAX_H, Math.max(MIN_H, savedH.value + signY * e.translationY));
      });

  const tlGesture = makeCornerGesture(-1, -1);
  const trGesture = makeCornerGesture(1, -1);
  const blGesture = makeCornerGesture(-1, 1);
  const brGesture = makeCornerGesture(1, 1);

  // ── Animated styles ──────────────────────────────────────
  const containerStyle = useAnimatedStyle(() => ({
    width: frameW.value,
    height: frameH.value,
    transform: [
      { translateX: frameX.value },
      { translateY: frameY.value },
      { scale: interpolate(entrance.value, [0, 1], [0.85, 1]) },
    ],
    opacity: entrance.value,
  }));

  const cornerGlowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(cornerPulse.value, [0, 1], [0.7, 1]),
  }));

  return (
    <GestureDetector gesture={moveGesture}>
      <Animated.View style={[styles.container, containerStyle]}>
        <View style={styles.border} />
        <ScanLine progress={scanProgress} />
        <Animated.View
          style={[StyleSheet.absoluteFillObject, cornerGlowStyle]}
          pointerEvents="box-none"
        >
          <CornerHandle gesture={tlGesture} position="TL" />
          <CornerHandle gesture={trGesture} position="TR" />
          <CornerHandle gesture={blGesture} position="BL" />
          <CornerHandle gesture={brGesture} position="BR" />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    position: "relative",
  },
  border: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 2,
    borderColor: GREEN,
    borderRadius: 24,
  },
});
