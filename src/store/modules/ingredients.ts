import { Ingredient, IngredientsState } from "@/types/ingredients";
import {
  apiDeleteIngredient,
  apiGetIngredients,
  apiPostIngredient,
} from "@/api/ingredients";
import { ActionContext } from "vuex";
import { RootState } from "@/types/root";

const state = (): IngredientsState => ({
  ingredientsList: [],
});

const getters = {
  ingredientByIndex: (state: IngredientsState) => (index: number): Ingredient =>
    state.ingredientsList[index],
};

const actions = {
  async getIngredients({
    commit,
  }: ActionContext<IngredientsState, RootState>): Promise<void> {
    try {
      const ingredients = await apiGetIngredients();
      commit("setIngredientsList", ingredients);
    } catch (e) {
      console.log(e.message);
    }
  },
  async postIngredient(
    { commit }: ActionContext<IngredientsState, RootState>,
    body: Ingredient
  ): Promise<void> {
    try {
      const ingredient = await apiPostIngredient(body);
      commit("addIngredient", ingredient);
    } catch (e) {
      console.log(e.message);
    }
  },
  async deleteIngredient(
    { commit }: ActionContext<IngredientsState, RootState>,
    id: string
  ): Promise<void> {
    try {
      await apiDeleteIngredient(id);
      commit("removeIngredient", id);
    } catch (e) {
      console.log(e.message);
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
  removeIngredient(state: IngredientsState, id: string): void {
    state.ingredientsList = [
      ...state.ingredientsList.filter(
        (ingredient: Ingredient) => ingredient._id !== id
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
