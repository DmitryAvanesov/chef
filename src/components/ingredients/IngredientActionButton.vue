<template>
  <ion-fab vertical="top" horizontal="end">
    <ion-fab-button class="action-button" :color="color" @click="callback()">
      <ion-icon class="action-icon" :icon="icon"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "IngredientActionButton",
  props: ["color", "icon", "callback"],
});
</script>

<style lang="scss" scoped>
.action-button {
  width: 32px;
  height: 32px;

  .action-icon {
    font-size: 16px;
    pointer-events: none;
  }
}
</style>
