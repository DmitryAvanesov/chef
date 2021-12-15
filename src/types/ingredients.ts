import type { ApiRoute } from "@/types/api";
import type { Unit } from "@/types/units";

export interface IngredientsState {
  route: ApiRoute;
  ingredientsList: Ingredient[] | null;
}

export interface Ingredient {
  _id: string;
  name: string;
  units: Unit[];
  image: string;
}
