import { Colors } from "@/constants/theme";
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import { PasswordValidator } from './PasswordValidator';

const meta = {
  title: 'Components/PasswordValidator',
  component: PasswordValidator,
  decorators: [
    (Story) => (
      <View style={{ padding: 20, backgroundColor: Colors.light.background , flex: 1 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof PasswordValidator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    password: '',
  },
};

export const Partial: Story = {
  args: {
    password: 'Password1',
  },
};

export const Completed: Story = {
  args: {
    password: 'Password1!',
  },
};