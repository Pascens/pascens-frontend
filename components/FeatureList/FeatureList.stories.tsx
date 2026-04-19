import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ScrollView } from 'react-native';
import { FeatureList } from './FeatureList';
import { Colors } from '@/constants/theme';

const meta = {
  title: 'Components/FeatureList',
  component: FeatureList,
  decorators: [
    (Story) => (
      <ScrollView 
        contentContainerStyle={{ 
          padding: 20, 
          backgroundColor: Colors.light.background,
          minHeight: '100%' 
        }}
      >
        <Story />
      </ScrollView>
    ),
  ],
} satisfies Meta<typeof FeatureList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    features: [
      { 
        id: '1', 
        title: 'Escáner de código de barras', 
        subtitle: '5 escaneos por día', 
        iconName: 'barcode-scan', 
        isEnabled: true 
      },
      { 
        id: '2', 
        title: 'Semáforo básico', 
        subtitle: 'Verde / Amarillo / Rojo', 
        iconName: 'lightning-bolt-outline', 
        isEnabled: true 
      },
      { 
        id: '3', 
        title: 'Historial', 
        subtitle: 'Últimos 10 productos', 
        iconName: 'clock-outline', 
        isEnabled: true 
      },
      { 
        id: '4', 
        title: 'Escaneos ilimitados + OCR', 
        subtitle: 'Foto de etiqueta', 
        iconName: 'camera-outline', 
        isEnabled: false 
      },
      { 
        id: '5', 
        title: 'Perfil de salud personalizado', 
        subtitle: 'Niños, embarazo, condición médica', 
        iconName: 'account-group-outline', 
        isEnabled: false 
      }
    ],
  },
};