import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Colors } from '../../constants/theme';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

/**
 * SearchBar Component
 * * @component
 */
const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Nombre de producto o marca.", 
  value, 
  onChangeText 
}) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={24} color="Colors.darkgrey" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor= "Colors.darkgrey"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.background, 
    borderWidth: 2,
    borderColor: Colors.secondary, 
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    width: '100%',
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text, 
  },
});

export default SearchBar;