import type { ApiRoute } from "@/types/api";
import type { RecipeIngredient } from "@/types/recipe-ingredients";

export interface RecipesState {
  route: ApiRoute;
  recipesList: Recipe[];
}

export interface Recipe {
  _id: string;
  name: string;
  ingredients: RecipeIngredient[];
}
