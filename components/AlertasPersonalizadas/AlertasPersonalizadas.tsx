import { Colors } from "@/constants/theme";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ALERT_RULES } from "./data";
import { PersonalizedAlerts } from "./PersonalizedAlerts";
import { ProfileSelector } from "./ProfileSelector";
import type { AlertRule, ProfileData } from "./types";

interface AlertasPersonalizadasProps {
  profiles?: ProfileData[];
  alerts?: AlertRule[];
  onSelectorExpand?: () => void;
}

export const AlertasPersonalizadas = ({
  profiles,
  alerts,
  onSelectorExpand,
}: AlertasPersonalizadasProps) => {
  const [selectedProfile, setSelectedProfile] = useState<ProfileData | null>(null);
  const [showSelector, setShowSelector] = useState(true);

  const profileAlerts = selectedProfile
    ? (alerts ?? ALERT_RULES).filter((rule) =>
        selectedProfile.conditions.includes(rule.condition)
      )
    : [];

  const showingSelector = showSelector || !selectedProfile;

  return (
    <>
      <View style={styles.separator} />
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Alertas personalizadas</Text>
          <Text style={styles.subtitle}>Basadas en tu perfil de salud</Text>
        </View>
        {showingSelector ? (
          <ProfileSelector
            profiles={profiles ?? []}
            selectedProfile={selectedProfile}
            onSelectProfile={(p) => {
              setSelectedProfile(p);
              setShowSelector(false);
            }}
            onExpand={onSelectorExpand}
            defaultOpen={!!selectedProfile}
            isChangeMode={!!selectedProfile}
          />
        ) : (
          <PersonalizedAlerts
            profile={selectedProfile!}
            alerts={profileAlerts}
            onChangeProfile={() => {
              setShowSelector(true);
              onSelectorExpand?.();
            }}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 12,
    backgroundColor: Colors.gray,
  },
  card: {
    backgroundColor: Colors.light.background,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.darkGray,
    marginTop: 2,
  },
});

export default AlertasPersonalizadas;
