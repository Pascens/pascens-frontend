import * as Haptics from "expo-haptics";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, LayoutChangeEvent, StyleSheet, TextInput } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CompactBar } from "./CompactSearchBar";
import { ExpandedSearch } from "./ExtendedSearchBar";

const COMPACT_VISIBLE = 80;

interface SearchSheetProps {
  onExpandedChange?: (expanded: boolean) => void;
}

export function SearchSheet({ onExpandedChange }: SearchSheetProps = {}) {
  const insets = useSafeAreaInsets();

  // Shared value so worklets always read the latest measured snap point
  const snapCompact = useSharedValue(9999);
  const sheetY = useSharedValue(9999);
  const startY = useSharedValue(0);

  const containerHeight = useRef(0);
  const isExpandedRef = useRef(false);

  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<"product" | "ingredient">("product");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    isExpandedRef.current = isExpanded;
    onExpandedChange?.(isExpanded);
  }, [isExpanded, onExpandedChange]);

  // Recalculate snap when layout or insets change
  const applySnap = useCallback(() => {
    if (containerHeight.current === 0) return;
    const snap = containerHeight.current - COMPACT_VISIBLE - insets.bottom;
    snapCompact.value = snap;
    if (!isExpandedRef.current) sheetY.value = snap;
  }, [insets.bottom, snapCompact, sheetY]);

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      containerHeight.current = e.nativeEvent.layout.height;
      applySnap();
    },
    [applySnap],
  );

  useEffect(() => {
    applySnap();
  }, [applySnap]);

  const doExpand = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 250);
  }, []);

  const expand = useCallback(() => {
    sheetY.value = withSpring(0, { damping: 70, stiffness: 450 });
    doExpand();
  }, [sheetY, doExpand]);

  const collapse = useCallback(() => {
    Keyboard.dismiss();
    setQuery("");
    setSearchType("product");
    sheetY.value = withSpring(snapCompact.value, { damping: 70, stiffness: 450 }, () => {
      runOnJS(setIsExpanded)(false);
    });
  }, [sheetY, snapCompact]);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      startY.value = sheetY.value;
    })
    .onUpdate((e) => {
      sheetY.value = Math.max(0, Math.min(snapCompact.value, startY.value + e.translationY));
    })
    .onEnd((e) => {
      const midpoint = snapCompact.value / 2;
      if (e.velocityY < -500 || sheetY.value < midpoint) {
        sheetY.value = withSpring(0, { damping: 70, stiffness: 450 });
        runOnJS(doExpand)();
      } else {
        sheetY.value = withSpring(snapCompact.value, { damping: 70, stiffness: 450 }, () => {
          runOnJS(setIsExpanded)(false);
        });
      }
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetY.value }],
    borderTopLeftRadius: interpolate(sheetY.value, [0, 60], [0, 24], "clamp"),
    borderTopRightRadius: interpolate(sheetY.value, [0, 60], [0, 24], "clamp"),
  }));

  const compactStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      sheetY.value,
      [snapCompact.value * 0.6, snapCompact.value],
      [0, 1],
      "clamp",
    ),
  }));

  const expandedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(sheetY.value, [0, snapCompact.value * 0.4], [1, 0], "clamp"),
  }));

  return (
    <Animated.View style={[styles.sheet, sheetStyle]} onLayout={handleLayout}>
      <Animated.View
        style={[StyleSheet.absoluteFillObject, expandedStyle]}
        pointerEvents={isExpanded ? "auto" : "none"}
      >
        <ExpandedSearch
          query={query}
          onQueryChange={setQuery}
          searchType={searchType}
          onSearchTypeChange={setSearchType}
          onCollapse={collapse}
          inputRef={inputRef}
          insets={insets}
        />
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[StyleSheet.absoluteFillObject, compactStyle]}
          pointerEvents={isExpanded ? "none" : "auto"}
        >
          <CompactBar onExpand={expand} />
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
});
