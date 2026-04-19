/**
 * Below are the predefined configurations for Ingredient Indicators.
 * These settings ensure visual consistency for categories
 * throughout the app, mapping each type to its corresponding Ionicon and theme color.
 */

import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { Colors } from "./theme";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

export const INDICATOR_CONFIG = {
  Info: {
    icon: 'information-circle-outline' as IoniconName,
    backgroundColor: Colors.gray,
    iconColor: Colors.darkGray,
  },
  Ultraprocesado: {
    icon: 'flame' as IoniconName,
    backgroundColor: Colors.fadedRed,
    iconColor: Colors.red,
  },
  Aditivo: {
    icon: 'flash-outline' as IoniconName,
    backgroundColor: Colors.fadedOrange,
    iconColor: Colors.orange,
  },
  Alergeno: {
    icon: 'warning-outline' as IoniconName,
    backgroundColor: Colors.fadedRed,
    iconColor: Colors.red,
  },
  Antioxidante: {
    icon: 'shield-outline' as IoniconName,
    backgroundColor: Colors.fadedGreen,
    iconColor: Colors.secondary,
  },
  Conservador: {
    icon: 'flask-outline' as IoniconName,
    backgroundColor: Colors.fadedPurple,
    iconColor: Colors.purple,
  },
  Natural: {
    icon: 'leaf-outline' as IoniconName,
    backgroundColor: Colors.fadedBlue,
    iconColor: Colors.blue,
  },
} as const;

export type IndicatorType = keyof typeof INDICATOR_CONFIG;