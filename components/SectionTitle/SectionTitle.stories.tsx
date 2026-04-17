import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet } from 'react-native';
import SectionTitle from './SectionTitle';

const meta = {
  title: 'Components/SectionTitle',
  component: SectionTitle,
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof SectionTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Historial',
    subtitle: '42 productos escaneados',
  },
};

export const WithPreTitle: Story = {
  args: {
    preTitle: 'Bienvenido',
    title: 'Historial',
    subtitle: '42 productos escaneados',
  },
};

export const ShortSubtitle: Story = {
  args: {
    title: 'Mis Favoritos',
    subtitle: '5 productos guardados',
  },
};

export const WithPreTitleAndLongText: Story = {
  args: {
    preTitle: 'Resumen del mes',
    title: 'Productos Escaneados',
    subtitle: '128 productos registrados este mes',
  },
};

const styles = StyleSheet.create({
  decorator: {
    flex: 1,
    backgroundColor: '#F4F6F4',
  },
});
