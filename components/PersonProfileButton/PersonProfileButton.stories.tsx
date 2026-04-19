import type { Meta, StoryObj } from "@storybook/react";
import PersonProfileButton from "./PersonProfileButton";

const meta: Meta<typeof PersonProfileButton> = {
  title: "Components/PersonProfileButton",
  component: PersonProfileButton,
};

export default meta;
type Story = StoryObj<typeof PersonProfileButton>;

export const Unselected: Story = {
  args: {
    label: "Masculino",
    iconName: "male-outline",
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    label: "Femenino",
    iconName: "female-outline",
    selected: true,
  },
};

export const WithSubtitle: Story = {
  args: {
    label: "Niña",
    iconName: "happy-outline",
    subtitle: "3-12 años",
    selected: false,
  },
};

export const WithSubtitleSelected: Story = {
  args: {
    label: "Adulta mayor",
    iconName: "accessibility-outline",
    subtitle: "60+ años",
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Otro",
    iconName: "ellipse-outline",
    selected: false,
    disabled: true,
  },
};
