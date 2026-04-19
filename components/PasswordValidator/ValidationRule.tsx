import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ValidationRuleProps {
  label: string;
  isMet: boolean;
}

export const ValidationRule: React.FC<ValidationRuleProps> = ({ label, isMet }) => {
  return (
    <View style={styles.container}>
      {/* circle */}
      <View style={[
        styles.circle, 
        { backgroundColor: isMet ? Colors.fadedGreen : "#DEDEDE" }
      ]}>
        {isMet && <Ionicons name="checkmark" size={14} color={Colors.secondary} />}
      </View>
      
      {/* text */}
      <Text style={[styles.text, isMet ? styles.textMet : styles.textUnmet]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    flex: 1,
  },
  textUnmet: {
    color: Colors.darkGray,
  },
  textMet: {
    color: Colors.light.text,
  },
});