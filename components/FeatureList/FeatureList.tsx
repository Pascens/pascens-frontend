import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FeatureItem } from '../FeatureItem/FeatureItem';
import { Colors } from '@/constants/theme';

interface Feature {
  id: string;
  title: string;
  subtitle: string;
  iconName: any;
  isEnabled: boolean;
}

interface FeatureListProps {
  features: Feature[];
}

/**
 * Feature List Component
 * card with the list of plan characteristics
 * @component
 */
export const FeatureList: React.FC<FeatureListProps> = ({ features }) => {
  return (
    <View style={styles.container}>
      {features.map((item, index) => (
        <View key={item.id}>
          <FeatureItem
            title={item.title}
            subtitle={item.subtitle}
            iconName={item.iconName}
            isEnabled={item.isEnabled}
          />
          {index < features.length - 1 && <View style={styles.separator} />}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    borderRadius: 24,
    overflow: 'hidden', 
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.gray,
    marginLeft: 70,
    marginRight: 20,
  },
});