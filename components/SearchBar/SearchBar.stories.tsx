import type { Meta, StoryObj } from "@storybook/react";
import { StyleSheet, View } from "react-native";
import SearchBar from "./SearchBar";

const meta = {
  title: "Components/SearchBar",
  component: SearchBar,
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    onScanPress: { action: "scan pressed" },
    onGridPress: { action: "grid pressed" },
    onFilterChange: { action: "filter changed" },
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    onChangeText: () => {},
  },
};

export const WithText: Story = {
  args: {
    value: "Leche",
    onChangeText: () => {},
  },
};

export const FilterHealthy: Story = {
  args: {
    value: "",
    onChangeText: () => {},
    activeFilter: "healthy",
  },
};

export const FilterModerate: Story = {
  args: {
    value: "",
    onChangeText: () => {},
    activeFilter: "moderate",
  },
};

export const FilterHarmful: Story = {
  args: {
    value: "",
    onChangeText: () => {},
    activeFilter: "harmful",
  },
};

const styles = StyleSheet.create({
  decorator: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
});
