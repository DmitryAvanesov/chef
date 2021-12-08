<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Ингредиенты</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ingredient-cards-grid></ingredient-cards-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import IngredientCardsGrid from "@/components/ingredients/IngredientCardsGrid.vue";
import IngredientModal from "@/components/ingredients/IngredientModal.vue";
import { useRootStore } from "@/store";
import { IonPage, onIonViewWillEnter } from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Ingredients",
  components: {
    IngredientCardsGrid,
    IonPage,
  },
  setup() {
    const store = useRootStore();

    onIonViewWillEnter(() => {
      store.dispatch("ingredients/getIngredients");
      store.dispatch("units/getUnits");
    });

    return { IngredientModal };
  },
});
</script>
