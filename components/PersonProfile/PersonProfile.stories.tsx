    import type { Meta, StoryObj } from "@storybook/react";
import PersonProfile from "./PersonProfile";

const meta: Meta<typeof PersonProfile> = {
  title: "Components/PersonProfile",
  component: PersonProfile,
};

export default meta;
type Story = StoryObj<typeof PersonProfile>;

export const Complete: Story = {
  args: {
    imageUrl: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/e40b6ea6361a1abe28f32e7910f63b66/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
    name: "Arturo García",
    role: "Tú",
    stage: ["Adulto"],
    conditions: ["Diabetes tipo 2", "Hipotiroidismo / Hipertiroidismo"],
    lastScaned: "hace 1 día",
  },
};

export const Minimal: Story = {
  args: {
    name: "María López",
  },
};