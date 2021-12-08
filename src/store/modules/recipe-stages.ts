import { apiDelete, apiPatch, apiPost } from "@/api";
import type {
  RecipeIngredientPayload,
  RecipeIngredientsState,
} from "@/types/recipe-ingredients";
import type {
  RecipeStagePayload,
  RecipeStagesState,
} from "@/types/recipe-stages";
import type { RootState } from "@/types/root";
import type { ActionContext } from "vuex";

const state = (): RecipeStagesState => ({
  route: "recipe-stages",
});

const getters = {};

const actions = {
  async postRecipeStage(
    { state, dispatch }: ActionContext<RecipeStagesState, RootState>,
    body: RecipeStagePayload
  ): Promise<void> {
    try {
      const recipeStage = await apiPost(state.route, body.recipeStage);

      await dispatch(
        "recipes/patchRecipe",
        {
          ...body.recipe,
          stages: [...body.recipe.stages, recipeStage],
        },
        { root: true }
      );
    } catch (error) {
      console.log(error.message);
    }
  },
  async patchRecipeIngredient(
    { state, dispatch }: ActionContext<RecipeIngredientsState, RootState>,
    payload: RecipeIngredientPayload
  ): Promise<void> {
    try {
      const newRecipeIngredient = await apiPatch(
        state.route,
        payload.recipeIngredient
      );

      await dispatch(
        "recipes/patchRecipe",
        {
          ...payload.recipe,
          ingredients: [
            ...payload.recipe.ingredients.filter(
              (recipeIngredient) =>
                recipeIngredient._id !== newRecipeIngredient._id
            ),
            newRecipeIngredient,
          ],
        },
        { root: true }
      );
    } catch (error) {
      console.log(error.message);
    }
  },
  async deleteRecipeIngredient(
    { state, dispatch }: ActionContext<RecipeIngredientsState, RootState>,
    payload: RecipeIngredientPayload
  ): Promise<void> {
    try {
      await apiDelete(state.route, payload.recipeIngredient._id);

      await dispatch(
        "recipes/patchRecipe",
        {
          ...payload.recipe,
          ingredients: payload.recipe.ingredients.filter(
            (recipeIngredient) =>
              recipeIngredient._id !== payload.recipeIngredient._id
          ),
        },
        { root: true }
      );
    } catch (error) {
      console.log(error.message);
    }
  },
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
