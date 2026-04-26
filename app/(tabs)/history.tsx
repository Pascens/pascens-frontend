import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import ProductCard from "@/components/ProductCard/ProductCard";
import { NutriScore } from "@/components/ProductCard/NutriScoreBadge";
import ProductImageCard from "@/components/ProductImageCard/ProductImageCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import api from "@/services/api";
import { getDayKey, getRelativeDayLabel, getShortDateLabel, getTimeLabel } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";

type Filter = "all" | "healthy" | "moderate" | "harmful";

type SimpleProduct = {
  id: string;
  name: string;
  brand: string;
  image?: string;
  nutriScore: NutriScore;
  date: string;
  saved_to_favorites?: boolean;
};

const nutriToFilter = (score: NutriScore): Exclude<Filter, "all"> => {
  if (score === "A" || score === "B") return "healthy";
  if (score === "C") return "moderate";
  return "harmful";
};

export default function HistoryScreen() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [favoritesInit, setFavoritesInit] = useState(false);

  const { data: products } = useQuery<SimpleProduct[]>({
    queryKey: ["products"],
    queryFn: () => api.get("/products-simple").then((res) => res.data),
  });

  if (!favoritesInit && products) {
    setFavorites(new Set(products.filter((p) => p.saved_to_favorites).map((p) => p.id)));
    setFavoritesInit(true);
  }

  const toggleFav = (id: string) =>
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const groups = useMemo(() => {
    if (!products) return [];
    const q = search.trim().toLowerCase();

    const filtered = products
      .filter((p) => {
        const matchesText =
          q.length === 0 ||
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q);
        const matchesFilter = filter === "all" || nutriToFilter(p.nutriScore) === filter;
        return matchesText && matchesFilter;
      })
      .sort((a, b) => b.date.localeCompare(a.date));

    const map = new Map<string, SimpleProduct[]>();
    for (const p of filtered) {
      const key = getDayKey(p.date);
      const list = map.get(key);
      if (list) list.push(p);
      else map.set(key, [p]);
    }
    return Array.from(map.entries()).map(([key, items]) => ({ key, items }));
  }, [products, search, filter]);

  if (!products) return null;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <SectionTitle title="Historial" subtitle={`${products.length} productos escaneados`} />
      <SearchBar
        value={search}
        onChangeText={setSearch}
        activeFilter={filter}
        onFilterChange={setFilter}
        onScanPress={() => router.push("/(tabs)/camera")}
        onGridPress={() => setViewMode((m) => (m === "list" ? "grid" : "list"))}
      />

      <View style={styles.body}>
        {groups.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Sin resultados</Text>
            <Text style={styles.emptySubtitle}>
              No encontramos productos que coincidan con tu búsqueda
            </Text>
          </View>
        ) : (
          groups.map((group) => {
            const first = group.items[0];
            return (
              <View key={group.key} style={styles.group}>
                <View style={styles.groupHeader}>
                  <Text style={styles.groupTitle}>{getRelativeDayLabel(first.date)}</Text>
                  <Text style={styles.groupDate}>{getShortDateLabel(first.date)}</Text>
                  <View style={styles.divider} />
                  <View style={styles.countBadge}>
                    <Text style={styles.countText}>{group.items.length}</Text>
                  </View>
                </View>

                {viewMode === "list" ? (
                  group.items.map((p) => (
                    <ProductCard
                      key={p.id}
                      name={p.name}
                      brand={p.brand}
                      imageUri={p.image}
                      nutriScore={p.nutriScore}
                      time={getTimeLabel(p.date)}
                      isLiked={favorites.has(p.id)}
                      onToggleFav={() => toggleFav(p.id)}
                      onPress={() => router.push(`/products/${p.id}`)}
                    />
                  ))
                ) : (
                  <View style={styles.grid}>
                    {group.items.map((p) => (
                      <ProductImageCard
                        key={p.id}
                        product={{
                          id: p.id,
                          name: p.name,
                          brand: p.brand,
                          image: p.image,
                          nutriScore: p.nutriScore,
                        }}
                        isLiked={favorites.has(p.id)}
                        onToggleFav={() => toggleFav(p.id)}
                      />
                    ))}
                  </View>
                )}
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 20,
  },
  group: {
    gap: 4,
  },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  groupTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1A2E26",
    textTransform: "capitalize",
  },
  groupDate: {
    fontSize: 11,
    fontWeight: "500",
    color: "#C5CBD3",
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#EBEBEB",
  },
  countBadge: {
    backgroundColor: "#F4F6F4",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  countText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#95A5A6",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
    gap: 6,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A2E26",
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#95A5A6",
    textAlign: "center",
  },
});
