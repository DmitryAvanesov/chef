<template>
  <ion-card class="card">
    <ingredient-action-button
      v-for="(actionButton, index) in actionButtons"
      class="action-button"
      :color="actionButton.color"
      :icon="actionButton.icon"
      :callback="actionButton.callback"
      :key="index"
      :style="{ marginRight: `${index * 36}px` }"
    ></ingredient-action-button>
    <ion-card-content
      class="content"
      :style="{
        backgroundImage:
          'url(https://kubnews.ru/upload/iblock/942/942f183419487ced865decdbda8efcab.jpg)',
      }"
    >
    </ion-card-content>
    <ion-card-header class="header">
      <ion-card-subtitle>
        <span v-for="(unit, index) in ingredient.units" :key="unit">
          <span v-if="index > 0"> &middot; </span>
          <span>{{ unit.name }}</span>
        </span>
      </ion-card-subtitle>
      <ion-card-title>{{ ingredient.name }}</ion-card-title>
    </ion-card-header>
  </ion-card>
</template>

<script lang="ts">
import { useRootStore } from "@/store";
import type { ActionButton, Ingredient } from "@/types/ingredients";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  isPlatform,
  modalController,
} from "@ionic/vue";
import type { ComputedRef } from "@vue/runtime-core";
import { computed, defineComponent } from "@vue/runtime-core";
import { create, close } from "ionicons/icons";

import IngredientActionButton from "./IngredientActionButton.vue";
import IngredientModal from "./IngredientModal.vue";

export default defineComponent({
  name: "IngredientCard",
  components: {
    IngredientActionButton,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
  },
  props: ["id"],
  setup(props) {
    const store = useRootStore();

    const ingredient: ComputedRef<Ingredient> = computed(() =>
      store.getters["ingredients/ingredientById"](props.id)
    );

    const patchIngredient = (ingredient: Ingredient): void => {
      store.dispatch("ingredients/patchIngredient", {
        id: props.id,
        ingredient: ingredient,
      });
    };

    const editIngredient = async (): Promise<void> => {
      const modal = await modalController.create({
        component: IngredientModal,
        componentProps: { ...ingredient.value, callback: patchIngredient },
        ...(isPlatform("desktop")
          ? { cssClass: "add-ingredient-modal-desktop" }
          : {}),
      });

      return modal.present();
    };

    const deleteIngredient = (): void => {
      store.dispatch("ingredients/deleteIngredient", ingredient.value._id);
    };

    const actionButtons: ActionButton[] = [
      { color: "danger", icon: close, callback: deleteIngredient },
      { color: "primary", icon: create, callback: editIngredient },
    ];

    return {
      editIngredient,
      deleteIngredient,
      ingredient,
      actionButtons,
      create,
      close,
    };
  },
});
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  height: 225px;

  .action-button {
    display: none;
  }

  &:hover {
    .action-button {
      display: block;
    }
  }

  .content {
    padding: 0;
    flex-grow: 10;
    background-size: cover;
    background-position: center;
    height: 100%;
  }

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
  }
}
</style>
