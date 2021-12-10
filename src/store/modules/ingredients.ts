import { apiDelete, apiGet, apiPatch, apiPost } from "@/api";
import type { Ingredient, IngredientsState } from "@/types/ingredients";
import type { RootState } from "@/types/root";
import type { ActionContext } from "vuex";

const state = (): IngredientsState => ({
  route: "ingredients",
  ingredientsList: [],
});

const getters = {
  ingredientById: (state: IngredientsState) => (id: string): Ingredient =>
    state.ingredientsList.find(
      (ingredient: Ingredient) => ingredient._id === id
    ) || { _id: "", name: "", units: [], image: "" },
};

const actions = {
  async getIngredients({
    state,
    commit,
  }: ActionContext<IngredientsState, RootState>): Promise<void> {
    try {
      const ingredients = await apiGet(state.route);
      commit("setIngredientsList", ingredients);
    } catch (error) {
      console.log(error);
    }
  },
  async postIngredient(
    { state, commit }: ActionContext<IngredientsState, RootState>,
    body: Ingredient
  ): Promise<void> {
    try {
      const ingredient = await apiPost(state.route, body);
      commit("addIngredient", ingredient);
    } catch (error) {
      console.log(error);
    }
  },
  async patchIngredient(
    { state, commit }: ActionContext<IngredientsState, RootState>,
    payload: Ingredient
  ): Promise<void> {
    try {
      const ingredient = await apiPatch(state.route, payload);
      commit("updateIngredient", ingredient);
    } catch (error) {
      console.log(error);
    }
  },
  async deleteIngredient(
    { state, commit }: ActionContext<IngredientsState, RootState>,
    id: string
  ): Promise<void> {
    try {
      await apiDelete(state.route, id);
      commit("removeIngredient", id);
    } catch (error) {
      console.log(error);
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
