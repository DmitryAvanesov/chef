import { apiGetUnits } from "@/api/units";
import { RootState } from "@/types/root";
import { Unit, UnitsState } from "@/types/units";
import { ActionContext } from "vuex";

const state = (): UnitsState => ({
  unitsList: [],
});

const getters = {};

const actions = {
  async getUnits({
    commit,
  }: ActionContext<UnitsState, RootState>): Promise<void> {
    try {
      const units = await apiGetUnits();
      commit("setUnitsList", units);
    } catch (e) {
      console.log(e.message);
    }
  },
};

const mutations = {
  setUnitsList(state: UnitsState, unitsList: Unit[]): void {
    state.unitsList = unitsList;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
