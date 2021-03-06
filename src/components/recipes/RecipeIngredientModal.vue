<template>
  <ion-content>
    <div class="form">
      <ion-item>
        <ion-label>Ингредиент</ion-label>
        <ion-select
          class="ingredient-select"
          placeholder="Выберите ингредиент"
          cancel-text="Отмена"
          ok-text="ОК"
          interface="popover"
          :value="data.ingredient._id"
          :disabled="$props.recipeIngredient"
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
      </ion-item>
      <div class="units-block" v-if="data.ingredient._id">
        <ion-item>
          <ion-label>Количество</ion-label>
          <ion-input
            class="quantity-input"
            type="number"
            :step="quantityMin"
            :min="quantityMin"
            :max="quantityMax"
            placeholder="Введите количество"
            :value="data.quantity || ''"
            @ionInput="updateQuantity($event.target.value)"
          ></ion-input>
        </ion-item>
        <ion-radio-group
          class="units-radio-group"
          :value="data.unit._id"
          @ionChange="updateUnit($event.target.value)"
        >
          <ion-list-header>
            <ion-label class="units-label">Единицы измерения</ion-label>
          </ion-list-header>
          <ion-item v-for="unit in unitsList" :key="unit._id">
            <ion-label>{{ unit.name }}</ion-label>
            <ion-radio slot="start" :value="unit._id"></ion-radio>
          </ion-item>
        </ion-radio-group>
      </div>
      <modal-buttons
        :data="data"
        :callback="$props.callback"
        :disabled="
          !data.ingredient._id ||
          !data.unit._id ||
          !data.quantity ||
          data.quantity < quantityMin ||
          data.quantity > quantityMax
        "
      ></modal-buttons>
    </div>
  </ion-content>
</template>

<script lang="ts">
import ModalButtons from "@/components/shared/ModalButtons.vue";
import { useRootStore } from "@/store";
import type { Ingredient } from "@/types/ingredients";
import type { RecipeIngredient } from "@/types/recipe-ingredients";
import type { Unit } from "@/types/units";
import {
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import type { ComputedRef } from "@vue/runtime-core";
import { computed, defineComponent } from "@vue/runtime-core";
import type { Ref } from "vue";
import { ref } from "vue";

export default defineComponent({
  name: "RecipeIngredientModal",
  components: {
    ModalButtons,
    IonSelect,
    IonSelectOption,
    IonRadio,
    IonRadioGroup,
  },
  props: ["recipeIngredient", "recipe", "callback"],
  setup(props) {
    const store = useRootStore();
    const quantityMin = 0.05;
    const quantityMax = 1000;
    const stubIngredient = { _id: "", name: "", units: [], image: "" };
    const stubUnit = { _id: "", name: "" };
    const data: Ref<RecipeIngredient> = ref({
      ...(props.recipeIngredient || {
        _id: "",
        ingredient: stubIngredient,
        unit: stubUnit,
        quantity: 0,
      }),
    });
    const ingredientsList: ComputedRef<Ingredient[]> = computed(() => [
      ...store.state.ingredients.ingredientsList.filter((ingredient) =>
        props.recipeIngredient
          ? ingredient._id === props.recipeIngredient.ingredient._id
          : !props.recipe.ingredients
              .map(
                (recipeIngredient: RecipeIngredient) =>
                  recipeIngredient.ingredient._id
              )
              .includes(ingredient._id)
      ),
    ]);
    const unitsList: ComputedRef<Unit[]> = computed(() =>
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

      if (
        !unitsList.value.map((unit) => unit._id).includes(data.value.unit._id)
      ) {
        data.value.quantity = 0;
        data.value.unit = stubUnit;
      }
    };

    const updateQuantity = (quantity: string): void => {
      data.value.quantity = parseFloat(quantity);
    };

    const updateUnit = (unitId: string): void => {
      data.value.unit =
        unitsList.value.find((unit) => unit._id === unitId) || stubUnit;
    };

    return {
      data,
      quantityMin,
      quantityMax,
      ingredientsList,
      unitsList,
      updateIngredient,
      updateQuantity,
      updateUnit,
    };
  },
});
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 25px;

  .units-block {
    display: flex;
    flex-direction: column;

    .units-radio-group {
      margin-bottom: 32px;

      .units-label {
        font-size: 16px;
      }
    }
  }
}
</style>
