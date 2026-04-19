import { Colors } from '@/constants/theme';
import React from 'react';
import { View } from 'react-native';
import { OnboardingInfo } from './OnboardingInfo';

export default {
  title: 'Components/OnboardingInfo',
  component: OnboardingInfo,
  decorators: [
    (Story: any) => (
      <View style={{ padding: 20, backgroundColor: Colors.light.background, flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

export const Default = {
  args: {
    title: 'Escanea productos fácilmente',
    description: 'Lee códigos de barras al instante',
    iconName: 'barcode-scan',
    color: Colors.secondary,
    backgroundColor: Colors.fadedGreen,
  },
};

export const Alerts = {
  args: {
    title: 'Alertas personalizadas',
    description: 'Según tu salud y condiciones',
    iconName: 'shield-check-outline',
    color: Colors.orange,
    backgroundColor: Colors.fadedOrange,
  },
};

export const Family = {
  args: {
    title: 'Perfiles para toda la familia',
    description: 'Cuida a cada integrante',
    iconName: 'account-group-outline',
    color: Colors.blue,
    backgroundColor: Colors.fadedBlue,
  },
};