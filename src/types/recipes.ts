import type { RecipeIngredient } from "@/types/recipe-ingredients";

export interface RecipesState {
  recipesList: Recipe[];
}

export interface Recipe {
  _id: string;
  name: string;
  ingredients: RecipeIngredient[];
}
