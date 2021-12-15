<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <recipe-toolbar-buttons></recipe-toolbar-buttons>
        <ion-title>{{ recipe.name }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <recipe-ingredients-list :recipe="recipe"></recipe-ingredients-list>
      <recipe-stages-list :recipe="recipe"></recipe-stages-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import RecipeIngredientsList from "@/components/recipes/RecipeIngredientsList.vue";
import RecipeStagesList from "@/components/recipes/RecipeStagesList.vue";
import RecipeToolbarButtons from "@/components/recipes/RecipeToolbarButtons.vue";
import { useRootStore } from "@/store";
import type { Recipe } from "@/types/recipes";
import { IonPage, onIonViewWillEnter } from "@ionic/vue";
import type { ComputedRef } from "@vue/runtime-core";
import { computed, defineComponent } from "@vue/runtime-core";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Recipe",
  components: {
    RecipeToolbarButtons,
    RecipeStagesList,
    RecipeIngredientsList,
    IonPage,
  },
  setup() {
    const store = useRootStore();
    const route = useRoute();
    const recipe: ComputedRef<Recipe> = computed(() =>
      store.getters["recipes/recipeById"](route.params.id)
    );

    onIonViewWillEnter(() => {
      store.dispatch("recipes/getRecipes");
      store.dispatch("ingredients/getIngredients");
      store.dispatch("units/getUnits");
    });

    return { recipe };
  },
});
</script>
