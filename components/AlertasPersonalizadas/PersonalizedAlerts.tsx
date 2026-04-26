import { Colors } from "@/constants/theme";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import type { AlertIconKey, AlertRule, ProfileData, ProfileIconKey } from "./types";

interface PersonalizedAlertsProps {
  profile: ProfileData;
  alerts?: AlertRule[];
  onChangeProfile: () => void;
}

const SEVERITY_RANK = { high: 0, medium: 1, low: 2 } as const;

const SEVERITY_LABEL = {
  high: "Prioridad Alta",
  medium: "Prioridad Media",
  low: "Baja",
} as const;

const renderProfileIcon = (key: ProfileIconKey, size: number, color: string) => {
  if (key === "baby") return <MaterialIcons name="child-care" size={size} color={color} />;
  if (key === "elder") return <MaterialIcons name="accessible" size={size} color={color} />;
  return <Ionicons name="person-outline" size={size} color={color} />;
};

const renderAlertIcon = (key: AlertIconKey, size: number, color: string) => {
  if (key === "shield") {
    return <MaterialCommunityIcons name="shield-outline" size={size} color={color} />;
  }
  return <Ionicons name="warning" size={size} color={color} />;
};

export const PersonalizedAlerts = ({
  profile,
  alerts = [],
  onChangeProfile,
}: PersonalizedAlertsProps) => {
  const [expanded, setExpanded] = useState(false);
  const [openAlert, setOpenAlert] = useState<AlertRule | null>(null);

  const sorted = [...alerts].sort(
    (a, b) => SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity]
  );

  const ProfileChip = (
    <View style={styles.chip}>
      <View style={styles.chipAvatar}>
        {profile.photoUrl ? (
          <Image source={{ uri: profile.photoUrl }} style={styles.chipAvatarImage} />
        ) : (
          <View style={styles.chipAvatarFallback}>
            {renderProfileIcon(profile.iconKey, 16, Colors.secondary)}
          </View>
        )}
      </View>
      <Text style={styles.chipText}>
        Alertas para <Text style={styles.chipName}>{profile.name}</Text>
      </Text>
      <Pressable
        onPress={onChangeProfile}
        style={({ pressed }) => [styles.changeButton, pressed && styles.pressed]}
      >
        <Text style={styles.changeButtonText}>Cambiar</Text>
      </Pressable>
    </View>
  );

  if (!sorted.length) {
    return (
      <View>
        {ProfileChip}
        <View style={styles.emptyCard}>
          <View style={styles.emptyIcon}>
            <MaterialCommunityIcons name="shield-outline" size={20} color={Colors.primary} />
          </View>
          <View style={styles.emptyText}>
            <Text style={styles.emptyTitle}>Sin alertas para este perfil</Text>
            <Text style={styles.emptySubtitle}>No se detectaron riesgos para {profile.name}.</Text>
          </View>
        </View>
      </View>
    );
  }

  const visible = expanded ? sorted : sorted.slice(0, 2);

  return (
    <View>
      {ProfileChip}
      <View style={styles.alertList}>
        {visible.map((alert: AlertRule, i: number) => (
          <Pressable
            key={i}
            onPress={() => setOpenAlert(alert)}
            style={({ pressed }) => [
              styles.alertCard,
              { borderColor: alert.border },
              pressed && styles.pressed,
            ]}
          >
            <View style={[styles.alertIcon, { backgroundColor: alert.bg }]}>
              {renderAlertIcon(alert.iconKey, 20, alert.color)}
            </View>
            <View style={styles.alertText}>
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <Text style={styles.alertBody} numberOfLines={2}>
                {alert.body}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={Colors.mediunGray} />
          </Pressable>
        ))}

        {sorted.length > 2 && (
          <Pressable onPress={() => setExpanded((v) => !v)} style={styles.toggleMore}>
            <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={16} color="#636E72" />
            <Text style={styles.toggleMoreText}>
              {expanded ? "Ver menos" : `Ver ${sorted.length - 2} más`}
            </Text>
          </Pressable>
        )}
      </View>

      <Modal
        visible={openAlert !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setOpenAlert(null)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setOpenAlert(null)}>
          <Pressable style={styles.modalSheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHandle} />
            {openAlert && (
              <>
                <View style={styles.modalHeader}>
                  <View style={[styles.modalIcon, { backgroundColor: openAlert.bg }]}>
                    {renderAlertIcon(openAlert.iconKey, 24, openAlert.color)}
                  </View>
                  <View style={styles.modalHeaderText}>
                    <View style={[styles.severityPill, { backgroundColor: openAlert.color }]}>
                      <Text style={styles.severityPillText}>
                        {SEVERITY_LABEL[openAlert.severity]}
                      </Text>
                    </View>
                    <Text style={styles.modalTitle}>{openAlert.title}</Text>
                    <Text style={styles.modalCondition}>{openAlert.condition}</Text>
                  </View>
                  <Pressable
                    onPress={() => setOpenAlert(null)}
                    style={styles.modalClose}
                    hitSlop={8}
                  >
                    <Ionicons name="close" size={18} color={Colors.darkGray} />
                  </Pressable>
                </View>
                <Text style={styles.modalBody}>{openAlert.body}</Text>
                <View style={styles.disclaimer}>
                  <Text style={styles.disclaimerText}>
                    Esta alerta es informativa. Consulta siempre con un profesional de salud.
                  </Text>
                </View>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  chipAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: Colors.light.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  chipAvatarImage: {
    width: "100%",
    height: "100%",
  },
  chipAvatarFallback: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E8F8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  chipText: {
    flex: 1,
    fontSize: 14,
    color: "#4A5568",
  },
  chipName: {
    fontWeight: "700",
    color: "#1A2E26",
  },
  changeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: "#D1FAE5",
  },
  changeButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.secondary,
  },
  pressed: {
    opacity: 0.85,
  },
  emptyCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: "#D1FAE5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  emptyIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#E8F8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    flex: 1,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A2E26",
  },
  emptySubtitle: {
    fontSize: 12,
    color: Colors.darkGray,
    marginTop: 2,
  },
  alertList: {
    gap: 10,
  },
  alertCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: Colors.light.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1,
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  alertText: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A2E26",
  },
  alertBody: {
    fontSize: 12,
    color: "#636E72",
    marginTop: 4,
  },
  toggleMore: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
  },
  toggleMoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#636E72",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
    marginBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 16,
  },
  modalIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  modalHeaderText: {
    flex: 1,
  },
  severityPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    marginBottom: 4,
  },
  severityPillText: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.light.background,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A2E26",
  },
  modalCondition: {
    fontSize: 12,
    color: Colors.darkGray,
  },
  modalClose: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  modalBody: {
    fontSize: 14,
    color: "#4A5568",
    lineHeight: 22,
  },
  disclaimer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#F8F9FA",
  },
  disclaimerText: {
    fontSize: 12,
    color: Colors.darkGray,
  },
});

export default PersonalizedAlerts;
