<template>
  <ion-list class="list">
    <ion-item-sliding
      class="list-item"
      v-for="(unit, index) in unitsList"
      :key="unit._id"
      :ref="`${index}`"
    >
      <ion-item>
        <ion-input
          class="add-input"
          v-if="editing === index"
          :placeholder="unit.name"
          :value="data.name"
          @ionInput="updateName($event.target.value)"
        ></ion-input>
        <ion-label v-else>{{ unit.name }}</ion-label>
      </ion-item>
      <ion-item-options side="start">
        <ion-item-option
          color="primary"
          @click="handleEditing($refs[index], index)"
        >
          Редактировать
        </ion-item-option>
        <ion-item-option color="danger" @click="deleteUnit(unit._id)">
          Удалить
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
    <add-unit-item></add-unit-item>
  </ion-list>
</template>

<script lang="ts">
import AddUnitItem from "@/components/units/AddUnitItem.vue";
import { useRootStore } from "@/store";
import type { Unit } from "@/types/units";
import type { ComputedRef } from "@vue/runtime-core";
import { defineComponent, ref } from "@vue/runtime-core";
import type { Ref } from "vue";
import { computed } from "vue";

export default defineComponent({
  name: "UnitsList",
  components: { AddUnitItem },
  setup() {
    const store = useRootStore();
    const data: Ref<Unit> = ref({
      name: "",
    });
    const editing: Ref<number | null> = ref(null);
    const unitsList: ComputedRef<Unit[]> = computed(
      () => store.state.units.unitsList
    );

    store.dispatch("units/getUnits");

    const handleEditing = (
      item: HTMLIonItemSlidingElement,
      index: number
    ): void => {
      editing.value = index;
      item.close();
    };

    const deleteUnit = (id: string): void => {
      store.dispatch("units/deleteUnit", id);
    };

    return {
      data,
      editing,
      unitsList,
      handleEditing,
      deleteUnit,
    };
  },
});
</script>

<style lang="scss" scoped>
.list {
  padding: 5% 10%;

  .list-item {
    cursor: pointer;
  }
}
</style>
