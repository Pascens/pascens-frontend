import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { InfoBanner } from "./BannerDidYouKnow";

const meta = {
  title: "Example/InfoBanner",
  component: InfoBanner,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof InfoBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Alerta: Story = {
  args: {
    type: "warning",
    title: "Jarabe de maíz de alta fructosa",
    description: "Presente en más del 73% de los cereales para niños.",
    note: "Evítalo si aparece entre los primeros 3 ingredientes.",
    image: require("./download.jpg"),
  },
};

export const Info: Story = {
  args: {
    type: "promo",
    title: "Azúcar añadida",
    description: "Puede aparecer bajo más de 50 nombres distintos.",
    image: require("./download.jpg"),
  },
};
