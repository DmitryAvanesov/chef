<template>
  <ion-content>
    <ion-item>
      <ion-label position="floating">Название</ion-label>
      <ion-input v-model="data.name"></ion-input>
    </ion-item>
    <div>
      <ion-button>Добавить</ion-button>
      <ion-button color="light">Отмена</ion-button>
    </div>
  </ion-content>
</template>

<script lang="ts">
import { useRootStore } from "@/store";
import { Ingredient } from "@/types/ingredients";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "AddIngredientModal",
  setup() {
    const store = useRootStore();
    const data: Ingredient = {
      name: "",
      units: [],
    };

    const addIngredient = () => {
      store.dispatch("ingredients/postIngredient", data);
    };

    return { store };
  },
});
</script>

<style lang="scss" scoped></style>
