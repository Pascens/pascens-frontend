import type { Meta, StoryObj } from "@storybook/react";
import { View, StyleSheet } from "react-native";
import AccordionCategory from "./AccordionCategory";

const meta = {
  title: "Components/AccordionCategory",
  component: AccordionCategory,
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    onSelectionChange: { action: "selectionChanged" },
  },
} satisfies Meta<typeof AccordionCategory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Metabólicas y hormonales",
    icon: "flash-outline",
    conditions: [
      { id: "1", label: "Hipertiroidismo" },
      { id: "2", label: "Hipotiroidismo" },
      { id: "3", label: "Diabetes tipo 2" },
    ],
  },
};

export const Cardiovascular: Story = {
  args: {
    label: "Cardiovasculares",
    icon: "heart-outline",
    conditions: [
      { id: "1", label: "Hipertensión" },
      { id: "2", label: "Dislipidemia" },
      { id: "3", label: "Insuficiencia cardíaca" },
    ],
  },
};

export const Digestivo: Story = {
  args: {
    label: "Digestivas",
    icon: "nutrition-outline",
    conditions: [
      { id: "1", label: "Enfermedad celíaca" },
      { id: "2", label: "Síndrome de intestino irritable" },
      { id: "3", label: "Colitis ulcerosa" },
      { id: "4", label: "Reflujo gastroesofágico" },
    ],
  },
};

const styles = StyleSheet.create({
  decorator: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F4F6F4",
    justifyContent: "flex-start",
  },
});
