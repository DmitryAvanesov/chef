import type { Unit } from "@/types/units";

export interface IngredientsState {
  ingredientsList: Ingredient[];
}

export interface Ingredient {
  _id?: string;
  name: string;
  units: Unit[];
}

export interface IngredientPayload {
  _id: string;
  name: string;
  units: string[];
}

export interface ActionButton {
  color: string;
  icon: string;
  callback: () => void;
}
