import { Colors } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { ImageBackground, StyleSheet, View, ViewStyle } from "react-native";

interface Props {
  imageUrl?: string;
  style?: ViewStyle;
  children?: ReactNode;
}

const ProductHeroImage = ({ imageUrl, style, children }: Props) => {
  return (
    <View style={[styles.wrap, style]}>
      {imageUrl ? (
        <ImageBackground source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={[styles.image, styles.fallback]} />
      )}

      <LinearGradient
        colors={["rgba(0,0,0,0.65)", "transparent"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={StyleSheet.absoluteFillObject}
      />

      {children}
    </View>
  );
};

export default ProductHeroImage;

const styles = StyleSheet.create({
  wrap: {
    height: 160,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  fallback: {
    backgroundColor: Colors.gray,
  },
});
