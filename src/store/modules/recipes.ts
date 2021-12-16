import { apiDelete, apiGet, apiPatch, apiPost } from "@/api";
import type { IngredientsState } from "@/types/ingredients";
import type { Recipe, RecipesState } from "@/types/recipes";
import type { RootState } from "@/types/root";
import type { ActionContext } from "vuex";
import { ApiQuery } from "@/types/api";

const state = (): RecipesState => ({
  route: "recipes",
  recipesList: null,
});

const getters = {
  recipeById: (state: RecipesState) => (id: string): Recipe =>
    state.recipesList?.find((recipe: Recipe) => recipe._id === id) || {
      _id: "",
      name: "",
      ingredients: null,
      stages: null,
      image: "",
    },
};

const actions = {
  async getRecipes(
    { state, commit }: ActionContext<RecipesState, RootState>,
    query: ApiQuery = {}
  ): Promise<void> {
    try {
      const recipes = await apiGet(state.route, query);
      commit("setRecipesList", recipes);
    } catch (error) {
      console.log(error);
    }
  },
  async postRecipe(
    { state, commit }: ActionContext<RecipesState, RootState>,
    body: Recipe
  ): Promise<void> {
    try {
      const recipe = await apiPost(state.route, body);
      commit("addRecipe", recipe);
    } catch (error) {
      console.log(error);
    }
  },
  async patchRecipe(
    { state, commit }: ActionContext<RecipesState, RootState>,
    payload: Recipe
  ): Promise<void> {
    try {
      const recipe = await apiPatch(state.route, payload);
      commit("updateRecipe", recipe);
    } catch (error) {
      console.log(error);
    }
  },
  async deleteRecipe(
    { state, commit }: ActionContext<IngredientsState, RootState>,
    id: string
  ): Promise<void> {
    try {
      await apiDelete(state.route, id);
      commit("removeRecipe", id);
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  setRecipesList(state: RecipesState, recipesList: Recipe[]): void {
    state.recipesList = recipesList;
  },
  addRecipe(state: RecipesState, recipe: Recipe): void {
    state.recipesList = [...(state.recipesList || []), recipe];
  },
  updateRecipe(state: RecipesState, payload: Recipe): void {
    state.recipesList = [
      ...(state.recipesList?.filter((recipe) => recipe._id !== payload._id) ||
        []),
      payload,
    ];
  },
  removeRecipe(state: RecipesState, id: string): void {
    state.recipesList = [
      ...(state.recipesList?.filter((recipe) => recipe._id !== id) || []),
    ];
  },
  sortRecipes(state: RecipesState): void {
    state.recipesList?.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    );

    for (const recipe of state.recipesList || []) {
      recipe.ingredients?.sort((a, b) =>
        a.ingredient.name > b.ingredient.name
          ? 1
          : a.ingredient.name < b.ingredient.name
          ? -1
          : 0
      );
      recipe.stages?.sort((a, b) =>
        a.number > b.number ? 1 : a.number < b.number ? -1 : 0
      );
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
