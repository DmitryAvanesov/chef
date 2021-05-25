import ingredients from "@/store/modules/ingredients";
import units from "@/store/modules/units";
import type { RootState } from "@/types/root";
import type { InjectionKey } from "vue";
import { createStore, useStore } from "vuex";
import type { Store } from "vuex";

const sortUnitsPlugin = (store: Store<RootState>) => {
  store.subscribe((mutation) => {
    if (
      mutation.type.startsWith("units") &&
      mutation.type !== "units/sortUnits"
    ) {
      store.commit("units/sortUnits");
    }
  });
};

export const store = createStore<RootState>({
  modules: {
    ingredients,
    units,
  },
  plugins: [sortUnitsPlugin],
});

export const key: InjectionKey<Store<RootState>> = Symbol();

export function useRootStore(): Store<RootState> {
  return useStore(key);
}
