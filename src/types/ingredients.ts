import { Unit } from "@/types/units";

export interface IngredientsState {
  ingredientsList: Ingredient[];
}

export interface Ingredient {
  name: string;
  units: Unit[];
}
