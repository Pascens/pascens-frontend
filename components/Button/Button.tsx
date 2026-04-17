import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

//Button properties interfaces
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant: 'green' | 'white';
  iconName?: keyof typeof MaterialIcons.glyphMap;
}

/**
 * Button Component
 * Primary: text white background green Secondary: text green back white, with/without icon
 * * @component
 */
const Button: React.FC<ButtonProps> = ({ title, onPress, variant, iconName }) => {
  const isPrimary = variant === 'green';

  const renderContent = () => (
    <View style={styles.content}>
      {iconName && (
        <MaterialIcons 
          name={iconName} 
          size={22} 
          color={isPrimary ? "#FFFFFF" : "#2FAB88"} 
          style={styles.icon} 
        />
      )}
      <Text style={[styles.textBase, isPrimary ? styles.textWhite : styles.textGreen]}>
        {title}
      </Text>
    </View>
  );

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.wrapper}>
      {isPrimary ? (
        <LinearGradient
          colors={['#2FC767', '#2FAB88']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.buttonBase}
        >
          {renderContent()}
        </LinearGradient>
      ) : (
        
        <LinearGradient
          colors={['#2FC767', '#2FAB88']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.buttonBase, { padding: 2 }]} 
        >
          <View style={styles.btnSecondary}>
            {renderContent()}
          </View>
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
    width: '100%',
  },
  buttonBase: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10, 
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  btnSecondary: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBase: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  textWhite: {
    color: '#FFFFFF',
  },
  textGreen: {
    color: '#2FAB88',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
});

export default Button;