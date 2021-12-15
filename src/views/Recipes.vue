<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Рецепты</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <recipes-filters></recipes-filters>
      <recipes-list></recipes-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import RecipesFilters from "@/components/recipes/RecipesFilters.vue";
import RecipesList from "@/components/recipes/RecipesList.vue";
import { useRootStore } from "@/store";
import { IonPage, onIonViewWillEnter } from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Recipes",
  components: {
    RecipesFilters,
    RecipesList,
    IonPage,
  },
  setup() {
    const store = useRootStore();

    onIonViewWillEnter(() => {
      store.dispatch("recipes/getRecipes");
      store.dispatch("ingredients/getIngredients");
      store.dispatch("units/getUnits");
    });
  },
});
</script>
