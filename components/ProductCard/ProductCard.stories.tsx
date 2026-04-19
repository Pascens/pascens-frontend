import type { Meta, StoryObj } from "@storybook/react";
import { StyleSheet, View } from "react-native";
import ProductCard from "./ProductCard";

const meta = {
  title: "Components/ProductCard",
  component: ProductCard,
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Leche Entera",
    brand: "Lala",
    nutriScore: "B",
    isLiked: false,
  },
};

export const LongName: Story = {
  args: {
    name: "Galletas de Chocolate con Chispas de Avena",
    brand: "Gamesa",
    nutriScore: "C",
    isLiked: true,
  },
};

export const UnknownBrand: Story = {
  args: {
    name: "Refresco de Cola",
    brand: "Marca desconocida",
    nutriScore: "D",
    isLiked: false,
  },
};

export const WithImage: Story = {
  args: {
    name: "Yogur de Fresa",
    brand: "Danone",
    nutriScore: "A",
    isLiked: true,
    imageUri: "https://picsum.photos/seed/yogur/44/44",
  },
};

const styles = StyleSheet.create({
  decorator: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F4F6F4",
  },
});
