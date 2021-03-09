export interface IngredientsState {
  ingredientsList: Ingredient[];
}

export interface Ingredient {
  name: string;
  units: Units[];
}

interface IngredientQuantity {
  number: number;
  unit: Units;
}

export enum Units {
  г,
  кг,
}
