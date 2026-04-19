import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '../../constants/theme';


type IoniconName = ComponentProps<typeof Ionicons>["name"];


interface IndicatorIconProps {
  onPress?: () => void; 
  icon: IoniconName;
  backgroundColor?: string;
  iconColor?: string;
  style?: ViewStyle;
}

const IndicatorIcon: React.FC<IndicatorIconProps> = ({
  /**
 * IndicatorIcon Component
 * Only info is an interactive component
 * * @component
 */
  onPress,
  icon,
  backgroundColor = Colors.gray,
  iconColor = Colors.light.text, 
  style,
}) => {
  return (
    <TouchableOpacity 
      style={[styles.circle, { backgroundColor }, style]} 
      onPress={onPress}
      disabled={!onPress} 
      activeOpacity={onPress ? 0.7 : 1}
    >
    <Ionicons name={icon} size={22} color={iconColor} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    textAlign: 'center',
  }
});

export default IndicatorIcon;