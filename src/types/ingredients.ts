export interface IngredientsState {
  all: Ingredient[];
}

export interface Ingredient {
  name: string;
  units: Units[];
}

interface IngredientQuantity {
  number: number;
  unit: Units;
}

enum Units {
  Grams,
  Kilograms
}
