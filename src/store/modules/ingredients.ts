import { Ingredient, IngredientsState } from "@/types/ingredients";
import { getIngredients } from "@/api/ingredients";

const state = (): IngredientsState => ({
  all: []
});

const getters = {};

const actions = {
  getAllIngredients({ commit }: { commit: any }): void {
    getIngredients().then((a: Ingredient[]) => {
      commit("setAllIngredients", a);
    });
  }
};

const mutations = {
  setAllIngredients(state: any, payload: any): void {
    state.all = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
