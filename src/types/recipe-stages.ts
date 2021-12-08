import type { ApiRoute } from "@/types/api";
import type { Recipe } from "@/types/recipes";

export interface RecipeStagesState {
  route: ApiRoute;
}

export interface RecipeStage {
  _id: string;
  number: number;
  description: string;
  minutes: number;
}

export interface RecipeStagePayload {
  recipe: Recipe;
  recipeStage: RecipeStage;
}
