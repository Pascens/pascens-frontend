import { Colors } from "@/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

type AddProfileProps = {
  onPress?: () => void;
};

const AddProfile = ({ onPress }: AddProfileProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
      ]}
    >
      {({ pressed }) => (
        <>
          <View
            style={[styles.iconCircle, pressed && styles.iconCirclePressed]}
          >
            <Text style={styles.plus}>+</Text>
          </View>
          <Text style={styles.label}>Agregar nueva persona</Text>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderStyle: "dashed",
    backgroundColor: Colors.gray,
  },
  containerPressed: {
    backgroundColor: `${Colors.primary}20`,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${Colors.primary}20`,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCirclePressed: {
    backgroundColor: `${Colors.primary}70`,
  },
  plus: {
    fontSize: 24,
    color: Colors.primary,
    lineHeight: 28,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
  },
});

export default AddProfile;
