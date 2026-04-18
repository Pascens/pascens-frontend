import type { Meta, StoryObj } from "@storybook/react";
import { View, StyleSheet } from "react-native";
import ConditionChip from "./ConditionChip";

const meta = {
  title: "Components/ConditionChip",
  component: ConditionChip,
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    onPress: { action: "pressed" },
  },
} satisfies Meta<typeof ConditionChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = {
  args: {
    label: "Enfermedad celíaca / sensibilidad al gluten",
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    label: "Enfermedad celíaca / sensibilidad al gluten",
    selected: true,
  },
};

const styles = StyleSheet.create({
  decorator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#F4F6F4",
  },
});
