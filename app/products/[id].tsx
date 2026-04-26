import AlertasPersonalizadas from "@/components/AlertasPersonalizadas/AlertasPersonalizadas";
import { ProfileData } from "@/components/AlertasPersonalizadas/types";
import Button from "@/components/Button/Button";
import Indicator from "@/components/Indicator/Indicator";
import IndicatorIcon from "@/components/IndicatorIcon/IndicatorIcon";
import IngredientList from "@/components/IngredientList/IngredientList";
import { NutriScoreBadge } from "@/components/ProductCard/NutriScoreBadge";
import ProductHeroImage from "@/components/ProductHeroImage/ProductHeroImage";
import { INDICATOR_CONFIG, IndicatorType } from "@/constants/indicators";
import { Colors } from "@/constants/theme";
import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
type ApiIndicatorType =
  | "allergen"
  | "additive"
  | "ultra_processed"
  | "antioxidant"
  | "preservative"
  | "natural";

type ApiClassification = "unhealthy" | "moderate" | "healthy";

interface ApiProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  image_url: string;
  alert: boolean;
  score: { unhealthy: number; moderate: number; healthy: number };
  indicators: { type: ApiIndicatorType; label: string; icon: string }[];
  ingredients: {
    total_analyzed: number;
    list: {
      id: string;
      name: string;
      classification: ApiClassification;
      indicators: ApiIndicatorType[];
    }[];
    summary: { unhealthy: number; moderate: number; healthy: number };
  };
  saved_to_favorites: boolean;
}

const INDICATOR_MAP: Record<ApiIndicatorType, IndicatorType> = {
  allergen: "Alergeno",
  additive: "Aditivo",
  ultra_processed: "Ultraprocesado",
  antioxidant: "Antioxidante",
  preservative: "Conservador",
  natural: "Natural",
};

const GUIDE_LABELS: Record<IndicatorType, string> = {
  Info: "Info",
  Alergeno: "Alérgeno",
  Aditivo: "Aditivo",
  Ultraprocesado: "Ultraprocesado",
  Antioxidante: "Antioxidante",
  Conservador: "Conservador",
  Natural: "Natural",
};

const CLASSIFICATION_META: Record<ApiClassification, { title: string; color: string }> = {
  unhealthy: { title: "Poco saludable", color: Colors.red },
  moderate: { title: "Moderado", color: Colors.orange },
  healthy: { title: "Saludable", color: Colors.secondary },
};

const buildCategories = (product: ApiProduct) => {
  const order: ApiClassification[] = ["unhealthy", "moderate", "healthy"];
  return order
    .map((key) => {
      const ingredients = product.ingredients.list
        .filter((ing) => ing.classification === key)
        .map((ing) => ({
          id: ing.id,
          name: ing.name,
          indicators: [...ing.indicators.map((t) => INDICATOR_MAP[t]), "Info" as IndicatorType],
        }));
      return {
        title: CLASSIFICATION_META[key].title,
        color: CLASSIFICATION_META[key].color,
        ingredients,
      };
    })
    .filter((cat) => cat.ingredients.length > 0);
};

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery<ApiProduct>({
    queryKey: ["products", id],
    queryFn: () => api.get(`/products/${id}`).then((res) => res.data),
  });

  const { data: profiles } = useQuery<ProfileData[]>({
    queryKey: ["profiles"],
    queryFn: () => api.get("/profiles").then((res) => res.data),
  });

  const { top, bottom } = useSafeAreaInsets();
  const [liked, setLiked] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (data) setLiked(data.saved_to_favorites);
  }, [data]);

  const handleLike = () => {
    setLiked((prev) => {
      const next = !prev;
      Haptics.impactAsync(
        next ? Haptics.ImpactFeedbackStyle.Medium : Haptics.ImpactFeedbackStyle.Light,
      );
      return next;
    });
  };

  if (isLoading) {
    return (
      <View style={[styles.root, styles.center]}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text>Cargando…</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={[styles.root, styles.center]}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text>No se pudo cargar el producto</Text>
      </View>
    );
  }

  const product = data;
  const categories = buildCategories(product);
  const guideIndicators = (product.indicators ?? [])
    .map((i) => INDICATOR_MAP[i.type])
    .filter((t): t is IndicatorType => Boolean(t));

  return (
    <SafeAreaView style={styles.root} edges={["left", "right"]}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scroll}
      >
        <View style={[styles.headerBar, { paddingTop: top + 8 }]}>
          <IndicatorIcon icon="arrow-back" onPress={() => router.back()} />
          <Text style={styles.headerTitle}>Detalle del producto</Text>
          <IndicatorIcon icon="share-social-outline" onPress={() => {}} />
        </View>

        <View style={[styles.card, styles.cardFirst]}>
          <ProductHeroImage imageUrl={product.image_url}>
            <View style={styles.favFloat}>
              <IndicatorIcon
                icon={liked ? "heart" : "heart-outline"}
                onPress={handleLike}
                backgroundColor="rgba(255,255,255,0.9)"
                iconColor={liked ? Colors.red : Colors.darkGray}
              />
            </View>
            {product.alert && (
              <View style={styles.alertFloat}>
                <NutriScoreBadge score="E" size={44} />
              </View>
            )}
            <View style={styles.nameOverlay}>
              <Text style={styles.brand}>
                {product.brand.toUpperCase()} · {product.category.toUpperCase()}
              </Text>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.codeTiny}>{product.id}</Text>
            </View>
          </ProductHeroImage>

          <View style={styles.scoreRow}>
            <ScoreColumn
              value={product.score.unhealthy}
              label="Poco saludable"
              color={Colors.red}
            />
            <View style={styles.vDivider} />
            <ScoreColumn value={product.score.moderate} label="Moderado" color={Colors.orange} />
            <View style={styles.vDivider} />
            <ScoreColumn value={product.score.healthy} label="Saludable" color={Colors.secondary} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Guía de indicadores</Text>
          <Text style={styles.sectionSubtitle}>Qué significa cada símbolo en la lista</Text>
          <View style={styles.indicatorGrid}>
            {guideIndicators.map((type) => {
              const cfg = INDICATOR_CONFIG[type];
              return (
                <Indicator
                  key={type}
                  label={GUIDE_LABELS[type]}
                  icon={cfg.icon}
                  color={cfg.iconColor}
                  size="sm"
                />
              );
            })}
          </View>
        </View>

        <View style={[styles.card, styles.cardLast]}>
          <IngredientList
            headerTitle="Ingredientes"
            headerSubtitle={`${product.ingredients.total_analyzed} ingredientes analizados`}
            categories={categories}
          />
        </View>

        <AlertasPersonalizadas
          profiles={profiles ?? []}
          onSelectorExpand={() =>
            requestAnimationFrame(() => scrollViewRef.current?.scrollToEnd({ animated: true }))
          }
        />
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: bottom }]}>
        <Button
          title={liked ? "Guardado en favoritos" : "Guardar en favoritos"}
          variant={liked ? "white" : "green"}
          iconName={liked ? "favorite" : "favorite-border"}
          onPress={handleLike}
        />
      </View>
    </SafeAreaView>
  );
}

const ScoreColumn = ({ value, label, color }: { value: number; label: string; color: string }) => (
  <View style={styles.scoreCol}>
    <Text style={[styles.scoreValue, { color }]}>{value}</Text>
    <Text style={styles.scoreLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.gray,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
  },
  card: {
    backgroundColor: "#fff",
    marginTop: 8,
    paddingVertical: 16,
  },
  cardLast: {
    flex: 1,
  },
  cardFirst: {
    marginTop: 0,
    paddingTop: 0,
  },
  favFloat: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  alertFloat: {
    position: "absolute",
    right: 12,
    bottom: 20,
  },
  alertBang: {
    position: "absolute",
  },
  nameOverlay: {
    position: "absolute",
    left: 16,
    bottom: 12,
  },
  brand: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  productName: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 2,
  },
  codeTiny: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 10,
    marginTop: 2,
  },
  scoreRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scoreCol: {
    flex: 1,
    alignItems: "center",
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: "800",
  },
  scoreLabel: {
    fontSize: 12,
    color: Colors.darkGray,
    marginTop: 2,
  },
  vDivider: {
    width: 1,
    backgroundColor: Colors.gray,
    marginVertical: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.light.text,
    paddingHorizontal: 16,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: Colors.darkGray,
    paddingHorizontal: 16,
    marginTop: 2,
    marginBottom: 12,
  },
  indicatorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingHorizontal: 16,
  },
  footer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
});
