import { IngredientsState } from "@/types/ingredients";
import { UnitsState } from "@/types/units";

export interface RootState {
  ingredients: IngredientsState;
  units: UnitsState;
}
