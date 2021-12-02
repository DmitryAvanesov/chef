<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Рецепты</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <recipes-list></recipes-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import RecipesList from "@/components/recipes/RecipesList.vue";
import { useRootStore } from "@/store";
import { IonPage, onIonViewWillEnter } from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Recipes",
  components: {
    RecipesList,
    IonPage,
  },
  setup() {
    const store = useRootStore();

    onIonViewWillEnter(() => {
      store.dispatch("recipes/getRecipes");
    });
  },
});
</script>
