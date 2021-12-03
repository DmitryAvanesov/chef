import { Recipe } from "@/types/recipes";
import { Ingredient } from "@/types/ingredients";
import { Unit } from "@/types/units";

export interface RecipeIngredientsState {
  recipeIngredientsList: RecipeIngredient[];
}

export interface RecipeIngredient {
  _id: string;
  ingredient: Ingredient;
  unit: Unit;
  quantity: number;
}
