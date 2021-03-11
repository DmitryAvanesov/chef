<template>
  <ion-fab class="add-ingredient-button" vertical="bottom" horizontal="end">
    <ion-fab-button>
      <ion-icon class="add-icon" :icon="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script lang="ts">
import { IonFab, IonFabButton, IonIcon } from "@ionic/vue";
import { useRootStore } from "@/store";
import { add } from "ionicons/icons";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "AddIngredientButton",
  components: {
    IonFab,
    IonFabButton,
    IonIcon,
  },
  setup() {
    const store = useRootStore();

    const handleCardClick = () => {
      store.dispatch("ingredients/postIngredient");
    };

    return { store, handleCardClick, add };
  },
});
</script>

<style lang="scss" scoped>
.add-ingredient-button {
  position: fixed;

  .add-icon {
    --ionicon-stroke-width: 48px;
    font-size: 30px;
  }
}
</style>
