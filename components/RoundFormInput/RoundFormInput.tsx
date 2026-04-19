import { Colors } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface RoundFormInputProps {
  placeholder: string;
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  isPassword?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

export const RoundFormInput = ({ 
  placeholder, 
  iconName, 
  isPassword = false, 
  value, 
  onChangeText 
}: RoundFormInputProps) => {
  const [hidePassword, setHidePassword] = useState(isPassword);

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <MaterialCommunityIcons name={iconName} size={22} color={Colors.secondary} />
      </View>

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.darkGray}
        secureTextEntry={hidePassword}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        underlineColorAndroid="transparent"
      />

      {isPassword && (
        <TouchableOpacity 
          style={styles.eyeButton} 
          onPress={() => setHidePassword(!hidePassword)}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons 
            name={hidePassword ? "eye-outline" : "eye-off-outline"} 
            size={22} 
            color={Colors.darkGray}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 64,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.fadedGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: '400',
    borderWidth: 0,
    backgroundColor: 'transparent',
    
  },
  eyeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});