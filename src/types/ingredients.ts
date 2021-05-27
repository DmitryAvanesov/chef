import type { Unit } from "@/types/units";

export interface IngredientsState {
  ingredientsList: Ingredient[];
}

export interface Ingredient {
  _id?: string;
  name: string;
  units: Unit[];
}

export interface UpdateIngredientPayload {
  id: string;
  ingredient: Ingredient;
}

export interface ActionButton {
  color: string;
  icon: string;
  callback: () => void;
}
