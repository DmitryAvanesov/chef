<template>
  <ion-button :disabled="!data.name" @click="callback()">
    <ion-icon :icon="checkmark"></ion-icon>
  </ion-button>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { checkmark } from "ionicons/icons";

export default defineComponent({
  name: "ConfirmButton",
  props: ["data", "callback"],
  setup() {
    return { checkmark };
  },
});
</script>

<style lang="scss" scoped></style>
