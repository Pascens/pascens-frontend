import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PlanSelectionProps {
  activePlan: "free" | "premium";
  onPlanChange: (plan: "free" | "premium") => void;
}

export const PlanSelection: React.FC<PlanSelectionProps> = ({ activePlan, onPlanChange }) => {
  return (
/**
 * PlanSelection Button Component
 * * @component
 */
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => onPlanChange("free")}
        activeOpacity={0.8}
      >
        {activePlan === "free" ? (
          <View style={styles.activeTabGray}>
            <Text style={styles.activeTextGray}>Gratuito</Text>
          </View>
        ) : (
          <Text style={styles.inactiveText}>Gratuito</Text>
        )}
      </TouchableOpacity>

      {/* Premium  button*/}
      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => onPlanChange("premium")}
        activeOpacity={0.8}
      >
        {activePlan === "premium" ? (
          <LinearGradient
            colors={[Colors.secondary, Colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.activeTabGradient}
          >
            <MaterialCommunityIcons name="crown-outline" size={20} color="#FFD700" style={styles.icon} />
            <Text style={styles.activeTextWhite}>Premium</Text>
          </LinearGradient>
        ) : (
          <View style={styles.inactiveContent}>
             <MaterialCommunityIcons name="crown-outline" size={20} color={Colors.darkGray} style={styles.icon} />
             <Text style={styles.inactiveText}>Premium</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 4,
    width: "100%",
    height: 60,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  activeTabGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 22,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  activeTabGray: {
    width: "100%",
    height: "100%",
    borderRadius: 22,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center"
  },
  inactiveContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  activeTextWhite: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  activeTextGray: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  inactiveText: {
    color: Colors.darkGray,
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    marginRight: 6,
  },
});