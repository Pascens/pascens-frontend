import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { View } from 'react-native';
import {PlanSelection} from './PlanSelection';

const PlanSelectorWrapper = () => {
  const [plan, setPlan] = useState<"free" | "premium">("premium");
  return (
    <View style={{ padding: 20 }}>
      <PlanSelection activePlan={plan} onPlanChange={setPlan} />
    </View>
  );
};

const meta = {
  title: 'Components/PlanSelector',
  component: PlanSelectorWrapper,
} satisfies Meta<typeof PlanSelection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {};