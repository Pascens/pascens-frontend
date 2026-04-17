import { Colors } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface SectionTitleProps {
  title: string;
  subtitle: string;
  preTitle?: string;
}

const SectionTitle: FC<SectionTitleProps> = ({ title, subtitle, preTitle }) => {
  return (
    <LinearGradient
      colors={[Colors.secondary, Colors.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.7, y: 1 }}
      style={styles.container}
    >
      {/* Decorative circles */}
      <View style={styles.circleTopRight} />
      <View style={styles.circleBottomLeft} />

      <View style={styles.content}>
        {preTitle && <Text style={styles.preTitle}>{preTitle}</Text>}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  circleTopRight: {
    position: "absolute",
    top: -32,
    right: -32,
    width: 176,
    height: 176,
    borderRadius: 88,
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  circleBottomLeft: {
    position: "absolute",
    bottom: -24,
    left: -16,
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  content: {
    position: "relative",
  },
  preTitle: {
    color: "rgba(255,255,255,0.70)",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
    lineHeight: 32,
  },
  subtitle: {
    color: "rgba(255,255,255,0.70)",
    fontSize: 14,
    marginTop: 2,
  },
});

export default SectionTitle;
