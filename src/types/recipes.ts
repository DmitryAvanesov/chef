import type { Ingredient } from "@/types/ingredients";
import type { Unit } from "@/types/units";

export interface RecipesState {
  recipesList: Recipe[];
}

export interface Recipe {
  _id: string;
  name: string;
  ingredients: RecipeIngredient[];
}

export interface RecipeIngredient {
  _id: string;
  ingredient: Ingredient;
  unit: Unit;
  quantity: number;
}
