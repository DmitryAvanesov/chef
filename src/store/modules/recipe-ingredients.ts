import { apiDelete, apiGet, apiPatch, apiPost } from "@/api";
import type {
  RecipeIngredient,
  RecipeIngredientsState,
} from "@/types/recipe-ingredients";
import type { RootState } from "@/types/root";
import type { ActionContext } from "vuex";

const state = (): RecipeIngredientsState => ({
  route: "recipe-ingredients",
  recipeIngredientsList: [],
});

const getters = {};

const actions = {
  async getRecipeIngredients({
    state,
    commit,
  }: ActionContext<RecipeIngredientsState, RootState>): Promise<void> {
    try {
      const recipeIngredients = await apiGet(state.route);
      commit("setRecipeIngredientsList", recipeIngredients);
    } catch (error) {
      console.log(error.message);
    }
  },
  async postRecipeIngredient(
    { state, commit }: ActionContext<RecipeIngredientsState, RootState>,
    body: RecipeIngredient
  ): Promise<void> {
    try {
      const recipeIngredient = await apiPost(state.route, body);
      commit("addRecipeIngredient", recipeIngredient);
    } catch (error) {
      console.log(error.message);
    }
  },
  async patchRecipeIngredient(
    { state, commit }: ActionContext<RecipeIngredientsState, RootState>,
    payload: RecipeIngredient
  ): Promise<void> {
    try {
      const recipeIngredient = await apiPatch(state.route, payload);
      commit("updateRecipeIngredient", recipeIngredient);
    } catch (error) {
      console.log(error.message);
    }
  },
  async deleteRecipeIngredient(
    { state, commit }: ActionContext<RecipeIngredientsState, RootState>,
    id: string
  ): Promise<void> {
    try {
      await apiDelete(state.route, id);
      commit("removeRecipeIngredient", id);
    } catch (error) {
      console.log(error.message);
    }
  },
};

const mutations = {
  setRecipeIngredientsList(
    state: RecipeIngredientsState,
    ingredientsList: RecipeIngredient[]
  ): void {
    state.recipeIngredientsList = ingredientsList;
  },
  addRecipeIngredient(
    state: RecipeIngredientsState,
    recipeIngredient: RecipeIngredient
  ): void {
    state.recipeIngredientsList = [
      ...state.recipeIngredientsList,
      recipeIngredient,
    ];
  },
  updateRecipeIngredient(
    state: RecipeIngredientsState,
    payload: RecipeIngredient
  ): void {
    state.recipeIngredientsList = [
      ...state.recipeIngredientsList.filter(
        (recipeIngredient: RecipeIngredient) =>
          recipeIngredient._id !== payload._id
      ),
      payload,
    ];
  },
  removeRecipeIngredient(state: RecipeIngredientsState, id: string): void {
    state.recipeIngredientsList = [
      ...state.recipeIngredientsList.filter(
        (recipeIngredient: RecipeIngredient) => recipeIngredient._id !== id
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
