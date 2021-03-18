import { Unit } from "@/types/units";

export interface IngredientsState {
  ingredientsList: Ingredient[];
}

export interface Ingredient {
  _id?: string;
  name: string;
  units: Unit[];
}
