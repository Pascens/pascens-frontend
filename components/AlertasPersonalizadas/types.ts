export type HealthLevel = "red" | "yellow" | "green";

export type IndicatorKey =
  | "alergeno"
  | "aditivo"
  | "ultraprocesado"
  | "antioxidante"
  | "conservador"
  | "natural";

export type ProfileIconKey = "user" | "baby" | "elder";

export type AlertIconKey = "warning" | "shield";

export interface Ingredient {
  name: string;
  level: HealthLevel;
  indicators: IndicatorKey[];
  detail: string;
}

export interface ProfileData {
  id: string;
  name: string;
  stage: string;
  conditions: string[];
  photoUrl?: string;
  iconKey: ProfileIconKey;
}

export interface AlertRule {
  condition: string;
  severity: "high" | "medium" | "low";
  title: string;
  body: string;
  triggerIngredients: string[];
  iconKey: AlertIconKey;
  color: string;
  bg: string;
  border: string;
}
