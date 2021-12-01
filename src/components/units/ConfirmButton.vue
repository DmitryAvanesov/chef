<template>
  <ion-button
    :disabled="!data.name"
    @click="callback()"
    fill="outline"
    size="default"
  >
    <ion-icon :icon="checkmark"></ion-icon>
  </ion-button>
</template>

<script lang="ts">
import { IonIcon } from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";
import { checkmark } from "ionicons/icons";

export default defineComponent({
  name: "ConfirmButton",
  components: { IonIcon },
  props: ["data", "callback"],
  setup() {
    return { checkmark };
  },
});
</script>

<style lang="scss" scoped>
.confirm-button {
  width: 30px;
}
</style>
