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

export const Disabled: Story = {
  args: {
    label: "Masculino",
    iconName: "male-outline",
    selected: false,
    disabled: true,
  },
};

export const DisabledSelected: Story = {
  args: {
    label: "Femenino",
    iconName: "female-outline",
    selected: true,
    disabled: true,
  },
};