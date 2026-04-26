import { INDICATOR_CONFIG, IndicatorType } from "@/constants/indicators";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface IndicatorInfoSheetProps {
  type: IndicatorType | null;
  onClose: () => void;
}

const CLOSE_THRESHOLD = 80;
const CLOSE_VELOCITY = 800;
const CLOSE_DISTANCE = 600;
const CLOSE_DURATION = 220;

export const IndicatorInfoSheet = ({ type, onClose }: IndicatorInfoSheetProps) => {
  const [visibleType, setVisibleType] = useState<IndicatorType | null>(type);
  const config = visibleType ? INDICATOR_CONFIG[visibleType] : null;
  const translateY = useSharedValue(CLOSE_DISTANCE);

  useEffect(() => {
    if (type !== null) {
      setVisibleType(type);
      translateY.value = withTiming(0, { duration: 220 });
    }
  }, [type, translateY]);

  const finishClose = () => {
    setVisibleType(null);
    onClose();
  };

  const animateClose = () => {
    translateY.value = withTiming(CLOSE_DISTANCE, { duration: CLOSE_DURATION }, (finished) => {
      if (finished) runOnJS(finishClose)();
    });
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) translateY.value = e.translationY;
    })
    .onEnd((e) => {
      const shouldClose = e.translationY > CLOSE_THRESHOLD || e.velocityY > CLOSE_VELOCITY;
      if (shouldClose) {
        translateY.value = withTiming(CLOSE_DISTANCE, { duration: 180 }, (finished) => {
          if (finished) runOnJS(finishClose)();
        });
      } else {
        translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Modal
      visible={visibleType !== null}
      transparent
      animationType="none"
      onRequestClose={animateClose}
    >
      <Pressable style={styles.backdrop} onPress={animateClose}>
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[styles.sheet, animatedStyle]}
            onStartShouldSetResponder={() => true}
          >
            <Pressable onPress={(e) => e.stopPropagation()}>
              <View style={styles.handle} />
              {config && (
                <>
                  <View style={styles.header}>
                    <View style={[styles.iconTile, { backgroundColor: config.backgroundColor }]}>
                      <Ionicons name={config.icon} size={24} color={config.iconColor} />
                    </View>
                    <Text style={styles.title}>{config.title}</Text>
                    <Pressable onPress={animateClose} style={styles.close} hitSlop={8}>
                      <Ionicons name="close" size={18} color={Colors.darkGray} />
                    </Pressable>
                  </View>
                  <Text style={styles.description}>{config.description}</Text>
                </>
              )}
            </Pressable>
          </Animated.View>
        </GestureDetector>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.0)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  iconTile: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.text,
  },
  close: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    fontSize: 14,
    color: "#4A5568",
    lineHeight: 22,
  },
});

export default IndicatorInfoSheet;
