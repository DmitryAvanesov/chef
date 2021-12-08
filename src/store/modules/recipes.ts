import { apiGet, apiPatch, apiPost } from "@/api";
import { Ingredient, IngredientsState } from "@/types/ingredients";
import type { Recipe, RecipesState } from "@/types/recipes";
import type { RootState } from "@/types/root";
import type { ActionContext } from "vuex";

const state = (): RecipesState => ({
  route: "recipes",
  recipesList: [],
});

const getters = {
  recipeById: (state: RecipesState) => (id: string): Recipe =>
    state.recipesList.find((recipe: Recipe) => recipe._id === id) || {
      _id: "",
      name: "",
      ingredients: [],
      stages: [],
    },
};

const actions = {
  async getRecipes({
    state,
    commit,
  }: ActionContext<RecipesState, RootState>): Promise<void> {
    try {
      const recipes = await apiGet(state.route);
      commit("setRecipesList", recipes);
    } catch (error) {
      console.log(error.message);
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
      console.log(error.message);
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
  sortRecipeLists(state: RecipesState): void {
    for (const recipe of state.recipesList) {
      recipe.ingredients.sort((a, b) =>
        a.ingredient.name > b.ingredient.name
          ? 1
          : a.ingredient.name < b.ingredient.name
          ? -1
          : 0
      );
    }
    for (const recipe of state.recipesList) {
      recipe.stages.sort((a, b) =>
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
