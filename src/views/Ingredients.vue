<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Ингредиенты</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content">
      <ion-grid class="ingredients-grid">
        <ion-row>
          <ion-col
            v-for="ingredient in ingredientsList"
            :key="ingredient._id"
            size-xs="12"
            size-sm="6"
            size-md="4"
            size-lg="3"
            size-xl="2"
          >
            <ingredient-card :id="ingredient._id"></ingredient-card>
          </ion-col>
          <ion-col size-xs="12" size-sm="6" size-md="4" size-lg="3" size-xl="2">
            <add-ingredient-button></add-ingredient-button>
            <ion-modal :is-open="isOpenRef">
              <add-ingredient-modal></add-ingredient-modal>
            </ion-modal>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage } from "@ionic/vue";
import IngredientCard from "@/components/ingredients/IngredientCard.vue";
import AddIngredientButton from "@/components/ingredients/AddIngredientButton.vue";
import AddIngredientModal from "@/components/ingredients/AddIngredientModal.vue";
import { useRootStore } from "@/store";
import { computed, defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Ingredients",
  components: {
    IngredientCard,
    AddIngredientButton,
    AddIngredientModal,
    IonPage,
  },
  setup() {
    const store = useRootStore();
    const ingredientsList = computed(
      () => store.state.ingredients.ingredientsList
    );

    store.dispatch("ingredients/getIngredients");

    return { ingredientsList };
  },
});
</script>

<style lang="scss" scoped>
.ingredients-grid {
  padding: 5% 10%;
}
</style>
