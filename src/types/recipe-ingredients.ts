import type { Ingredient } from "@/types/ingredients";
import type { Unit } from "@/types/units";

export interface RecipeIngredientsState {
  recipeIngredientsList: RecipeIngredient[];
}

export interface RecipeIngredient {
  _id: string;
  ingredient: Ingredient;
  unit: Unit;
  quantity: number;
}
