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
    title: 'Información',
    description:
      'Detalles adicionales sobre este ingrediente. Toca cualquier indicador para conocer su significado.',
  },
  Ultraprocesado: {
    icon: 'flame' as IoniconName,
    backgroundColor: Colors.fadedRed,
    iconColor: Colors.red,
    title: 'Ultraprocesado',
    description:
      'Ingredientes industriales sometidos a múltiples procesos. Suelen contener altas cantidades de azúcares, grasas y aditivos. Su consumo frecuente se asocia con problemas de salud.',
  },
  Aditivo: {
    icon: 'flash-outline' as IoniconName,
    backgroundColor: Colors.fadedOrange,
    iconColor: Colors.orange,
    title: 'Aditivo',
    description:
      'Sustancia añadida para mejorar sabor, textura, color o duración. No todos los aditivos son dañinos, pero conviene moderar el consumo de productos con muchos.',
  },
  Alergeno: {
    icon: 'warning-outline' as IoniconName,
    backgroundColor: Colors.fadedRed,
    iconColor: Colors.red,
    title: 'Alérgeno',
    description:
      'Ingrediente que puede causar reacciones alérgicas en personas sensibles. Revisa siempre la etiqueta si tienes alergias o intolerancias.',
  },
  Antioxidante: {
    icon: 'shield-outline' as IoniconName,
    backgroundColor: Colors.fadedGreen,
    iconColor: Colors.secondary,
    title: 'Antioxidante',
    description:
      'Compuesto que ayuda a proteger las células del daño causado por los radicales libres. Se encuentra de forma natural en frutas, verduras y semillas.',
  },
  Conservador: {
    icon: 'flask-outline' as IoniconName,
    backgroundColor: Colors.fadedPurple,
    iconColor: Colors.purple,
    title: 'Conservador',
    description:
      'Sustancia usada para prolongar la vida útil del producto evitando el crecimiento de microorganismos. Algunos son seguros y otros se recomiendan limitar.',
  },
  Natural: {
    icon: 'leaf-outline' as IoniconName,
    backgroundColor: Colors.fadedBlue,
    iconColor: Colors.blue,
    title: 'Natural',
    description:
      'Ingrediente de origen natural, mínimamente procesado. Generalmente aporta nutrientes y se considera una opción más saludable.',
  },
} as const;

export type IndicatorType = keyof typeof INDICATOR_CONFIG;