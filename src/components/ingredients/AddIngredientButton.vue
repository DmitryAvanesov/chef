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
import AddIngredientModal from '@/components/ingredients/AddIngredientModal.vue';
import { useRootStore } from '@/store';
import { IonFab, IonFabButton, IonIcon, modalController } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { add } from 'ionicons/icons';

export default defineComponent({
  name: 'AddIngredientButton',
  components: {
    IonFab,
    IonFabButton,
    IonIcon,
  },
  setup() {
    const store = useRootStore();

    const openModal = async (): Promise<void> => {
      const modal = await modalController.create({
        component: AddIngredientModal,
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
