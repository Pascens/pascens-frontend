import { Colors } from "@/constants/theme";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import type { ProfileData, ProfileIconKey } from "./types";

interface ProfileSelectorProps {
  profiles: ProfileData[];
  selectedProfile: ProfileData | null;
  onSelectProfile: (p: ProfileData) => void;
  onExpand?: () => void;
  defaultOpen?: boolean;
  isChangeMode?: boolean;
}

const renderProfileIcon = (key: ProfileIconKey, size: number, color: string) => {
  if (key === "baby") return <MaterialIcons name="child-care" size={size} color={color} />;
  if (key === "elder") return <MaterialIcons name="accessible" size={size} color={color} />;
  return <Ionicons name="person-outline" size={size} color={color} />;
};

export const ProfileSelector = ({
  profiles,
  selectedProfile,
  onSelectProfile,
  onExpand,
  defaultOpen = false,
  isChangeMode = false,
}: ProfileSelectorProps) => {
  const [open, setOpen] = useState(defaultOpen);

  const toggle = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next) onExpand?.();
      return next;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>¿Para quién quieres ver alertas?</Text>
      <Pressable
        onPress={toggle}
        style={({ pressed }) => [styles.headerCard, pressed && styles.pressed]}
      >
        <Ionicons name="person-outline" size={20} color={Colors.secondary} />
        <View style={styles.headerText}>
          <Text style={styles.headerName}>
            {isChangeMode || !selectedProfile ? "Selecciona un perfil" : selectedProfile.name}
          </Text>
          {!isChangeMode && selectedProfile && (
            <Text style={styles.headerStage}>{selectedProfile.stage}</Text>
          )}
        </View>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={20} color={Colors.darkGray} />
      </Pressable>

      {open && (
        <View style={styles.list}>
          {profiles.map((p) => {
            const isSelected = selectedProfile?.id === p.id;
            return (
              <Pressable
                key={p.id}
                onPress={() => {
                  onSelectProfile(p);
                  setOpen(false);
                }}
                style={({ pressed }) => [
                  styles.profileRow,
                  isSelected && styles.profileRowSelected,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.avatar}>
                  {p.photoUrl ? (
                    <Image source={{ uri: p.photoUrl }} style={styles.avatarImage} />
                  ) : (
                    <View style={styles.avatarFallback}>
                      {renderProfileIcon(p.iconKey, 20, Colors.secondary)}
                    </View>
                  )}
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{p.name}</Text>
                  <Text style={styles.profileStage}>{p.stage}</Text>
                  {p.conditions.length > 0 && (
                    <Text style={styles.profileConditions} numberOfLines={1}>
                      {p.conditions.join(", ")}
                    </Text>
                  )}
                </View>
                {isSelected && <Ionicons name="checkmark" size={20} color={Colors.secondary} />}
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1A2E26",
  },
  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors.light.background,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  pressed: {
    opacity: 0.85,
  },
  headerText: {
    flex: 1,
  },
  headerName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A2E26",
  },
  headerStage: {
    fontSize: 12,
    color: Colors.darkGray,
  },
  list: {
    gap: 8,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    backgroundColor: Colors.light.background,
  },
  profileRowSelected: {
    backgroundColor: "#E8F8F0",
    borderColor: Colors.secondary,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#E8E8E8",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarFallback: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E8F8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A2E26",
  },
  profileStage: {
    fontSize: 12,
    color: Colors.darkGray,
  },
  profileConditions: {
    fontSize: 12,
    color: Colors.darkGray,
  },
});

export default ProfileSelector;
