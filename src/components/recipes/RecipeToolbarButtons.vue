<template>
  <ion-buttons slot="start">
    <router-link to="/recipes">
      <ion-button color="primary" title="Назад к рецептам">
        <ion-icon :icon="arrowBack"></ion-icon>
      </ion-button>
    </router-link>
  </ion-buttons>
</template>

<script lang="ts">
import { IonIcon } from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";
import { arrowBack } from "ionicons/icons";

export default defineComponent({
  name: "RecipeToolbarButtons",
  components: { IonIcon },
  setup() {
    return { arrowBack };
  },
});
</script>

<style lang="scss" scoped></style>
