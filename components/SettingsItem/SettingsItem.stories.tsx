import type { Meta, StoryObj } from "@storybook/react";
import SettingsItem from "./SettingsItem";

const meta: Meta<typeof SettingsItem> = {
  title: "Components/SettingsItem",
  component: SettingsItem,
};

export default meta;
type Story = StoryObj<typeof SettingsItem>;

export const Password: Story = {
  args: {
    label: "Contraseña",
    iconName: "lock-closed-outline",
  },
};

export const Help: Story = {
  args: {
    label: "Ayuda y Soporte",
    iconName: "help-circle-outline",
  },
};

export const Terms: Story = {
  args: {
    label: "Términos y condiciones",
    iconName: "document-text-outline",
  },
};
