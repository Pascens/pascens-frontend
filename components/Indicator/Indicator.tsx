import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

type IndicatorProps = {
  label: string;
  icon: IoniconName;
  color: string;
};

const withAlpha = (hex: string, alpha: number) => {
  const a = Math.round(Math.max(0, Math.min(1, alpha)) * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${a}`;
};

export const Indicator = ({ label = "Placeholder", icon, color }: IndicatorProps) => {
  return (
    <View style={[styles.container, { borderColor: withAlpha(color, 0.8) }]}>
      <Ionicons name={icon} size={22} color={color} style={styles.icon} />
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
    borderWidth: 2,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "700",
  },
});

export default Indicator;
