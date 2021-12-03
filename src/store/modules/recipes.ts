import { apiGetRecipes, apiPatchRecipe, apiPostRecipe } from "@/api/recipes";
import type { Recipe, RecipesState } from "@/types/recipes";
import type { RootState } from "@/types/root";
import type { ActionContext } from "vuex";

const state = (): RecipesState => ({
  recipesList: [],
});

const getters = {
  recipeById: (state: RecipesState) => (id: string): Recipe =>
    state.recipesList.find((recipe: Recipe) => recipe._id === id) || {
      _id: "",
      name: "",
      ingredients: [],
    },
};

const actions = {
  async getRecipes({
    commit,
  }: ActionContext<RecipesState, RootState>): Promise<void> {
    try {
      const recipes = await apiGetRecipes();
      commit("setRecipesList", recipes);
    } catch (error) {
      console.log(error.message);
    }
  },
  async postRecipe(
    { commit }: ActionContext<RecipesState, RootState>,
    body: Recipe
  ): Promise<void> {
    try {
      const recipe = await apiPostRecipe(body);
      commit("addRecipe", recipe);
    } catch (error) {
      console.log(error.message);
    }
  },
  async patchRecipe(
    { commit }: ActionContext<RecipesState, RootState>,
    payload: Recipe
  ): Promise<void> {
    try {
      const recipe = await apiPatchRecipe(payload);
      commit("updateRecipe", recipe);
    } catch (error) {
      console.log(error.message);
    }
  },
};

const mutations = {
  setRecipesList(state: RecipesState, recipesList: Recipe[]): void {
    state.recipesList = recipesList;
  },
  addRecipe(state: RecipesState, recipe: Recipe): void {
    state.recipesList = [...state.recipesList, recipe];
  },
  updateRecipe(state: RecipesState, payload: Recipe): void {
    state.recipesList = [
      ...state.recipesList.filter(
        (recipe: Recipe) => recipe._id !== payload._id
      ),
      payload,
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
