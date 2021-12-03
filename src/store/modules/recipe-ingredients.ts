import { apiPostRecipeIngredient } from "@/api/recipe-ingredients";
import type {
  RecipeIngredient,
  RecipeIngredientsState,
} from "@/types/recipe-ingredients";
import type { RootState } from "@/types/root";
import type { ActionContext } from "vuex";

const state = (): RecipeIngredientsState => ({
  recipeIngredientsList: [],
});

const getters = {};

const actions = {
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
};

const mutations = {
  addRecipeIngredient(
    state: RecipeIngredientsState,
    recipeIngredient: RecipeIngredient
  ): void {
    state.recipeIngredientsList = [
      ...state.recipeIngredientsList,
      recipeIngredient,
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
