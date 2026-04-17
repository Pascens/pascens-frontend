import type { Meta, StoryObj } from '@storybook/react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/theme';
import SearchBar from './SearchBar';

const meta = {
  title: 'Components/SearchBar',
  component: SearchBar,
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Nombre de producto o marca',
    value: '',
    onChangeText: (text) => console.log('Buscando:', text),
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Nombre de producto o marca',
    value: 'Zucaritas',
    onChangeText: (text) => console.log('Editando:', text),
  },
};

const styles = StyleSheet.create({
  decorator: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.gray,
  },
});