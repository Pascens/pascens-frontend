import AddProfile from "@/components/AddProfile/AddProfile";
import { ProfileData } from "@/components/AlertasPersonalizadas/types";
import PersonProfile from "@/components/PersonProfile/PersonProfile";
import SummaryProfile from "@/components/SummaryProfile/SummaryProfile";
import { Colors } from "@/constants/theme";
import api from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SUMMARY_OVERLAP = 60;

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const { data: profiles } = useQuery<ProfileData[]>({
    queryKey: ["profiles"],
    queryFn: () => api.get("/profiles").then((res) => res.data),
  });

  const mainUser = profiles?.[0];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={[Colors.secondary, Colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.7, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 16 }]}
      >
        <View style={styles.circleTopRight} />
        <View style={styles.circleBottomLeft} />

        <Pressable style={[styles.settingsButton, { top: insets.top + 16 }]} hitSlop={8}>
          <Ionicons name="settings-outline" size={20} color="#fff" />
        </Pressable>

        <View style={styles.userInfo}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              {mainUser?.photoUrl ? (
                <Image
                  source={{ uri: mainUser.photoUrl }}
                  style={styles.avatarImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarPlaceholderText}>
                    {mainUser?.name?.charAt(0) ?? "A"}
                  </Text>
                </View>
              )}
            </View>
            <Pressable style={styles.cameraButton} hitSlop={8}>
              <Ionicons name="camera" size={14} color="#fff" />
            </Pressable>
          </View>

          <Text style={styles.name}>{mainUser?.name ?? ""}</Text>
          <Text style={styles.email}>arturo@gmail.com</Text>
        </View>
      </LinearGradient>

      <View style={styles.summaryWrapper}>
        <SummaryProfile scans={0} healthy={0} intermediate={0} harmful={0} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personas</Text>
        <View style={styles.list}>
          {profiles?.map((profile, index) => (
            <PersonProfile
              key={profile.id}
              imageUrl={profile.photoUrl ?? ""}
              name={profile.name}
              isCurrentUser={index === 0}
              stage={profile.stage ? [profile.stage] : []}
              conditions={profile.conditions}
            />
          ))}
          <AddProfile />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  header: {
    position: "relative",
    overflow: "hidden",
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  circleTopRight: {
    position: "absolute",
    top: -40,
    right: -32,
    width: 176,
    height: 176,
    borderRadius: 88,
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  circleBottomLeft: {
    position: "absolute",
    bottom: -32,
    left: -24,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  settingsButton: {
    position: "absolute",
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.20)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  userInfo: {
    alignItems: "center",
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarPlaceholder: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.20)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarPlaceholderText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#fff",
  },
  cameraButton: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
  },
  email: {
    fontSize: 13,
    color: "rgba(255,255,255,0.70)",
    marginTop: 2,
  },
  summaryWrapper: {
    paddingHorizontal: 20,
    marginTop: -SUMMARY_OVERLAP,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.light.text,
  },
  list: {
    gap: 12,
  },
});
