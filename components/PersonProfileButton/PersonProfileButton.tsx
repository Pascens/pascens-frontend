import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

type PersonProfileButtonProps = {
  label: string;
  iconName: IoniconName;
  subtitle?: string;
  selected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
};

const PersonProfileButton = ({
  label,
  iconName,
  subtitle,
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
      <View style={[styles.iconCircle, selected && styles.iconCircleSelected]}>
        <Ionicons
          name={iconName}
          size={22}
          color={selected ? Colors.primary : Colors.darkgray}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.label, selected && styles.labelSelected]}>
          {label}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, selected && styles.subtitleSelected]}>
            {subtitle}
          </Text>
        )}
      </View>

      {selected && (
        <View style={styles.checkmark}>
          <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.gray,
    backgroundColor: Colors.light.background,
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
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircleSelected: {
    backgroundColor: `${Colors.primary}25`,
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.light.text,
  },
  labelSelected: {
    color: Colors.primary,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "400",
    color: Colors.darkgray,
  },
  subtitleSelected: {
    color: Colors.primary,
  },
  checkmark: {
    marginLeft: "auto",
  },
});

export default PersonProfileButton;
