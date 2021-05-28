<template>
  <ion-fab
    class="add-ingredient-button"
    vertical="bottom"
    horizontal="end"
    @click="openModal()"
  >
    <ion-fab-button>
      <ion-icon class="add-icon" :icon="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script lang="ts">
import IngredientModal from "@/components/ingredients/IngredientModal.vue";
import { useRootStore } from "@/store";
import type { Ingredient } from "@/types/ingredients";
import {
  IonFab,
  IonFabButton,
  IonIcon,
  modalController,
  isPlatform,
} from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";
import { add } from "ionicons/icons";

export default defineComponent({
  name: "AddIngredientButton",
  components: {
    IonFab,
    IonFabButton,
    IonIcon,
  },
  setup() {
    const store = useRootStore();

    const postIngredient = (ingredient: Ingredient): void => {
      store.dispatch("ingredients/postIngredient", ingredient);
    };

    const openModal = async (): Promise<void> => {
      const modal = await modalController.create({
        component: IngredientModal,
        componentProps: {
          ...{ name: "", units: [] },
          callback: postIngredient,
        },
        ...(isPlatform("desktop")
          ? { cssClass: "add-ingredient-modal-desktop" }
          : {}),
      });

      return modal.present();
    };

    return { store, openModal, add };
  },
});
</script>

<style lang="scss" scoped>
.add-ingredient-button {
  position: fixed;

  .add-icon {
    --ionicon-stroke-width: 48px;
    font-size: 30px;
    pointer-events: none;
  }
}
</style>
