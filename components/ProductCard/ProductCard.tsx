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
  time?: string;
  onPress?: () => void;
  onToggleFav?: () => void;
}

const ProductCard = ({
  name,
  imageUri,
  brand,
  nutriScore,
  isLiked = false,
  time,
  onPress,
  onToggleFav,
}: Props) => {
  const [internalLiked, setInternalLiked] = useState(isLiked);
  const liked = onToggleFav ? isLiked : internalLiked;

  const handleFavPress = () => {
    if (onToggleFav) {
      onToggleFav();
    } else {
      setInternalLiked((prev) => !prev);
    }
  };

  return (
    <Pressable
      onPress={onPress}
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
        {time && (
          <View style={styles.timeRow}>
            <MaterialIcons name="schedule" size={12} color="#C5CBD3" />
            <Text style={styles.timeText}>{time}</Text>
          </View>
        )}
      </View>
      <NutriScoreBadge score={nutriScore} />
      <Pressable onPress={handleFavPress} hitSlop={8} style={styles.favButton}>
        <MaterialIcons
          name={liked ? "favorite" : "favorite-border"}
          size={18}
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
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 2,
  },
  timeText: {
    fontSize: 11,
    color: "#C5CBD3",
  },
  favButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },
});
