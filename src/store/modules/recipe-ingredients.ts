import { apiDelete, apiPatch, apiPost } from "@/api";
import type {
  RecipeIngredientPayload,
  RecipeIngredientsState,
} from "@/types/recipe-ingredients";
import type { RootState } from "@/types/root";
import type { ActionContext } from "vuex";

const state = (): RecipeIngredientsState => ({
  route: "recipe-ingredients",
});

const getters = {};

const actions = {
  async postRecipeIngredient(
    { state, dispatch }: ActionContext<RecipeIngredientsState, RootState>,
    body: RecipeIngredientPayload
  ): Promise<void> {
    try {
      const recipeIngredient = await apiPost(
        state.route,
        body.recipeIngredient
      );

      await dispatch(
        "recipes/patchRecipe",
        {
          ...body.recipe,
          ingredients: [...(body.recipe.ingredients || []), recipeIngredient],
        },
        { root: true }
      );
    } catch (error) {
      console.log(error);
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
            ...(payload.recipe.ingredients?.filter(
              (recipeIngredient) =>
                recipeIngredient._id !== newRecipeIngredient._id
            ) || []),
            newRecipeIngredient,
          ],
        },
        { root: true }
      );
    } catch (error) {
      console.log(error);
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
          ingredients:
            payload.recipe.ingredients?.filter(
              (recipeIngredient) =>
                recipeIngredient._id !== payload.recipeIngredient._id
            ) || [],
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
