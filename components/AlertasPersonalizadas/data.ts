import type { AlertRule, ProfileData } from "./types";

export const AVAILABLE_PROFILES: ProfileData[] = [
  {
    id: "main-user",
    name: "Arturo García",
    stage: "Adulto",
    conditions: ["Diabetes tipo 2", "Hipotiroidismo / Hipertiroidismo"],
    photoUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    iconKey: "user",
  },
  {
    id: "1",
    name: "Sofía",
    stage: "Adulta",
    conditions: ["Diabetes tipo 2"],
    photoUrl:
      "https://images.unsplash.com/photo-1745434159123-4908d0b9df94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    iconKey: "user",
  },
  {
    id: "2",
    name: "Emma",
    stage: "Niña",
    conditions: [],
    photoUrl:
      "https://images.unsplash.com/photo-1722596574038-7ac7b0857c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    iconKey: "baby",
  },
  {
    id: "3",
    name: "Abuela Rosa",
    stage: "Adulta mayor",
    conditions: ["Hipotiroidismo / Hipertiroidismo"],
    photoUrl:
      "https://images.unsplash.com/photo-1496672254107-b07a26403885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    iconKey: "elder",
  },
];

export const ALERT_RULES: AlertRule[] = [
  {
    condition: "Diabetes tipo 2",
    severity: "high",
    title: "Alto contenido de azúcar",
    body: "Este producto contiene azúcar y/o maltodextrina, ingredientes que elevan rápidamente la glucosa en sangre. Se recomienda evitar o consumir con mucha moderación.",
    triggerIngredients: [
      "azúcar",
      "jarabe de maíz",
      "fructosa",
      "glucosa",
      "sacarosa",
      "maltodextrina",
    ],
    iconKey: "warning",
    color: "#E74C3C",
    bg: "#FDECEA",
    border: "#FACAC7",
  },
  {
    condition: "Hipotiroidismo / Hipertiroidismo",
    severity: "medium",
    title: "Ingredientes que afectan la tiroides",
    body: "Contiene soya o derivados que pueden interferir con la absorción de hormonas tiroideas. Consulta a tu endocrinólogo antes de consumir frecuentemente.",
    triggerIngredients: ["malta", "cebada", "soja", "soy", "soya", "linaza"],
    iconKey: "shield",
    color: "#8E44AD",
    bg: "#F5EEF8",
    border: "#D7A8E8",
  },
  {
    condition: "Embarazada",
    severity: "high",
    title: "Precaución durante el embarazo",
    body: "Contiene colorantes artificiales (Rojo 40, Amarillo 6) y conservadores como TBHQ, cuyo consumo durante el embarazo debe ser limitado. Consulta con tu médico.",
    triggerIngredients: [
      "azúcar",
      "jarabe",
      "colorante",
      "conservador",
      "tbhq",
      "rojo 40",
      "amarillo 6",
      "laca",
    ],
    iconKey: "warning",
    color: "#E67E22",
    bg: "#FEF3E2",
    border: "#FAD7A0",
  },
];
