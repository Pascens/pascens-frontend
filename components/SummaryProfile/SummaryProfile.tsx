import { Colors } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

type SummaryProfileProps = {
  scans: number;
  healthy: number;
  intermediate: number;
  harmful: number;
};

const StatColumn = ({
  value,
  label,
  dotColor,
  showSeparator,
}: {
  value: number;
  label: string;
  dotColor?: string;
  showSeparator: boolean;
}) => (
  <View style={styles.columnWrapper}>
    {showSeparator && <View style={styles.separator} />}
    <View style={styles.column}>
      <View style={styles.dotRow}>
        {dotColor ? (
          <View style={[styles.dot, { backgroundColor: dotColor }]} />
        ) : (
          <View style={styles.dotPlaceholder} />
        )}
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  </View>
);

const SummaryProfile = ({
  scans,
  healthy,
  intermediate,
  harmful,
}: SummaryProfileProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>TU RESUMEN</Text>
      <View style={styles.row}>
        <StatColumn value={scans} label="escáneos" showSeparator={false} />
        <StatColumn value={healthy} label="saludables" dotColor={Colors.primary} showSeparator />
        <StatColumn value={intermediate} label="intermedios" dotColor="#E8A838" showSeparator />
        <StatColumn value={harmful} label="dañinos" dotColor="#D95C4A" showSeparator />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.background,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 8,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
    color: Colors.darkgray,
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  columnWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
  },
  separator: {
    width: 1,
    backgroundColor: Colors.gray,
    alignSelf: "stretch",
    marginVertical: 4,
  },
  column: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  dotRow: {
    height: 12,
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotPlaceholder: {
    width: 10,
    height: 10,
  },
  value: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.light.text,
  },
  label: {
    fontSize: 12,
    color: Colors.darkgray,
    fontWeight: "400",
  },
});

export default SummaryProfile;
