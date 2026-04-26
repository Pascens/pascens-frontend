import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { INDICATOR_CONFIG, IndicatorType } from '../../constants/indicators';
import { Colors } from '../../constants/theme';
import IndicatorIcon from '../IndicatorIcon/IndicatorIcon';
import IndicatorInfoSheet from '../IndicatorInfoSheet/IndicatorInfoSheet';

interface IngredientListItemProps {
  name: string;
  dotColor: string;
  indicatorTypes?: IndicatorType[];
  onPress?: () => void;
  onIndicatorPress?: (type: IndicatorType) => void;
}

export const IngredientListItem: React.FC<IngredientListItemProps> = ({
    /**
 * IngredientListItem Component
 * This component represents a simplified analysis of an ingredient, showing its impact level via a colored dot and related status indicators.
 * * @component
 */
  name,
  dotColor,
  indicatorTypes = [],
  onPress,
  onIndicatorPress,
}) => {
  const [openType, setOpenType] = useState<IndicatorType | null>(null);

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={onPress ? 0.7 : 1}
      >
        <View style={styles.leftSection}>
          <View style={[styles.dot, { backgroundColor: dotColor }]} />
          <Text style={styles.name}>
            {name}
          </Text>
        </View>

        <View style={styles.rightSection}>
          {indicatorTypes.map((type) => {
            const config = INDICATOR_CONFIG[type];
            if (!config) return null;
            return (
              <IndicatorIcon
                key={type}
                icon={config.icon}
                backgroundColor={config.backgroundColor}
                iconColor={config.iconColor}
                onPress={() => {
                  setOpenType(type);
                  onIndicatorPress?.(type);
                }}
                style={styles.indicatorGap}
              />
            );
          })}
        </View>
      </TouchableOpacity>

      <IndicatorInfoSheet type={openType} onClose={() => setOpenType(null)} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 52,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  name: {
    fontSize: 17,
    color: Colors.light.text,
    fontWeight: '400',
    flexShrink: 1, 
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    maxWidth: '45%',
    gap: 8,
  },
  indicatorGap: {
    marginLeft: 4, 
    marginBottom: 2,
  },
});

export default IngredientListItem;