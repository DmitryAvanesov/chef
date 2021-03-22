import {
  apiDeleteIngredient,
  apiGetIngredients,
  apiPostIngredient,
} from "@/api/ingredients";
import type { Ingredient, IngredientsState } from "@/types/ingredients";
import type { RootState } from "@/types/root";
import type { ActionContext } from "vuex";

const state = (): IngredientsState => ({
  ingredientsList: [],
});

const getters = {
  ingredientById: (state: IngredientsState) => (id: string): Ingredient =>
    state.ingredientsList.find(
      (ingredient: Ingredient) => ingredient._id === id
    ) || { name: "", units: [] },
};

const actions = {
  async getIngredients({
    commit,
  }: ActionContext<IngredientsState, RootState>): Promise<void> {
    try {
      const ingredients = await apiGetIngredients();
      commit("setIngredientsList", ingredients);
    } catch (error) {
      console.log(error.message);
    }
  },
  async postIngredient(
    { commit }: ActionContext<IngredientsState, RootState>,
    body: Ingredient
  ): Promise<void> {
    try {
      const ingredient = await apiPostIngredient(body);
      commit("addIngredient", ingredient);
    } catch (error) {
      console.log(error.message);
    }
  },
  async deleteIngredient(
    { commit }: ActionContext<IngredientsState, RootState>,
    id: string
  ): Promise<void> {
    try {
      await apiDeleteIngredient(id);
      commit("removeIngredient", id);
    } catch (error) {
      console.log(error.message);
    }
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
  removeIngredient(state: IngredientsState, id: string): void {
    state.ingredientsList = [
      ...state.ingredientsList.filter(
        (ingredient: Ingredient) => ingredient._id !== id
      ),
    ];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
