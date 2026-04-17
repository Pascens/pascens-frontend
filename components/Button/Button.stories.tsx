import type { Meta, StoryObj } from '@storybook/react';
import { StyleSheet, View } from 'react-native';
import Button from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  // Esto vincula el evento a la pestaña "Actions" de Storybook
  argTypes: {
    onPress: { action: 'pressed' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'green',
    title: 'Crear cuenta',
    onPress: () => {}, // ✅ Ahora TypeScript sabe que el botón tiene su acción obligatoria
  },
};

export const Secondary: Story = {
  args: {
    variant: 'white',
    title: 'Ya tengo cuenta',
    onPress: () => {}, // ✅ Agregado
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'green',
    title: 'Tomar Foto',
    iconName: 'photo-camera',
    onPress: () => {}, // ✅ Agregado
  },
};

const styles = StyleSheet.create({
  decorator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
});