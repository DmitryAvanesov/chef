<template>
  <ion-reorder-group class="reorder-group" disabled="false">
    <ion-item class="reorder-item" v-for="unit in unitsList" :key="unit._id">
      <ion-reorder></ion-reorder>
      <ion-label>
        {{ unit.name }}
      </ion-label>
    </ion-item>
  </ion-reorder-group>
</template>

<script lang="ts">
import { useRootStore } from "@/store";
import { defineComponent } from "@vue/runtime-core";
import { computed } from "vue";

export default defineComponent({
  name: "UnitsReorder",
  setup() {
    const store = useRootStore();
    const unitsList = computed(() => store.state.units.unitsList);
    store.dispatch("units/getUnits");

    return { unitsList };
  },
});
</script>

<style lang="scss" scoped>
.reorder-group {
  .reorder-item {
    margin: 0 10%;

    &:first-of-type {
      margin-top: 5%;
    }

    &:last-of-type {
      margin-bottom: 5%;
    }
  }
}
</style>
