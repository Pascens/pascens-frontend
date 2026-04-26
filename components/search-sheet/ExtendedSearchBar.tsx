import React, { RefObject, useCallback, useMemo } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { NutriScoreBadge, RiskBadge } from "./badges";
import { SegmentedControl } from "./segmented-control";
import { MOCK_PRODUCTS, MOCK_INGREDIENTS } from "./types";
import type { Product, Ingredient } from "./types";

const GREEN = "#2FC767";

interface ExpandedSearchProps {
  query: string;
  onQueryChange: (q: string) => void;
  searchType: "product" | "ingredient";
  onSearchTypeChange: (t: "product" | "ingredient") => void;
  onCollapse: () => void;
  inputRef: RefObject<TextInput>;
  insets: { top: number };
}

export function ExpandedSearch({
  query,
  onQueryChange,
  searchType,
  onSearchTypeChange,
  onCollapse,
  inputRef,
  insets,
}: ExpandedSearchProps) {
  const filteredProducts = useMemo(() => {
    if (!query.trim()) return MOCK_PRODUCTS;
    const q = query.toLowerCase();
    return MOCK_PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q),
    );
  }, [query]);

  const filteredIngredients = useMemo(() => {
    if (!query.trim()) return MOCK_INGREDIENTS;
    const q = query.toLowerCase();
    return MOCK_INGREDIENTS.filter(
      (i) => i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q),
    );
  }, [query]);

  const renderProductItem = useCallback(
    ({ item }: { item: Product }) => (
      <Pressable
        onPress={onCollapse}
        style={({ pressed }) => [styles.resultCard, pressed && { backgroundColor: "#F8F9FA" }]}
      >
        <View style={styles.productIcon}>
          <MaterialIcons name="fastfood" size={22} color="#95A5A6" />
        </View>
        <View style={styles.resultInfo}>
          <Text style={styles.resultName}>{item.name}</Text>
          <Text style={styles.resultSubtitle}>{item.brand}</Text>
        </View>
        <NutriScoreBadge score={item.nutriScore} />
      </Pressable>
    ),
    [onCollapse],
  );

  const renderIngredientItem = useCallback(
    ({ item }: { item: Ingredient }) => (
      <View style={styles.resultCard}>
        <View style={styles.ingredientIcon}>
          <MaterialIcons name="eco" size={22} color={GREEN} />
        </View>
        <View style={styles.resultInfo}>
          <Text style={styles.resultName}>{item.name}</Text>
          <Text style={styles.resultSubtitle}>{item.category}</Text>
        </View>
        <RiskBadge risk={item.risk} />
      </View>
    ),
    [],
  );

  const renderEmptyProducts = useCallback(() => {
    if (!query.trim()) return null;
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <MaterialIcons name="search-off" size={40} color="#95A5A6" />
        </View>
        <Text style={styles.emptyText}>
          No se encontró el producto{"\n"}con &quot;{query}&quot;
        </Text>
        <Pressable
          onPress={onCollapse}
          style={({ pressed }) => [
            styles.addButton,
            pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
          ]}
        >
          <MaterialIcons name="add" size={22} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Agregar producto</Text>
        </Pressable>
      </View>
    );
  }, [query, onCollapse]);

  const renderEmptyIngredients = useCallback(() => {
    if (!query.trim()) return null;
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <MaterialIcons name="search-off" size={40} color="#95A5A6" />
        </View>
        <Text style={styles.emptyText}>
          No se encontró el ingrediente{"\n"}&quot;{query}&quot;
        </Text>
        <Pressable
          onPress={onCollapse}
          style={({ pressed }) => [
            styles.addButton,
            pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
          ]}
        >
          <MaterialIcons name="add" size={22} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Agregar</Text>
        </Pressable>
      </View>
    );
  }, [query, onCollapse]);

  return (
    <>
      <View style={[styles.expandedHeader, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerRow}>
          <Pressable
            onPress={onCollapse}
            style={({ pressed }) => [
              styles.backButton,
              pressed && { backgroundColor: "#E8F8F0" },
            ]}
          >
            <MaterialIcons name="arrow-back" size={22} color="#2D3436" />
          </Pressable>
          <Text style={styles.headerTitle}>Buscar producto</Text>
        </View>
        <View style={styles.searchInputContainer}>
          <MaterialIcons name="search" size={22} color="#95A5A6" />
          <TextInput
            ref={inputRef}
            value={query}
            onChangeText={onQueryChange}
            placeholder={
              searchType === "product"
                ? "Nombre de producto o marca..."
                : "Ej: azúcar, colorante rojo 40..."
            }
            placeholderTextColor="#95A5A6"
            style={styles.searchInput}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Pressable onPress={() => onQueryChange("")} style={styles.clearButton}>
              <MaterialIcons name="close" size={14} color="#FFFFFF" />
            </Pressable>
          )}
        </View>
        <SegmentedControl value={searchType} onChange={onSearchTypeChange} />
      </View>

      {searchType === "product" ? (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderProductItem}
          ListEmptyComponent={renderEmptyProducts}
          ListHeaderComponent={
            !query.trim() ? <Text style={styles.sectionHeader}>PRODUCTOS POPULARES</Text> : null
          }
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={filteredIngredients}
          keyExtractor={(item) => item.id}
          renderItem={renderIngredientItem}
          ListEmptyComponent={renderEmptyIngredients}
          ListHeaderComponent={
            !query.trim() ? (
              <Text style={styles.sectionHeader}>INGREDIENTES FRECUENTES</Text>
            ) : null
          }
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  expandedHeader: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8F9FA",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D3436",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    paddingHorizontal: 16,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: "#2D3436",
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#95A5A6",
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: "600",
    color: "#95A5A6",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  resultCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 10,
    gap: 14,
  },
  productIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },
  ingredientIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(47, 199, 103, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  resultInfo: {
    flex: 1,
    gap: 2,
  },
  resultName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2D3436",
  },
  resultSubtitle: {
    fontSize: 13,
    color: "#95A5A6",
  },
  emptyContainer: {
    alignItems: "center",
    paddingTop: 48,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F8F9FA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyText: {
    color: "#95A5A6",
    textAlign: "center",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: GREEN,
    borderRadius: 16,
    width: "100%",
    maxWidth: 320,
    shadowColor: GREEN,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
