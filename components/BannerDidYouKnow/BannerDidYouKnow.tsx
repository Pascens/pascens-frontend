import { ImageBackground, StyleSheet, Text, View } from "react-native";

export interface InfoBannerProps {
  type?: "warning" | "promo";
  title: string;
  description: string;
  note?: string;
  image: any;
}

export const InfoBanner = ({
  type = "warning",
  title,
  description,
  note,
  image,
}: InfoBannerProps) => {
  return (
    <ImageBackground
      source={image}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {type === "warning" ? "Ten cuidado" : "¿Sabías que?"}
          </Text>
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          {note && <Text style={styles.note}> {note}</Text>}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    borderRadius: 14,
    overflow: "hidden",
    aspectRatio: 16 / 10,
    backgroundColor: "#000",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 16,
    paddingBottom: 36,
    justifyContent: "space-between",
  },
  textBlock: {
    gap: 6,
  },
  badge: {
    backgroundColor: "rgba(255,255,255,0.15)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  title: { color: "#fff", fontSize: 17, fontWeight: "700" },
  description: { color: "#fff", fontSize: 13, fontWeight: "500" },
  note: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    overflow: "hidden",
  },
});
