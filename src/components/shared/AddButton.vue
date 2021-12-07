<template>
  <ion-fab
    class="add-button"
    vertical="bottom"
    horizontal="end"
    :title="`Добавить ${$props.name}`"
    @click="openModal()"
  >
    <ion-fab-button>
      <ion-icon class="add-icon" :icon="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script lang="ts">
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
  name: "AddButton",
  components: {
    IonFab,
    IonFabButton,
    IonIcon,
  },
  props: ["name", "modalComponent", "modalComponentProps"],
  setup(props) {
    const openModal = async (): Promise<void> => {
      const modal = await modalController.create({
        component: props.modalComponent,
        componentProps: props.modalComponentProps,
        ...(isPlatform("desktop") ? { cssClass: "modal-desktop" } : {}),
      });

      return modal.present();
    };

    return { openModal, add };
  },
});
</script>

<style lang="scss" scoped>
.add-button {
  bottom: 16px;

  .add-icon {
    --ionicon-stroke-width: 48px;
    font-size: 30px;
    pointer-events: none;
  }
}
</style>
