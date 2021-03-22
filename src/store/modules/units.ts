import { apiDeleteUnit, apiGetUnits, apiPostUnit } from "@/api/units";
import type { RootState } from "@/types/root";
import type { Unit, UnitsState } from "@/types/units";
import type { ActionContext } from "vuex";

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
  async deleteUnit(
    { commit }: ActionContext<UnitsState, RootState>,
    id: string
  ): Promise<void> {
    try {
      await apiDeleteUnit(id);
      commit("removeUnit", id);
    } catch (error) {
      console.log(error.message);
    }
  },
};

const mutations = {
  setUnitsList(state: UnitsState, unitsList: Unit[]): void {
    state.unitsList = unitsList;
  },
  addUnit(state: UnitsState, unit: Unit): void {
    state.unitsList = [...state.unitsList, unit];
  },
  removeUnit(state: UnitsState, id: string): void {
    state.unitsList = [
      ...state.unitsList.filter((unit: Unit) => unit._id !== id),
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
