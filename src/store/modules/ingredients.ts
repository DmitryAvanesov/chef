import {
  apiDeleteIngredient,
  apiGetIngredients,
  apiPatchIngredient,
  apiPostIngredient,
} from "@/api/ingredients";
import type {
  Ingredient,
  IngredientsState,
  IngredientPayload,
} from "@/types/ingredients";
import type { RootState } from "@/types/root";
import type { ActionContext } from "vuex";

const state = (): IngredientsState => ({
  ingredientsList: [],
});

const getters = {
  ingredientById: (state: IngredientsState) => (id: string): Ingredient =>
    state.ingredientsList.find(
      (ingredient: Ingredient) => ingredient._id === id
    ) || { _id: "", name: "", units: [] },
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
  async patchIngredient(
    { commit }: ActionContext<IngredientsState, RootState>,
    payload: IngredientPayload
  ): Promise<void> {
    try {
      const ingredient = await apiPatchIngredient(payload);
      commit("updateIngredient", ingredient);
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
  updateIngredient(state: IngredientsState, payload: Ingredient): void {
    state.ingredientsList = [
      ...state.ingredientsList.filter(
        (ingredient: Ingredient) => ingredient._id !== payload._id
      ),
      payload,
    ];
  },
  removeIngredient(state: IngredientsState, id: string): void {
    state.ingredientsList = [
      ...state.ingredientsList.filter(
        (ingredient: Ingredient) => ingredient._id !== id
      ),
    ];
  },
  sortIngredients(state: IngredientsState): void {
    state.ingredientsList.sort((a: Ingredient, b: Ingredient) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    );
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
