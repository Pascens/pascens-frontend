import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";

type ConditionChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

const ConditionChip = ({ label, selected = false, onPress }: ConditionChipProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      {selected && (
        <Ionicons name="checkmark" size={16} color="#fff" style={styles.icon} />
      )}
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  chipSelected: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontSize: 15,
    color: "#4B5563",
  },
  labelSelected: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default ConditionChip;
