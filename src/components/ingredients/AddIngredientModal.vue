<template>
  <ion-content>
    <v-form>
      <ion-item>
        <ion-label position="floating">Название</ion-label>
        <ion-input
          :value="data.name"
          @ionInput="updateName($event.target.value)"
        ></ion-input>
      </ion-item>
      <div>
        <ion-button @click="addIngredient()">Добавить</ion-button>
        <ion-button color="light" @click="dismiss()">Отмена</ion-button>
      </div>
    </v-form>
  </ion-content>
</template>

<script lang="ts">
import { useRootStore } from "@/store";
import { Ingredient } from "@/types/ingredients";
import { defineComponent, Ref, ref } from "@vue/runtime-core";
import { modalController } from "@ionic/vue";

export default defineComponent({
  name: "AddIngredientModal",
  setup() {
    const store = useRootStore();
    const data: Ref<Ingredient> = ref({
      name: "",
      units: [],
    });

    const updateName = (name: string): void => {
      data.value.name = name;
    };

    const addIngredient = (): void => {
      store.dispatch("ingredients/postIngredient", data.value);
      dismiss();
    };

    const dismiss = (): void => {
      modalController.dismiss();
    };

    return { store, data, updateName, addIngredient, dismiss };
  },
});
</script>

<style lang="scss" scoped></style>
