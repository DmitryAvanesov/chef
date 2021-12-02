<template>
  <v-form class="form">
    <ion-item class="add-item">
      <ion-select
        placeholder="Ингредиент"
        cancel-text="Отмена"
        ok-text="ОК"
        :value="data.ingredient._id"
        @ionChange="updateIngredient($event.target.value)"
      >
        <ion-select-option
          v-for="ingredient in ingredientsList"
          :key="ingredient._id"
          :value="ingredient._id"
        >
          {{ ingredient.name }}
        </ion-select-option>
      </ion-select>
      <confirm-button :data="data"></confirm-button>
    </ion-item>
  </v-form>
</template>

<script lang="ts">
import ConfirmButton from "@/components/units/ConfirmButton.vue";
import { useRootStore } from "@/store";
import type { Ingredient } from "@/types/ingredients";
import type { RecipeIngredient } from "@/types/recipes";
import { IonSelect, IonSelectOption } from "@ionic/vue";
import type { ComputedRef } from "@vue/runtime-core";
import { computed, defineComponent } from "@vue/runtime-core";
import type { Ref } from "vue";
import { ref } from "vue";

export default defineComponent({
  name: "AddRecipeIngredient",
  components: { ConfirmButton, IonSelect, IonSelectOption },
  setup() {
    const store = useRootStore();
    const stubIngredient = { _id: "", name: "", units: [], image: "" };
    const data: Ref<RecipeIngredient> = ref({
      _id: "",
      ingredient: stubIngredient,
      unit: { _id: "", name: "" },
      quantity: 0,
    });
    const ingredientsList: ComputedRef<Ingredient[]> = computed(
      () => store.state.ingredients.ingredientsList
    );

    const updateIngredient = (ingredientId: string): void => {
      data.value.ingredient =
        ingredientsList.value.find(
          (ingredient: Ingredient) => ingredient._id === ingredientId
        ) || stubIngredient;
    };
    //
    // const postUnit = (): void => {
    //   store.dispatch("units/postUnit", data.value);
    //   data.value.name = "";
    // };

    return { data, ingredientsList, updateIngredient };
  },
});
</script>

<style lang="scss" scoped>
.add-item {
}
</style>
