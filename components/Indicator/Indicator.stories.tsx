import type { Meta, StoryObj } from "@storybook/react-native";

import { Indicator } from "./Indicator";

const meta = {
  title: "Components/Indicator",
  component: Indicator,
} satisfies Meta<typeof Indicator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Ultraprocesado: Story = {
  args: {
    label: "Ultraprocesado",
    icon: "flame",
    color: "#B35243",
  },
};

export const Aditivo: Story = {
  args: {
    label: "Aditivo",
    icon: "flash-outline",
    color: "#E67E22",
  },
};

export const Alérgeno: Story = {
  args: {
    label: "Alérgeno",
    icon: "warning-outline",
    color: "#E74C3C",
  },
};

export const Antioxidante: Story = {
  args: {
    label: "Antioxidante",
    icon: "shield-outline",
    color: "#2FAB88",
  },
};

export const Conservador: Story = {
  args: {
    label: "Conservador",
    icon: "flask-outline",
    color: "#8E44AD",
  },
};

export const Natural: Story = {
  args: {
    label: "Natural",
    icon: "leaf-outline",
    color: "#2980B9",
  },
};
