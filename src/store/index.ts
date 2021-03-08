import { createStore } from "vuex";
import ingredients from "@/store/modules/ingredients";

export const store = createStore({
  modules: {
    ingredients
  }
});
