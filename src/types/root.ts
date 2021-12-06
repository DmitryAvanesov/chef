import type { IngredientsState } from "@/types/ingredients";
import type { RecipeIngredientsState } from "@/types/recipe-ingredients";
import type { RecipesState } from "@/types/recipes";
import type { UnitsState } from "@/types/units";

export interface RootState {
  recipes: RecipesState;
  recipeIngredients: RecipeIngredientsState;
  ingredients: IngredientsState;
  units: UnitsState;
}
