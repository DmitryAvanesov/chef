import type { Ingredient } from "@/types/ingredients";
import type { RecipeIngredient } from "@/types/recipe-ingredients";
import type { Recipe } from "@/types/recipes";
import type { Unit } from "@/types/units";

export type ApiRoute =
  | "ingredients"
  | "recipe-ingredients"
  | "recipes"
  | "units";

export type ApiType = Ingredient | RecipeIngredient | Recipe | Unit;
