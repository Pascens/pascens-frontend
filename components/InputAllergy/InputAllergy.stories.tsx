import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "react-native";
import InputAllergy from "./InputAllergy";

const meta: Meta<typeof InputAllergy> = {
  title: "Components/InputAllergy",
  component: InputAllergy,
};

export default meta;
type Story = StoryObj<typeof InputAllergy>;

export const Default: Story = {
  args: {
    onAdd: (allergy: string) => Alert.alert("Alergia agregada", allergy),
  },
};
