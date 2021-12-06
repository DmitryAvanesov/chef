import type { Ingredient } from "@/types/ingredients";
import type { Unit } from "@/types/units";
import { ApiRoute } from "@/types/api";

export interface RecipeIngredientsState {
  route: ApiRoute;
  recipeIngredientsList: RecipeIngredient[];
}

export interface RecipeIngredient {
  _id: string;
  ingredient: Ingredient;
  unit: Unit;
  quantity: number;
}
