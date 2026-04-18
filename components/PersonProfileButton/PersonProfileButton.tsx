import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

type PersonProfileButtonProps = {
  label: string;
  iconName: IoniconName;
  selected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
};

const PersonProfileButton = ({
  label,
  iconName,
  selected = false,
  onPress,
  disabled = false,
}: PersonProfileButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        selected && styles.buttonSelected,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.buttonPressed,
      ]}
    >
      <Ionicons
        name={iconName}
        size={28}
        color={selected ? Colors.primary : "#9CA3AF"}
      />
      <Text style={[styles.label, selected && styles.labelSelected, disabled && styles.labelDisabled]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.gray,
    backgroundColor: Colors.light.background,
    minWidth: 110,
  },
  buttonSelected: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}15`,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  label: {
  fontSize: 14,
  fontWeight: "500",
  color: "#9CA3AF",
},
  labelSelected: {
    color: Colors.primary,
    fontWeight: "600",
  },
  labelDisabled: {
    color: Colors.gray,
  },
});

export default PersonProfileButton;