import { Colors } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface OnboardingInfoProps {
  title: string;
  description: string;
  iconName: MaterialIconName; 
  color: string;
  backgroundColor: string;
}
export const OnboardingInfo = ({ 
  title, 
  description, 
  iconName, 
  color, 
  backgroundColor 
}: OnboardingInfoProps) => {
  return (
    <View style={styles.card}>
      <View style={[styles.iconBadge, { backgroundColor }]}>
        <MaterialCommunityIcons name={iconName as any} size={24} color={color} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={[styles.dot, { backgroundColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginVertical: 8,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: Colors.darkGray,
    lineHeight: 18,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 12,
  },
});