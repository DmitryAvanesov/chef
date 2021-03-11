import { Ingredient, IngredientsState } from "@/types/ingredients";
import { apiGetIngredients, apiPostIngredient } from "@/api/ingredients";
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
  async getIngredients({
    commit,
  }: ActionContext<IngredientsState, RootState>): Promise<void> {
    const ingredients = await apiGetIngredients();
    commit("setIngredientsList", ingredients);
  },
  async postIngredient(
    { commit }: ActionContext<IngredientsState, RootState>,
    body: Ingredient
  ): Promise<void> {
    const ingredient = await apiPostIngredient(body);
    commit("addIngredient", ingredient);
  },
};

const mutations = {
  setIngredientsList(
    state: IngredientsState,
    ingredientsList: Ingredient[]
  ): void {
    state.ingredientsList = ingredientsList;
  },
  addIngredient(state: IngredientsState, ingredient: Ingredient): void {
    state.ingredientsList = [...state.ingredientsList, ingredient];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
