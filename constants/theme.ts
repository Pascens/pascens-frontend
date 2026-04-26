/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

export const Colors = {
  primary: "#2FAB88",
  secondary: "#2FC767",
  gray: "#F4F6F4",
  darkGray: "#95A5A6",
  mediunGray: "#C5CBD3",
  fadedRed: "#FDECEA",
  red: "#E74C3C",
  orange: "#E67E22",
  fadedOrange: "#FEF3E2",
  purple: "#8E44AD",
  fadedPurple: "#f3e5f5",
  blue: "#3498DB",
  fadedBlue: "#EBF5FB",
  fadedGreen: "#2FAB881A",

  light: {
    text: "#000000",
    background: "#FFFFFF",
  },
  dark: {
    text: "#FFFFFF",
    background: "#000000",
  },
} as const;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
