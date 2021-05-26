import type { IngredientsState } from "@/types/ingredients";
import type { UnitsState } from "@/types/units";

export interface RootState {
  ingredients: IngredientsState;
  units: UnitsState;
}
