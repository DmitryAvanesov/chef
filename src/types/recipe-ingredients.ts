import type { ApiRoute } from "@/types/api";
import type { Ingredient } from "@/types/ingredients";
import type { Recipe } from "@/types/recipes";
import type { Unit } from "@/types/units";

export interface RecipeIngredientsState {
  route: ApiRoute;
}

export interface RecipeIngredient {
  _id: string;
  ingredient: Ingredient;
  unit: Unit;
  quantity: number;
}

export interface RecipeIngredientPayload {
  recipe: Recipe;
  recipeIngredient: RecipeIngredient;
}
