import type { Meta, StoryObj } from "@storybook/react";
import SummaryProfile from "./SummaryProfile";

const meta: Meta<typeof SummaryProfile> = {
  title: "Components/SummaryProfile",
  component: SummaryProfile,
};

export default meta;
type Story = StoryObj<typeof SummaryProfile>;

export const Default: Story = {
  args: {
    scans: 127,
    healthy: 45,
    intermediate: 28,
    harmful: 12,
  },
};
