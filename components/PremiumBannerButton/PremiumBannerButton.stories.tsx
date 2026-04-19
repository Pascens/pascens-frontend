import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { PremiumBannerButton } from './PremiumBannerButton';

const meta = {
  title: 'Components/PremiumBannerButton',
  component: PremiumBannerButton,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof PremiumBannerButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Plan Premium',
    subtitle: 'Actualmente en plan Gratuito',
    onPress: () => {
      if (typeof console !== 'undefined') {
        console.log('Premium pressed');
      }
    },
  },
};