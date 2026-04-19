import type { Meta, StoryObj } from "@storybook/react";
import { StyleSheet, View } from "react-native";
import ProductImageCard from "./ProductImageCard";

const base = {
  id: "1",
  name: "Yogur de Fresa",
  brand: "Danone",
  nutriScore: "A" as const,
  image: "https://picsum.photos/seed/yogurt/160/120",
  alerts: ["Alto en azúcar", "Aditivos"],
};

const meta = {
  title: "Components/ProductImageCard",
  component: ProductImageCard,
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    onToggleFav: { action: "toggleFav" },
    onPress: { action: "pressed" },
  },
} satisfies Meta<typeof ProductImageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: base,
    isLiked: false,
    onToggleFav: () => {},
  },
};

export const Favorited: Story = {
  args: {
    product: base,
    isLiked: true,
    onToggleFav: () => {},
  },
};

export const WithAlerts: Story = {
  args: {
    product: base,
    showExtra: "alerts",
    isLiked: false,
    onToggleFav: () => {},
  },
};

export const HarmfulScore: Story = {
  args: {
    product: {
      id: "2",
      name: "Refresco de Cola",
      brand: "Coca-Cola",
      nutriScore: "E" as const,
      image: "https://picsum.photos/seed/cola/160/120",
      alerts: ["Alto en azúcar", "Cafeína", "Colorantes"],
    },
    showExtra: "alerts",
    isLiked: false,
    onToggleFav: () => {},
  },
};

export const ModerateScore: Story = {
  args: {
    product: {
      id: "3",
      name: "Galletas de Avena",
      brand: "Gamesa",
      nutriScore: "C" as const,
      image: "https://picsum.photos/seed/cookies/160/120",
    },
    isLiked: false,
    onToggleFav: () => {},
  },
};

export const NoImage: Story = {
  args: {
    product: { ...base, image: undefined },
    isLiked: false,
    onToggleFav: () => {},
  },
};

const styles = StyleSheet.create({
  decorator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#F4F6F4",
  },
});
