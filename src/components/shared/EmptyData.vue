<template>
  <div class="empty-data">
    <ion-icon class="empty-icon" :icon="informationCircle"></ion-icon>
    <ion-text class="empty-text">
      {{ $props.name }} не найдены. Вы можете добавить новый, кликнув на
      кнопочку.
    </ion-text>
  </div>
</template>

<script lang="ts">
import { IonIcon, IonText } from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";
import { informationCircle } from "ionicons/icons";

export default defineComponent({
  name: "EmptyData",
  components: {
    IonText,
    IonIcon,
  },
  props: ["name"],
  setup() {
    return { informationCircle };
  },
});
</script>

<style lang="scss" scoped>
.empty-data {
  display: flex;
  flex-direction: column;
  align-items: center;

  .empty-icon {
    font-size: 32px;
    margin-bottom: 8px;
  }

  .empty-text {
    text-align: center;
  }
}
</style>
