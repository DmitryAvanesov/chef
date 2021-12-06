import { apiDelete, apiGet, apiPatch, apiPost } from "@/api";
import type { RootState } from "@/types/root";
import type { Unit, UnitsState } from "@/types/units";
import type { ActionContext } from "vuex";

const state = (): UnitsState => ({
  route: "units",
  unitsList: [],
});

const getters = {};

const actions = {
  async getUnits({
    state,
    commit,
  }: ActionContext<UnitsState, RootState>): Promise<void> {
    try {
      const units = await apiGet(state.route);
      commit("setUnitsList", units);
    } catch (error) {
      console.log(error.message);
    }
  },
  async postUnit(
    { state, commit }: ActionContext<UnitsState, RootState>,
    body: Unit
  ): Promise<void> {
    try {
      const unit = await apiPost(state.route, body);
      commit("addUnit", unit);
    } catch (error) {
      console.log(error.message);
    }
  },
  async patchUnit(
    { state, commit }: ActionContext<UnitsState, RootState>,
    body: Unit
  ): Promise<void> {
    try {
      console.log(body);
      const unit = await apiPatch(state.route, body);
      commit("updateUnit", unit);
    } catch (error) {
      console.log(error.message);
    }
  },
  async deleteUnit(
    { state, commit }: ActionContext<UnitsState, RootState>,
    id: string
  ): Promise<void> {
    try {
      await apiDelete(state.route, id);
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
  updateUnit(state: UnitsState, payload: Unit): void {
    state.unitsList = [
      ...state.unitsList.filter((unit: Unit) => unit._id !== payload._id),
      payload,
    ];
  },
  removeUnit(state: UnitsState, id: string): void {
    state.unitsList = [
      ...state.unitsList.filter((unit: Unit) => unit._id !== id),
    ];
  },
  sortUnits(state: UnitsState): void {
    state.unitsList.sort((a: Unit, b: Unit) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    );
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
