<template>
  <ion-grid class="ingredients-grid">
    <ion-row>
      <ion-col
        class="ingredients-cell"
        v-for="ingredient in ingredientsList"
        :key="ingredient?._id"
        size-xs="12"
        size-sm="6"
        size-md="4"
        size-lg="3"
        size-xl="2"
      >
        <ingredient-card :id="ingredient?._id"></ingredient-card>
      </ion-col>
    </ion-row>
  </ion-grid>
  <div class="add-button-container">
    <add-button
      name="ингредиент"
      :modal-component="IngredientModal"
      :modal-component-props="{ callback: postIngredient }"
    ></add-button>
  </div>
</template>

<script lang="ts">
import IngredientCard from "@/components/ingredients/IngredientCard.vue";
import IngredientModal from "@/components/ingredients/IngredientModal.vue";
import AddButton from "@/components/shared/AddButton.vue";
import { useRootStore } from "@/store";
import type { Ingredient } from "@/types/ingredients";
import { IonCol, IonRow } from "@ionic/vue";
import { computed, defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "IngredientCardsGrid",
  components: { AddButton, IngredientCard, IonRow, IonCol },
  setup() {
    const store = useRootStore();
    const ingredientsList = computed(
      () => store.state.ingredients.ingredientsList
    );

    const postIngredient = (ingredient: Ingredient) => {
      store.dispatch("ingredients/postIngredient", ingredient);
    };

    return { IngredientModal, ingredientsList, postIngredient };
  },
});
</script>

<style lang="scss" scoped>
.ingredients-grid {
  padding: 5%;

  .ingredients-cell {
    padding: 12px;
  }
}

.add-button-container {
  position: fixed;
  bottom: 4px;
  right: 12px;
}
</style>
