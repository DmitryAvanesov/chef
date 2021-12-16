<template>
  <ion-fab
    :style="{ right: `${$props.index * ($props.size + 4) + 8}px` }"
    vertical="top"
    horizontal="end"
  >
    <ion-fab-button
      class="action-button"
      :style="{ width: `${$props.size}px`, height: `${$props.size}px` }"
      :color="color"
      :title="title"
      @click="handleClick($event)"
    >
      <ion-icon
        class="action-icon"
        :style="{ fontSize: `${$props.size / 2}px` }"
        :icon="icon"
      ></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script lang="ts">
import { IonFab, IonFabButton, IonIcon } from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "ActionButton",
  components: { IonIcon, IonFab, IonFabButton },
  props: ["color", "icon", "title", "callback", "index", "size"],
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
  .action-icon {
    pointer-events: none;
  }
}
</style>
