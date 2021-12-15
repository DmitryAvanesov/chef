import type { Ingredient } from "@/types/ingredients";
import type { RecipeIngredient } from "@/types/recipe-ingredients";
import type { RecipeStage } from "@/types/recipe-stages";
import type { Recipe } from "@/types/recipes";
import type { Unit } from "@/types/units";

export type ApiRoute =
  | "ingredients"
  | "recipe-ingredients"
  | "recipe-stages"
  | "recipes"
  | "units";

export type ApiType =
  | Ingredient
  | RecipeIngredient
  | RecipeStage
  | Recipe
  | Unit;

export interface ApiQuery {
  ingredients?: string[];
  minutes?: { lower: number; upper: number };
}
