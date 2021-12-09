import ingredients from "@/store/modules/ingredients";
import recipeIngredients from "@/store/modules/recipe-ingredients";
import recipeStages from "@/store/modules/recipe-stages";
import recipes from "@/store/modules/recipes";
import units from "@/store/modules/units";
import type { RootState } from "@/types/root";
import type { InjectionKey } from "vue";
import { createStore, useStore } from "vuex";
import type { Store } from "vuex";

const sortUnitsPlugin = (store: Store<RootState>) => {
  store.subscribe((mutation) => {
    if (
      mutation.type.startsWith("units") &&
      mutation.type !== "units/sortUnits"
    ) {
      store.commit("units/sortUnits");
    } else if (
      mutation.type.startsWith("ingredients") &&
      mutation.type !== "ingredients/sortIngredients"
    ) {
      store.commit("ingredients/sortIngredients");
    } else if (
      mutation.type.startsWith("recipes") &&
      mutation.type !== "recipes/sortRecipes"
    ) {
      store.commit("recipes/sortRecipes");
    }
  });
};

export const store = createStore<RootState>({
  modules: {
    recipes,
    recipeIngredients,
    recipeStages,
    ingredients,
    units,
  },
  plugins: [sortUnitsPlugin],
});

export const key: InjectionKey<Store<RootState>> = Symbol();
export function useRootStore(): Store<RootState> {
  return useStore(key);
}
