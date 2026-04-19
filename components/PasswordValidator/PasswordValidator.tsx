import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ValidationRule } from "./ValidationRule";

interface PasswordValidatorProps {
  password: string;
}

export const PasswordValidator: React.FC<PasswordValidatorProps> = ({ password }) => {
  const rules = [
    { label: "Mínimo 8 caracteres", met: password.length >= 8 },
    { label: "Al menos una letra mayúscula", met: /[A-Z]/.test(password) },
    { label: "Al menos un número", met: /\d/.test(password) },
    { label: "Al menos un carácter especial (!S@%)", met: /[!@#$%^&*]/.test(password) },
  ];

  return (
    <View style={styles.box}>
      <View style={styles.header}>
    
        <View style={[styles.infoCircle, { backgroundColor: Colors.fadedBlue }]}>
          <Ionicons name="information-outline" size={18} color={Colors.blue} />
        </View>
        <Text style={styles.title}>Recomendaciones</Text>
      </View>

      {rules.map((rule, index) => (
        <ValidationRule 
          key={index} 
          label={rule.label} 
          isMet={rule.met} 
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#F6F8F6", 
    borderRadius: 24,
    padding: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "#DEDEDE",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  infoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.text,
  },
});