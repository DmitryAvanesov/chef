import { Ingredient, IngredientsState, Units } from "@/types/ingredients";
import { getIngredients } from "@/api/ingredients";
import { ActionContext } from "vuex";
import { RootState } from "@/types/root";

const state = (): IngredientsState => ({
  ingredientsList: [],
});

const getters = {
  ingredientByIndex: (state: IngredientsState) => (index: number) =>
    state.ingredientsList[index],
};

const actions = {
  async getIngredientsList({
    commit,
  }: ActionContext<IngredientsState, RootState>): Promise<void> {
    const ingredients = (await getIngredients()).map(
      (ingredient: Ingredient) => ({
        ...ingredient,
        units: ingredient.units.map((index: number) => Units[index]),
      })
    );

    commit("setIngredientsList", ingredients);
  },
};

const mutations = {
  setIngredientsList(state: IngredientsState, payload: Ingredient[]): void {
    state.ingredientsList = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
