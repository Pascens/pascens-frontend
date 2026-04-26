import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface CompactBarProps {
  onExpand: () => void;
}

export function CompactBar({ onExpand }: CompactBarProps) {
  return (
    <View style={styles.compactTop}>
      <Pressable onPress={onExpand} hitSlop={{ top: 16, bottom: 16, left: 60, right: 60 }}>
        <View style={styles.handle} />
      </Pressable>
      <Pressable onPress={onExpand} style={styles.collapsedSearchBar}>
        <MaterialIcons name="search" size={22} color="#95A5A6" />
        <Text style={styles.collapsedPlaceholder}>
          Buscar productos, ingredientes o marcas...
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  compactTop: {
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  handle: {
    alignSelf: "center",
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#D0D0D0",
    marginBottom: 14,
  },
  collapsedSearchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  collapsedPlaceholder: {
    fontSize: 15,
    color: "#95A5A6",
    flex: 1,
  },
});
