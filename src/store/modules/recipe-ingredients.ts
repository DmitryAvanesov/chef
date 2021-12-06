import {
  apiDeleteRecipeIngredient,
  apiGetRecipeIngredients,
  apiPatchRecipeIngredient,
  apiPostRecipeIngredient,
} from "@/api/recipe-ingredients";
import type {
  RecipeIngredient,
  RecipeIngredientsState,
} from "@/types/recipe-ingredients";
import type { RootState } from "@/types/root";
import type { ActionContext } from "vuex";
import { Ingredient, IngredientsState } from "@/types/ingredients";
import { apiDeleteIngredient } from "@/api/ingredients";

const state = (): RecipeIngredientsState => ({
  recipeIngredientsList: [],
});

const getters = {};

const actions = {
  async getRecipeIngredients({
    commit,
  }: ActionContext<RecipeIngredientsState, RootState>): Promise<void> {
    try {
      const recipeIngredients = await apiGetRecipeIngredients();
      commit("setRecipeIngredientsList", recipeIngredients);
    } catch (error) {
      console.log(error.message);
    }
  },
  async postRecipeIngredient(
    { commit }: ActionContext<RecipeIngredientsState, RootState>,
    body: RecipeIngredient
  ): Promise<void> {
    try {
      const recipeIngredient = await apiPostRecipeIngredient(body);
      commit("addRecipeIngredient", recipeIngredient);
    } catch (error) {
      console.log(error.message);
    }
  },
  async patchRecipeIngredient(
    { commit }: ActionContext<RecipeIngredientsState, RootState>,
    payload: RecipeIngredient
  ): Promise<void> {
    try {
      const recipeIngredient = await apiPatchRecipeIngredient(payload);
      commit("updateRecipeIngredient", recipeIngredient);
    } catch (error) {
      console.log(error.message);
    }
  },
  async deleteRecipeIngredient(
    { commit }: ActionContext<RecipeIngredientsState, RootState>,
    id: string
  ): Promise<void> {
    try {
      await apiDeleteRecipeIngredient(id);
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
