import type { RecipeIngredient } from "@/types/recipe-ingredients";
import { ApiRoute } from "@/types/api";

export interface RecipesState {
  route: ApiRoute;
  recipesList: Recipe[];
}

export interface Recipe {
  _id: string;
  name: string;
  ingredients: RecipeIngredient[];
}
