import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { NutriScore, Risk } from "./types";

const NUTRI_COLORS: Record<NutriScore, string> = {
  A: "#038141",
  B: "#85BB2F",
  C: "#FECB02",
  D: "#EE8100",
  E: "#E63E11",
};

const RISK_COLORS: Record<Risk, string> = {
  low: "#038141",
  medium: "#EE8100",
  high: "#E63E11",
};

const RISK_LABELS: Record<Risk, string> = {
  low: "Bajo",
  medium: "Medio",
  high: "Alto",
};

export function NutriScoreBadge({ score }: { score: NutriScore }) {
  return (
    <View style={[styles.badge, { backgroundColor: NUTRI_COLORS[score] }]}>
      <Text style={styles.badgeText}>{score}</Text>
    </View>
  );
}

export function RiskBadge({ risk }: { risk: Risk }) {
  return (
    <View style={[styles.badge, { backgroundColor: RISK_COLORS[risk] }]}>
      <Text style={styles.badgeText}>{RISK_LABELS[risk]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    minWidth: 32,
    alignItems: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});
