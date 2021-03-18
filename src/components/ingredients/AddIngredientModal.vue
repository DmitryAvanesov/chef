<template>
  <ion-content>
    <v-form class="form">
      <ion-item>
        <ion-label position="floating">Название</ion-label>
        <ion-input
          :value="data.name"
          @ionInput="updateName($event.target.value)"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Единицы измерения</ion-label>
        <ion-select multiple placeholder="Выберите">
          <ion-select-option
            v-for="unit in unitsList"
            :key="unit._id"
            :value="unit._id"
            >{{ unit.name }}</ion-select-option
          >
        </ion-select>
      </ion-item>
      <div class="actions">
        <ion-button type="submit" @click="addIngredient()">Добавить</ion-button>
        <ion-button color="light" @click="dismiss()">Отмена</ion-button>
      </div>
    </v-form>
  </ion-content>
</template>

<script lang="ts">
import { useRootStore } from "@/store";
import { Ingredient } from "@/types/ingredients";
import { computed, defineComponent, Ref, ref } from "@vue/runtime-core";
import { modalController } from "@ionic/vue";

export default defineComponent({
  name: "AddIngredientModal",
  setup() {
    const store = useRootStore();
    const data: Ref<Ingredient> = ref({
      name: "",
      units: [],
    });
    const unitsList = computed(() => store.state.units.unitsList);

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

    return { store, data, unitsList, updateName, addIngredient, dismiss };
  },
});
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 25px;

  .actions {
    display: flex;
    justify-content: flex-end;
    margin-top: auto;

    ion-button {
      margin-left: 10px;
    }
  }
}
</style>
