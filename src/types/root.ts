import type { IngredientsState } from "@/types/ingredients";
import type { RecipesState } from "@/types/recipes";
import type { UnitsState } from "@/types/units";

export interface RootState {
  recipes: RecipesState;
  ingredients: IngredientsState;
  units: UnitsState;
}
