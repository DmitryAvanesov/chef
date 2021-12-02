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
      <ion-input
        class="quantity-input"
        type="number"
        :value="data.quantity"
        @ionInput="updateQuantity($event.target.value)"
      ></ion-input>
      <ion-select
        class="unit-select"
        placeholder="Единица измерения"
        cancel-text="Отмена"
        ok-text="ОК"
        :value="data.unit._id"
        @ionChange="updateUnit($event.target.value)"
      >
        <ion-select-option
          v-for="unit in unitsList"
          :key="unit._id"
          :value="unit._id"
        >
          {{ unit.name }}
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
import type { Unit } from "@/types/units";
import { IonSelect, IonSelectOption } from "@ionic/vue";
import type { ComputedRef } from "@vue/runtime-core";
import { computed, defineComponent } from "@vue/runtime-core";
import type { Ref } from "vue";
import { ref, watch } from "vue";

export default defineComponent({
  name: "AddRecipeIngredient",
  components: { ConfirmButton, IonSelect, IonSelectOption },
  setup() {
    const idd = ref("");
    const store = useRootStore();
    const stubIngredient = { _id: "", name: "", units: [], image: "" };
    const stubUnit = { _id: "", name: "" };
    const data: Ref<RecipeIngredient> = ref({
      _id: "",
      ingredient: stubIngredient,
      unit: stubUnit,
      quantity: 0,
    });
    const ingredientsList: ComputedRef<Ingredient[]> = computed(
      () => store.state.ingredients.ingredientsList
    );
    let unitsList: ComputedRef<Unit[]> | null = computed(() =>
      store.state.units.unitsList.filter((unit) =>
        data.value.ingredient.units
          .map((ingredientUnit) => ingredientUnit._id)
          .includes(unit._id)
      )
    );

    const updateIngredient = (ingredientId: string): void => {
      data.value.ingredient =
        ingredientsList.value.find(
          (ingredient) => ingredient._id === ingredientId
        ) || stubIngredient;
    };

    const updateQuantity = (quantity: string): void => {
      console.log(unitsList);
      data.value.quantity = parseInt(quantity, 10);
    };

    const updateUnit = (unitId: string): void => {
      console.log(unitsList);
      data.value.unit = stubUnit;
      unitsList = null;
    };

    return {
      data,
      ingredientsList,
      unitsList,
      updateIngredient,
      updateQuantity,
      updateUnit,
      idd,
    };
  },
});
</script>

<style lang="scss" scoped>
.add-item {
  .quantity-input {
    max-width: 100px;
    text-align: right;
    margin-right: 8px;
  }

  .unit-select {
    margin-right: auto;
  }
}
</style>
