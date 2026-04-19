import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Colors } from '../../constants/theme';
import { IngredientListItem } from './IngredientListItem';

const meta = {
  title: 'Components/IngredientListItem',
  component: IngredientListItem,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof IngredientListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Azucar: Story = {
  args: {
    name: 'Azúcar',
    dotColor: Colors.red, 
    indicatorTypes: ['Ultraprocesado', 'Aditivo', 'Info'],
    onPress: () => console.log('Row pressed'),
    onIndicatorPress: (type) => console.log('Indicator pressed:', type),
  },
};

export const Natural: Story = {
  args: {
    name: 'Agua',
    dotColor: Colors.primary,
    indicatorTypes: ['Natural'],
    onPress: () => console.log('Row pressed'),
  },
};