import type { Meta, StoryObj } from '@storybook/react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/theme';
import IndicatorIcon from './IndicatorIcon';

const meta = {
  title: 'Components/IndicatorIcon',
  component: IndicatorIcon,
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof IndicatorIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    icon: 'information-circle-outline',
    backgroundColor: Colors.gray,
    iconColor: Colors.darkGray,
    onPress: () => console.log('IndicatorIcon: Info'),
  },
};

export const Ultraprocesado: Story = {
  args: {
    icon: 'flame', 
    backgroundColor: Colors.fadedRed,
    iconColor: Colors.red,
    onPress: () => console.log('IndicatorIcon: Ultraprocesado'),
  },
};

export const Aditivo: Story = {
  args: {
    icon: 'flash-outline', 
    backgroundColor: Colors.fadedOrange,
    iconColor: Colors.orange,
    onPress: () => console.log('IndicatorIcon: Aditivo'),
  },
};

export const Alergeno: Story = {
  args: {
    icon: 'warning-outline', 
    backgroundColor: Colors.fadedRed,
    iconColor: Colors.red,
    onPress: () => console.log('IndicatorIcon: Alergeno'),
  },
};

export const Antioxidante: Story = {
  args: {
    icon: 'shield-outline', 
    backgroundColor: Colors.fadedGreen, 
    iconColor: Colors.secondary,
    onPress: () => console.log('IndicatorIcon: Antioxidante'),
  },
};

export const Conservador: Story = {
  args: {
    icon: 'flask-outline', 
    backgroundColor: Colors.fadedPurple,
    iconColor: Colors.purple,
    onPress: () => console.log('IndicatorIcon: Conservador'),
  },
};

export const Natural: Story = {
  args: {
    icon: 'leaf-outline', 
    backgroundColor: Colors.fadedBlue,
    iconColor: Colors.blue,
    onPress: () => console.log('IndicatorIcon: Natural'),
  },
};

const styles = StyleSheet.create({
  decorator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});