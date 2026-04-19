import { Colors } from '@/constants/theme';
import React, { useState } from 'react';
import { View } from 'react-native';
import { RoundFormInput } from './RoundFormInput';

export default {
  title: 'Components/RoundFormInput',
  component: RoundFormInput,
  decorators: [
    (Story: any) => (
      <View style={{ padding: 20, backgroundColor: Colors.light.background, flex: 1, justifyContent: 'center' }}>
        <Story />
      </View>
    ),
  ],
};


const InteractiveInput = (args: any) => {
  const [value, setValue] = useState('');
  return <RoundFormInput {...args} value={value} onChangeText={setValue} />;
};

export const NameInput = {
  render: (args: any) => <InteractiveInput {...args} />,
  args: {
    placeholder: 'Tu nombre',
    iconName: 'account-outline',
    isPassword: false,
  },
};

export const EmailInput = {
  render: (args: any) => <InteractiveInput {...args} />,
  args: {
    placeholder: 'Correo electrónico',
    iconName: 'email-outline',
    isPassword: false,
  },
};

export const PasswordInput = {
  render: (args: any) => <InteractiveInput {...args} />,
  args: {
    placeholder: 'Confirmar contraseña',
    iconName: 'lock-outline',
    isPassword: true,
  },
};