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
            v-for="(ingredient, index) in ingredientsList"
            :key="ingredient.name"
            size-xs="12"
            size-sm="6"
            size-md="4"
            size-lg="3"
            size-xl="2"
          >
            <ingredient-card :index="index"></ingredient-card>
          </ion-col>
          <ion-col size-xs="12" size-sm="6" size-md="4" size-lg="3" size-xl="2">
            <add-ingredient-card></add-ingredient-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import IngredientCard from "@/components/ingredients/IngredientCard.vue";
import AddIngredientCard from "@/components/ingredients/AddIngredientCard.vue";
import { useRootStore } from "@/store";
import { computed } from "@vue/runtime-core";

export default {
  name: "IngredientsTab",
  components: {
    IngredientCard,
    AddIngredientCard,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
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
};
</script>

<style lang="scss" scoped>
.ingredients-grid {
  padding: 5% 10%;
}
</style>
