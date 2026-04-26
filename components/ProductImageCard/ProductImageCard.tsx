import { NutriScore, NutriScoreBadge } from "@/components/ProductCard/NutriScoreBadge";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export interface Product {
  id: string;
  image?: string;
  name: string;
  brand: string;
  nutriScore: NutriScore;
  alerts?: string[];
}

interface Props {
  product: Product;
  showExtra?: "alerts";
  isLiked?: boolean;
  onToggleFav?: () => void;
  onPress?: () => void;
}

const ProductImageCard = ({ product, showExtra, isLiked = false, onToggleFav, onPress }: Props) => {
  const [liked, setLiked] = useState(isLiked);

  const handleCardPress = (id: string): void => {
    router.push(`/products/${id}`);
  };

  return (
    <Pressable
      onPress={() => handleCardPress(product.id)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.imageContainer}>
        {product.image ? (
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.fallback}>
            <MaterialIcons name="fastfood" size={32} color="#95A5A6" />
          </View>
        )}

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.10)", "rgba(0,0,0,0.65)"]}
          locations={[0, 0.35, 1]}
          style={StyleSheet.absoluteFillObject}
        />

        <View style={styles.nutriBadge}>
          <NutriScoreBadge score={product.nutriScore} />
        </View>

        <Pressable
          onPress={() => {
            setLiked((prev) => !prev);
            onToggleFav?.();
          }}
          hitSlop={6}
          style={styles.favButton}
        >
          <MaterialIcons
            name={liked ? "favorite" : "favorite-border"}
            size={14}
            color={liked ? "#E74C3C" : "#95A5A6"}
          />
        </Pressable>

        {showExtra === "alerts" && !!product.alerts?.length && (
          <View style={styles.alertsBadge}>
            <MaterialIcons name="error" size={12} color="#fff" />
            <Text style={styles.alertsCount}>{product.alerts.length}</Text>
          </View>
        )}

        <View style={styles.nameOverlay}>
          <Text style={styles.productName} numberOfLines={1}>
            {product.name}
          </Text>
          <Text style={styles.productBrand} numberOfLines={1}>
            {product.brand}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductImageCard;

const styles = StyleSheet.create({
  card: {
    width: 160,
    borderRadius: 16,
    overflow: "hidden",
    marginHorizontal: 6,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
  imageContainer: {
    height: 120,
    backgroundColor: "#F4F6F4",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  fallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  nutriBadge: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  favButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  alertsBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#E74C3C",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 999,
  },
  alertsCount: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
  },
  nameOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  productName: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 17,
  },
  productBrand: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
  },
});
