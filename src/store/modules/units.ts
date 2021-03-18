import { apiGetUnits, apiPostUnit } from "@/api/units";
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
    } catch (error) {
      console.log(error.message);
    }
  },
  async postUnit(
    { commit }: ActionContext<UnitsState, RootState>,
    body: Unit
  ): Promise<void> {
    try {
      const unit = await apiPostUnit(body);
      commit("addUnit", unit);
    } catch (error) {
      console.log(error.message);
    }
  },
};

const mutations = {
  setUnitsList(state: UnitsState, unitsList: Unit[]): void {
    state.unitsList = unitsList;
  },
  addUnit(state: UnitsState, unit: Unit) {
    state.unitsList = [...state.unitsList, unit];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
