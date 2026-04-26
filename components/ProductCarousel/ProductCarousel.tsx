import ProductImageCard, { Product } from "@/components/ProductImageCard/ProductImageCard";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface Props {
  title?: string;
  products: Product[];
  favIds?: string[];
  showExtra?: "alerts";
  onToggleFav?: (productId: string) => void;
  onPressProduct?: (productId: string) => void;
}

const ProductCarousel = ({
  title,
  products,
  favIds = [],
  showExtra,
  onToggleFav,
  onPressProduct,
}: Props) => (
  <View style={styles.container}>
    {title && <Text style={styles.title}>{title}</Text>}
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    >
      {products.map((item) => (
        <ProductImageCard
          key={item.id}
          product={item}
          showExtra={showExtra}
          isLiked={favIds.includes(item.id)}
          onToggleFav={() => onToggleFav?.(item.id)}
          onPress={() => onPressProduct?.(item.id)}
        />
      ))}
    </ScrollView>
  </View>
);

export default ProductCarousel;

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3436",
    paddingHorizontal: 16,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
