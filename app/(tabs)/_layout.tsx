import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_ICONS: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  index: "home-filled",
  history: "schedule",
  profile: "person",
};

const TAB_LABELS: Record<string, string> = {
  index: "Home",
  history: "History",
  profile: "Profile",
  camera: "Scan",
};

function TabItem({
  isFocused,
  iconName,
  label,
  onPress,
}: {
  isFocused: boolean;
  iconName: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  const progress = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isFocused ? 1 : 0, { duration: 250 });
  }, [isFocused]);

  const indicatorStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scaleX: progress.value }],
  }));

  return (
    <Pressable
      onPress={onPress}
      style={styles.tab}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected: isFocused }}
    >
      <MaterialIcons name={iconName} size={28} color={isFocused ? "#000000" : "#9E9E9E"} />
      <Text style={[styles.label, { color: isFocused ? "#687076" : "#9BA1A6" }]}>{label}</Text>
      <Animated.View style={[styles.indicator, { backgroundColor: "#0a7ea4" }, indicatorStyle]} />
    </Pressable>
  );
}

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.tabBar,
        {
          paddingBottom: insets.bottom / 2,
          backgroundColor: "#FFFFFF",
          borderTopColor: "#EBEBEB",
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const label = TAB_LABELS[route.name] ?? route.name;
        const isFocused = state.index === index;
        const isMain = route.name === "camera";
        const iconName = TAB_ICONS[route.name] ?? "circle";

        const onPress = () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        if (isMain) {
          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={styles.mainTab}
              accessibilityRole="button"
              accessibilityLabel={label}
              accessibilityState={{ selected: isFocused }}
            >
              <LinearGradient
                colors={["#067834", "#21be4b"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.mainButton}
              >
                <MaterialCommunityIcons name="barcode-scan" size={32} color="#FFFFFF" />
              </LinearGradient>
            </Pressable>
          );
        }

        return (
          <TabItem
            key={route.key}
            isFocused={isFocused}
            iconName={iconName}
            label={label}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
}

function AndroidTabLayout() {
  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="history" options={{ title: "History" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      <Tabs.Screen name="camera" options={{ title: "Camera" }} />
    </Tabs>
  );
}

export default function TabLayout() {
  return <AndroidTabLayout />;
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    paddingTop: 8,
    borderTopWidth: 1,
    paddingRight: 16,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
  },
  indicator: {
    width: 20,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#0a7ea4",
    marginTop: 4,
  },
  mainTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
