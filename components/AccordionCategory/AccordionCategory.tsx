import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";
import ConditionChip from "@/components/ConditionChip/ConditionChip";

type Condition = {
  id: string;
  label: string;
};

type AccordionCategoryProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  conditions: Condition[];
  onSelectionChange?: (selectedIds: string[]) => void;
};

const AccordionCategory = ({
  label,
  icon,
  conditions,
  onSelectionChange,
}: AccordionCategoryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const hasSelection = selectedIds.length > 0;

  const toggleChip = (id: string) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((s) => s !== id)
      : [...selectedIds, id];
    setSelectedIds(next);
    onSelectionChange?.(next);
  };

  return (
    <View style={[styles.container, hasSelection && styles.containerSelected]}>
      <Pressable
        style={styles.header}
        onPress={() => setIsOpen((prev) => !prev)}
      >
        <View style={[styles.iconCircle, hasSelection && styles.iconCircleSelected]}>
          <Ionicons
            name={icon}
            size={18}
            color={hasSelection ? Colors.primary : "#9CA3AF"}
          />
        </View>

        <Text style={[styles.title, hasSelection && styles.titleSelected]}>
          {label}
        </Text>

        <View style={styles.rightSection}>
          {hasSelection && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{selectedIds.length}</Text>
            </View>
          )}
          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={18}
            color="#9CA3AF"
          />
        </View>
      </Pressable>

      {isOpen && (
        <>
          <View style={[styles.divider, hasSelection && styles.dividerSelected]} />
          <View style={styles.chipsContainer}>
            {conditions.map((condition) => (
              <ConditionChip
                key={condition.id}
                label={condition.label}
                selected={selectedIds.includes(condition.id)}
                onPress={() => toggleChip(condition.id)}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  containerSelected: {
    borderColor: Colors.secondary,
    backgroundColor: "#EDFBF3",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircleSelected: {
    backgroundColor: "#D1F5E3",
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: "600",
    color: "#111827",
  },
  titleSelected: {
    color: Colors.primary,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 0,
  },
  dividerSelected: {
    backgroundColor: "#B6EDD1",
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    padding: 16,
  },
});

export default AccordionCategory;
