<template>
  <ion-grid>
    <ion-row>
      <ion-col :size-md="8" :offset-md="2">
        <h2>Способ приготовления</h2>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { useRootStore } from "@/store";
import { IonCol, IonRow } from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "RecipeStages",
  props: ["recipe"],
  components: {
    IonRow,
    IonCol,
  },
  setup() {
    const store = useRootStore();

    return {};
  },
});
</script>

<style lang="scss" scoped>
.list {
  padding-bottom: 96px;

  .list-item {
    cursor: pointer;

    .name {
      white-space: nowrap;
      margin-right: 12px;
    }

    .dot {
      margin: 0 1px;
    }

    .unit-block {
      width: 65px;
      text-align: right;
      margin-left: 8px;

      .quantity {
        margin-right: 4px;
      }
    }
  }
}
</style>
