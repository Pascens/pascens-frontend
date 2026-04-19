import { Colors } from "@/constants/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface FeatureItemProps {
  title: string;
  subtitle: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  isEnabled: boolean;
}

/**
 * Feature Item Component
 * describes characteristics of plans
 * @component
 */
export const FeatureItem: React.FC<FeatureItemProps> = ({ title, subtitle, iconName, isEnabled }) => {
  return (
    <View style={[styles.container, !isEnabled && styles.disabledOpacity]}>
      <View style={[
        styles.iconCircle, 
        { backgroundColor: isEnabled ? Colors.fadedGreen : Colors.gray }
      ]}>
        <MaterialCommunityIcons 
          name={iconName} 
          size={24} 
          color={isEnabled ? Colors.secondary : Colors.darkGray} 
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>i
      </View>
      <View style={[
        styles.statusCircle, 
        { backgroundColor: isEnabled ? Colors.fadedGreen : Colors.gray }
      ]}>
        <Ionicons 
          name={isEnabled ? "checkmark" : "close"} 
          size={16} 
          color={isEnabled ? Colors.secondary : Colors.darkGray} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  disabledOpacity: {
    opacity: 0.6,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000000",
  },
  subtitle: {
    fontSize: 14,
    color: Colors.darkGray,
    marginTop: 2,
  },
  statusCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
});