<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ recipe.name }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <router-link to="/recipes">
        <ion-button
          class="back-button"
          color="primary"
          title="Назад к рецептам"
        >
          <ion-icon :icon="arrowBack"></ion-icon>
        </ion-button>
      </router-link>
      <recipe-ingredients-list :recipe="recipe"></recipe-ingredients-list>
      <recipe-stages-list :recipe="recipe"></recipe-stages-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import RecipeIngredientsList from "@/components/recipes/RecipeIngredientsList.vue";
import RecipeStagesList from "@/components/recipes/RecipeStagesList.vue";
import { useRootStore } from "@/store";
import type { Recipe } from "@/types/recipes";
import { IonIcon, IonPage, onIonViewWillEnter } from "@ionic/vue";
import type { ComputedRef } from "@vue/runtime-core";
import { computed, defineComponent } from "@vue/runtime-core";
import { arrowBack } from "ionicons/icons";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Recipe",
  components: {
    RecipeStagesList,
    RecipeIngredientsList,
    IonPage,
    IonIcon,
  },
  setup() {
    const store = useRootStore();
    const route = useRoute();
    console.log(route);
    const recipe: ComputedRef<Recipe> = computed(() =>
      store.getters["recipes/recipeById"](route.params.id)
    );

    onIonViewWillEnter(() => {
      store.dispatch("recipes/getRecipes");
      store.dispatch("ingredients/getIngredients");
      store.dispatch("units/getUnits");
    });

    return { recipe, arrowBack };
  },
});
</script>

<style lang="scss" scoped>
.back-button {
  margin: 20px 0 0 20px;
}
</style>
