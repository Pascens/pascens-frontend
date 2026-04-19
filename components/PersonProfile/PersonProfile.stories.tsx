import type { Meta, StoryObj } from "@storybook/react";
import PersonProfile from "./PersonProfile";

const meta: Meta<typeof PersonProfile> = {
  title: "Components/PersonProfile",
  component: PersonProfile,
};

export default meta;
type Story = StoryObj<typeof PersonProfile>;

export const WithCurrentUser: Story = {
  args: {
    imageUrl: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/e40b6ea6361a1abe28f32e7910f63b66/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
    name: "Arturo García",
    isCurrentUser: true,
    stage: ["Adulto"],
    conditions: ["Diabetes tipo 2", "Hipotiroidismo", "Hipertensión"],
    lastScaned: "hace 1 día",
  },
};

export const WithoutCurrentUser: Story = {
  args: {
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Sofía",
    isCurrentUser: false,
    stage: ["Adulta"],
    conditions: ["Diabetes tipo 2"],
    lastScaned: "hace 3 días",
  },
};

export const Child: Story = {
  args: {
    imageUrl: "https://randomuser.me/api/portraits/girls/10.jpg",
    name: "Emma",
    isCurrentUser: false,
    stage: ["Niña"],
    lastScaned: "hace 5 días",
  },
};

export const Elder: Story = {
  args: {
    imageUrl: "https://randomuser.me/api/portraits/women/70.jpg",
    name: "Abuela Rosa",
    isCurrentUser: false,
    stage: ["Adulta mayor"],
    conditions: ["Hipotiroidismo"],
    lastScaned: "hace 7 días",
  },
};
