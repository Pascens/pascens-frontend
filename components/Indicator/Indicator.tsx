import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

type IndicatorSize = "sm" | "md";

type IndicatorProps = {
  label: string;
  icon: IoniconName;
  color: string;
  size?: IndicatorSize;
};

const withAlpha = (hex: string, alpha: number) => {
  const a = Math.round(Math.max(0, Math.min(1, alpha)) * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${a}`;
};

const SIZES: Record<
  IndicatorSize,
  {
    paddingVertical: number;
    paddingHorizontal: number;
    iconSize: number;
    fontSize: number;
    borderWidth: number;
    iconMargin: number;
  }
> = {
  sm: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    iconSize: 13,
    fontSize: 12,
    borderWidth: 1.5,
    iconMargin: 4,
  },
  md: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    iconSize: 22,
    fontSize: 18,
    borderWidth: 2,
    iconMargin: 8,
  },
};

export const Indicator = ({ label = "Placeholder", icon, color, size = "md" }: IndicatorProps) => {
  const s = SIZES[size];
  return (
    <View
      style={[
        styles.container,
        {
          borderColor: withAlpha(color, 0.8),
          paddingVertical: s.paddingVertical,
          paddingHorizontal: s.paddingHorizontal,
          borderWidth: s.borderWidth,
        },
      ]}
    >
      <Ionicons name={icon} size={s.iconSize} color={color} style={{ marginRight: s.iconMargin }} />
      <Text style={[styles.label, { color, fontSize: s.fontSize }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
  },
  label: {
    fontWeight: "700",
  },
});

export default Indicator;
