import type { Unit } from "@/types/units";

export interface IngredientsState {
  ingredientsList: Ingredient[];
}

export interface Ingredient {
  _id: string;
  name: string;
  units: Unit[];
  image: string;
}

export interface ActionButton {
  color: string;
  icon: string;
  title: string;
  callback: () => void;
}
