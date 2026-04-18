import type { Meta, StoryObj } from "@storybook/react";
import AddProfile from "./AddProfile";

const meta: Meta<typeof AddProfile> = {
  title: "Components/AddProfile",
  component: AddProfile,
};

export default meta;
type Story = StoryObj<typeof AddProfile>;

export const Default: Story = {
  args: {},
};
