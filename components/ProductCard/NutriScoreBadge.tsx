import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export type NutriScore = "A" | "B" | "C" | "D" | "E";
type Variant = "healthy" | "moderate" | "harmful";

const SCORE_VARIANT: Record<NutriScore, Variant> = {
  A: "healthy",
  B: "healthy",
  C: "moderate",
  D: "harmful",
  E: "harmful",
};

const COLORS: Record<Variant, string> = {
  healthy: "#2FC767",
  moderate: "#F1C40F",
  harmful: "#E74C3C",
};

const ASPECT_RATIO = 36 / 32;

interface Props {
  score: NutriScore;
  size?: number;
}

export function NutriScoreBadge({ score, size = 32 }: Props) {
  const variant = SCORE_VARIANT[score];
  const color = COLORS[variant];
  const width = size;
  const height = size * ASPECT_RATIO;
  const iconSize = size * 0.5;
  const exclaimSize = size * 0.45;

  return (
    <View style={[styles.container, { width, height }]}>
      <Svg width={width} height={height} viewBox="0 0 32 36" fill="none">
        <Path
          d="M16 0C16 0 4 2 4 6C4 10 3 20 16 36C29 20 28 10 28 6C28 2 16 0 16 0Z"
          fill={color}
        />
      </Svg>
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <View style={styles.iconWrapper}>
          {variant === "healthy" && <MaterialIcons name="check" size={iconSize} color="#fff" />}
          {variant === "moderate" && (
            <Text style={[styles.exclaim, { fontSize: exclaimSize }]}>!</Text>
          )}
          {variant === "harmful" && (
            <Text style={[styles.exclaim, { fontSize: exclaimSize }]}>!!</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  iconWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 4,
  },
  exclaim: {
    color: "#fff",
    fontWeight: "800",
    lineHeight: undefined,
  },
});
