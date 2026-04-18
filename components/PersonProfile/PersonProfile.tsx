import { Colors } from "@/constants/theme";
import { Image, StyleSheet, Text, View } from "react-native";

type PersonProfileProps = {
  imageUrl: string;
  name: string;
  role?: string;
  stage?: string[];
  conditions?: string[];
  lastScaned?: string;
};

const PersonProfile = ({
  imageUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  name = "Nombre no disponible",
  role,
  stage,
  conditions,
  lastScaned,
}: PersonProfileProps) => {
  return (
    <View style={styles.card}>
      <View>
        <Image
          resizeMode="cover"
          style={styles.profilePicture}
          source={{ uri: imageUrl }}
        />
      </View>

      <View style={styles.dataHolder}>
        <View style={styles.nameHeader}>
          <Text style={styles.name}>{name}</Text>
          {role && (
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{role}</Text>
            </View>
          )}
        </View>

        {stage && stage.length > 0 && (
          <View style={styles.tagsRow}>
            {stage.map((s, i) => (
              <View key={i} style={styles.stageTag}>
                <Text style={styles.stageTagText}>{s}</Text>
              </View>
            ))}
          </View>
        )}

        {conditions && conditions.length > 0 && (
          <View style={styles.tagsRow}>
            {conditions.map((c, i) => (
              <View key={i} style={styles.conditionTag}>
                <Text style={styles.conditionTagText}>{c}</Text>
              </View>
            ))}
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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray,
    backgroundColor: Colors.light.background,
    width: "100%",
    padding: 12,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 35,
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
  roleBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  roleText: {
    color: Colors.dark.text,
    fontSize: 12,
    fontWeight: "600",
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