import { Colors } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type PersonProfileProps = {
  imageUrl: string;
  name: string;
  isCurrentUser?: boolean;
  stage?: string[];
  conditions?: string[];
  lastScaned?: string;
  onEdit?: () => void;
};

const PersonProfile = ({
  imageUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  name = "Nombre no disponible",
  isCurrentUser,
  stage,
  conditions,
  lastScaned,
  onEdit,
}: PersonProfileProps) => {
  const allTags = [
    ...(stage ?? []).map((s) => ({ label: s, type: "stage" as const })),
    ...(conditions ?? []).map((c) => ({ label: c, type: "condition" as const })),
  ];

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="cover"
          style={styles.profilePicture}
          source={{ uri: imageUrl }}
        />
        {isCurrentUser && (
          <View style={styles.youBadge}>
            <Text style={styles.youBadgeText}>TÚ</Text>
          </View>
        )}
      </View>

      <View style={styles.divider} />

      <View style={styles.dataHolder}>
        <View style={styles.nameHeader}>
          <Text style={styles.name}>{name}</Text>
          <TouchableOpacity onPress={onEdit} hitSlop={8}>
            <Feather name="edit-2" size={16} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {allTags.length > 0 && (
          <View style={styles.tagsRow}>
            {allTags.map((tag, i) =>
              tag.type === "stage" ? (
                <View key={i} style={styles.stageTag}>
                  <Text style={styles.stageTagText}>{tag.label}</Text>
                </View>
              ) : (
                <View key={i} style={styles.conditionTag}>
                  <Text style={styles.conditionTagText}>{tag.label}</Text>
                </View>
              )
            )}
          </View>
        )}

        {lastScaned && (
          <Text style={styles.lastScaned}>Último escaneo: {lastScaned}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: Colors.light.background,
    width: "100%",
    padding: 12,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: "relative",
  },
  divider: {
    width: 1,
    alignSelf: "stretch",
    backgroundColor: Colors.gray,
    marginHorizontal: 4,
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  youBadge: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  youBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  dataHolder: {
    flex: 1,
    gap: 6,
  },
  nameHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  stageTag: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  stageTagText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "500",
  },
  conditionTag: {
    borderWidth: 1,
    borderColor: "#FCD34D",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#FFFBEB",
  },
  conditionTagText: {
    color: "#B45309",
    fontSize: 12,
    fontWeight: "500",
  },
  lastScaned: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
});

export default PersonProfile;