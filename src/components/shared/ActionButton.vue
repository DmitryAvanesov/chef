<template>
  <ion-fab vertical="top" horizontal="end">
    <ion-fab-button
      class="action-button"
      :color="color"
      :title="title"
      @click="handleClick($event)"
    >
      <ion-icon class="action-icon" :icon="icon"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script lang="ts">
import { IonFab, IonFabButton, IonIcon } from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "ActionButton",
  components: { IonIcon, IonFab, IonFabButton },
  props: ["color", "icon", "title", "callback"],
  setup(props) {
    const handleClick = (event: Event) => {
      event.preventDefault();
      props.callback();
    };

    return { handleClick };
  },
});
</script>

<style lang="scss" scoped>
.action-button {
  width: 48px;
  height: 48px;

  .action-icon {
    font-size: 24px;
    pointer-events: none;
  }
}
</style>
