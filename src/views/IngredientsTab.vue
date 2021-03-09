<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Ингредиенты</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col
            size-xs="2"
            v-for="(ingredient, index) in ingredientsList"
            :key="ingredient.name"
          >
            <ingredient-card :index="index"></ingredient-card>
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
import { mapState } from "vuex";
import IngredientCard from "@/components/ingredient-card/IngredientCard.vue";
import { useRootStore } from "@/store";
import { computed } from "@vue/runtime-core";
import { ref } from "vue";

export default {
  name: "IngredientsTab",
  components: {
    IngredientCard,
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

    store.dispatch("ingredients/getIngredientsList");

    return { ingredientsList };
  },
};
</script>
