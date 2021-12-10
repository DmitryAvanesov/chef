import { apiDelete, apiPatch, apiPost } from "@/api";
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
      console.log(error);
    }
  },
  async patchRecipeStage(
    { state, dispatch }: ActionContext<RecipeStagesState, RootState>,
    payload: RecipeStagePayload
  ): Promise<void> {
    try {
      const newRecipeStage = await apiPatch(state.route, payload.recipeStage);

      await dispatch(
        "recipes/patchRecipe",
        {
          ...payload.recipe,
          stages: [
            ...payload.recipe.stages.filter(
              (recipeStage) => recipeStage._id !== newRecipeStage._id
            ),
            newRecipeStage,
          ],
        },
        { root: true }
      );
    } catch (error) {
      console.log(error);
    }
  },
  async deleteRecipeStage(
    { state, dispatch }: ActionContext<RecipeStagesState, RootState>,
    payload: RecipeStagePayload
  ): Promise<void> {
    try {
      await apiDelete(state.route, payload.recipeStage._id);

      await dispatch(
        "recipes/patchRecipe",
        {
          ...payload.recipe,
          ingredients: payload.recipe.ingredients.filter(
            (recipeIngredient) =>
              recipeIngredient._id !== payload.recipeStage._id
          ),
        },
        { root: true }
      );
    } catch (error) {
      console.log(error);
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
