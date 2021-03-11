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
            <add-ingredient-button @click="openModal"></add-ingredient-button>
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
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonModal,
  modalController,
} from "@ionic/vue";
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
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonModal,
  },
  setup() {
    const store = useRootStore();
    const ingredientsList = computed(
      () => store.state.ingredients.ingredientsList
    );

    const openModal = async () => {
      const modal = await modalController.create({
        component: AddIngredientModal,
      });

      return modal.present();
    };

    store.dispatch("ingredients/getIngredients");

    return { ingredientsList, openModal };
  },
});
</script>

<style lang="scss" scoped>
.ingredients-grid {
  padding: 5% 10%;
}
</style>
