import { createStore, Store, useStore } from "vuex";
import ingredients from "@/store/modules/ingredients";
import { InjectionKey } from "vue";
import { RootState } from "@/types/root";

export const store = createStore<RootState>({
  modules: {
    ingredients,
  },
});

export const key: InjectionKey<Store<RootState>> = Symbol();

export function useRootStore() {
  return useStore(key);
}
