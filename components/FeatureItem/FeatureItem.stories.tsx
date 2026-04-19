import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import { FeatureItem } from './FeatureItem';

const meta = {
  title: 'Components/FeatureItem',
  component: FeatureItem,
  decorators: [
    (Story) => (
      <View style={{ padding: 20, backgroundColor: 'Colors.red', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof FeatureItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Enabled: Story = {
  args: {
    title: 'Escáner de código de barras',
    subtitle: '5 escaneos por día',
    iconName: 'barcode-scan',
    isEnabled: true,
  },
};

export const Disabled: Story = {
  args: {
    title: 'Escaneos ilimitados + OCR',
    subtitle: 'Foto de etiqueta',
    iconName: 'camera-outline',
    isEnabled: false,
  },
};