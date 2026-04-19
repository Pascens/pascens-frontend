import { Colors } from "@/constants/theme";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface InputAllergyProps {
  onAdd: (allergy: string) => void;
}

const InputAllergy: React.FC<InputAllergyProps> = ({ onAdd }) => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const hasText = value.trim().length > 0;
  const isActive = focused || hasText;

  const handleAdd = () => {
    if (!hasText) return;
    onAdd(value.trim());
    setValue("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, isActive && styles.inputActive]}
        placeholder="ej. nueces, mariscos, soya..."
        placeholderTextColor={Colors.darkgray}
        value={value}
        onChangeText={setValue}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <TouchableOpacity
        style={[styles.button, hasText && styles.buttonActive]}
        onPress={handleAdd}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, hasText && styles.buttonTextActive]}>
          Agregar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: "#DEDEDE",
    paddingHorizontal: 18,
    fontSize: 15,
    color: Colors.light.text,
    backgroundColor: "#F6F8F6",
  },
  inputActive: {
    borderColor: Colors.secondary,
    backgroundColor: Colors.light.background,
  },
  button: {
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: "#E2F5EC",
  },
  buttonText: {
    color: "#A8D9C2",
    fontSize: 15,
    fontWeight: "600",
  },
  buttonTextActive: {
    color: Colors.primary,
  },
});

export default InputAllergy;
