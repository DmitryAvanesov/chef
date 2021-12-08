import type { ApiRoute } from "@/types/api";
import type { RecipeIngredient } from "@/types/recipe-ingredients";
import type { RecipeStage } from "@/types/recipe-stages";

export interface RecipesState {
  route: ApiRoute;
  recipesList: Recipe[];
}

export interface Recipe {
  _id: string;
  name: string;
  ingredients: RecipeIngredient[];
  stages: RecipeStage[];
}
