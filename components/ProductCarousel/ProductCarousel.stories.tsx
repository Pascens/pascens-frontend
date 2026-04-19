import type { Meta, StoryObj } from "@storybook/react";
import { StyleSheet, View } from "react-native";
import ProductCarousel from "./ProductCarousel";
import { Product } from "@/components/ProductImageCard/ProductImageCard";

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Yogur de Fresa",
    brand: "Danone",
    nutriScore: "A",
    image: "https://picsum.photos/seed/yogurt/160/120",
    alerts: ["Alto en azúcar"],
  },
  {
    id: "2",
    name: "Leche Entera",
    brand: "Lala",
    nutriScore: "B",
    image: "https://picsum.photos/seed/milk/160/120",
  },
  {
    id: "3",
    name: "Galletas de Chocolate con Chispas de Avena",
    brand: "Gamesa",
    nutriScore: "C",
    image: "https://picsum.photos/seed/cookies/160/120",
    alerts: ["Alto en grasas", "Azúcar"],
  },
  {
    id: "4",
    name: "Refresco de Cola",
    brand: "Coca-Cola",
    nutriScore: "E",
    image: "https://picsum.photos/seed/cola/160/120",
    alerts: ["Alto en azúcar", "Cafeína", "Colorantes"],
  },
  {
    id: "5",
    name: "Avena Natural",
    brand: "Quaker",
    nutriScore: "A",
    image: "https://picsum.photos/seed/oats/160/120",
  },
];

const meta = {
  title: "Components/ProductCarousel",
  component: ProductCarousel,
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    onToggleFav: { action: "toggleFav" },
    onPressProduct: { action: "productPressed" },
  },
} satisfies Meta<typeof ProductCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Productos recomendados",
    products: PRODUCTS,
    favIds: [],
  },
};

export const WithFavorites: Story = {
  args: {
    title: "Tus favoritos",
    products: PRODUCTS,
    favIds: ["1", "5"],
  },
};

export const WithAlerts: Story = {
  args: {
    title: "Productos con alertas",
    products: PRODUCTS,
    favIds: ["1"],
    showExtra: "alerts",
  },
};

export const NoTitle: Story = {
  args: {
    products: PRODUCTS,
    favIds: [],
  },
};

const styles = StyleSheet.create({
  decorator: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: "#F4F6F4",
  },
});
