import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

type Filter = "all" | "healthy" | "moderate" | "harmful";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onScanPress?: () => void;
  onGridPress?: () => void;
  activeFilter?: Filter;
  onFilterChange?: (filter: Filter) => void;
}

const FILTERS: { key: Filter; label: string; dot?: string }[] = [
  { key: "all", label: "Todos" },
  { key: "healthy", label: "Saludable", dot: "#10B981" },
  { key: "moderate", label: "Moderado", dot: "#D97706" },
  { key: "harmful", label: "Dañino", dot: "#EF4444" },
];

const SearchBar = ({
  value,
  onChangeText,
  onScanPress,
  onGridPress,
  activeFilter: controlledFilter,
  onFilterChange,
}: Props) => {
  const [internalFilter, setInternalFilter] = useState<Filter>("all");
  const activeFilter = controlledFilter ?? internalFilter;

  const handleFilterPress = (filter: Filter) => {
    setInternalFilter(filter);
    onFilterChange?.(filter);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.searchField}>
          <MaterialIcons name="search" size={18} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Buscar producto o marca..."
            placeholderTextColor="#9CA3AF"
            value={value}
            onChangeText={onChangeText}
          />
        </View>
        <Pressable style={styles.iconButton} onPress={onScanPress}>
          <MaterialIcons name="crop-free" size={18} color="#9CA3AF" />
        </Pressable>
        <Pressable style={styles.iconButton} onPress={onGridPress}>
          <MaterialIcons name="apps" size={18} color="#1F2937" />
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersRow}
      >
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter.key;
          return (
            <Pressable
              key={filter.key}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => handleFilterPress(filter.key)}
            >
              {filter.dot && !isActive && (
                <View style={[styles.dot, { backgroundColor: filter.dot }]} />
              )}
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {filter.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F4F4F5",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 2,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 40,
  },
  searchField: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F4",
    borderRadius: 20,
    paddingLeft: 12,
    paddingRight: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
    paddingVertical: 0,
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: "#F5F5F4",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  filtersRow: {
    flexDirection: "row",
    gap: 8,
    paddingBottom: 2,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    height: 28,
    paddingHorizontal: 12,
    backgroundColor: "#F5F5F4",
    borderRadius: 999,
    gap: 6,
  },
  chipActive: {
    backgroundColor: "#1F2937",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4B5563",
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
});
