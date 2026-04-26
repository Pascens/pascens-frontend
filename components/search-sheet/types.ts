export type NutriScore = "A" | "B" | "C" | "D" | "E";
export type Risk = "low" | "medium" | "high";

export interface Product {
  id: string;
  name: string;
  brand: string;
  nutriScore: NutriScore;
}

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  risk: Risk;
}

export const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "Coca-Cola Original", brand: "The Coca-Cola Company", nutriScore: "E" },
  { id: "2", name: "Sabritas Original", brand: "PepsiCo", nutriScore: "D" },
  { id: "3", name: "Bimbo Pan Blanco", brand: "Grupo Bimbo", nutriScore: "C" },
  { id: "4", name: "Yakult", brand: "Yakult", nutriScore: "C" },
  { id: "5", name: "Manzana Verde", brand: "Del campo", nutriScore: "A" },
  { id: "6", name: "Maruchan Instant Lunch", brand: "Maruchan", nutriScore: "E" },
  { id: "7", name: "Del Valle Néctar de Mango", brand: "Coca-Cola", nutriScore: "D" },
  { id: "8", name: "Oikos Natural", brand: "Danone", nutriScore: "B" },
];

export const MOCK_INGREDIENTS: Ingredient[] = [
  { id: "1", name: "Azúcar", category: "Endulzante", risk: "high" },
  { id: "2", name: "Colorante Rojo 40", category: "Aditivo", risk: "high" },
  { id: "3", name: "Glutamato Monosódico", category: "Potenciador de sabor", risk: "medium" },
  { id: "4", name: "Aceite de Palma", category: "Grasa", risk: "medium" },
  { id: "5", name: "Vitamina C", category: "Vitamina", risk: "low" },
  { id: "6", name: "Fibra de Avena", category: "Fibra", risk: "low" },
  { id: "7", name: "Jarabe de Maíz", category: "Endulzante", risk: "high" },
  { id: "8", name: "Lecitina de Soya", category: "Emulsificante", risk: "low" },
];
