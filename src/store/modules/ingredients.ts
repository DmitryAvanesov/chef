import { Ingredient, IngredientsState } from "@/types/ingredients";
import { getIngredients } from "@/api/ingredients";
import { ActionContext } from "vuex";
import { RootState } from "@/types/root";

const state = (): IngredientsState => ({
  all: [],
});

const getters = {};

const actions = {
  async getAllIngredients({
    commit,
  }: ActionContext<IngredientsState, RootState>): Promise<void> {
    const ingredients = await getIngredients();
    commit("setAllIngredients", ingredients);
  },
};

const mutations = {
  setAllIngredients(state: IngredientsState, payload: Ingredient[]): void {
    state.all = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
