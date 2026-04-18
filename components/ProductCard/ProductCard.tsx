import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { NutriScore, NutriScoreBadge } from "./NutriScoreBadge";

interface Props {
  name: string;
  imageUri?: string;
  brand: string;
  nutriScore: NutriScore;
  isLiked?: boolean;
}

const ProductCard = ({ name, imageUri, brand, nutriScore, isLiked = false }: Props) => {
  const [liked, setLiked] = useState(isLiked);

  return (
    <Pressable
      style={({ pressed }) => [styles.resultCard, pressed && { backgroundColor: "#F8F9FA" }]}
    >
      <View style={styles.productIcon}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.productImage} />
        ) : (
          <MaterialIcons name="fastfood" size={22} color="#95A5A6" />
        )}
      </View>
      <View style={styles.resultInfo}>
        <Text style={styles.resultName}>{name}</Text>
        <Text style={styles.resultSubtitle}>{brand}</Text>
      </View>
      <NutriScoreBadge score={nutriScore} />
      <Pressable onPress={() => setLiked((prev) => !prev)} hitSlop={8}>
        <MaterialIcons
          name={liked ? "favorite" : "favorite-border"}
          size={22}
          color={liked ? "#E74C3C" : "#95A5A6"}
        />
      </Pressable>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
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
  resultInfo: {
    flex: 1,
    gap: 2,
  },
  productImage: {
    width: 44,
    height: 44,
    borderRadius: 12,
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
});
