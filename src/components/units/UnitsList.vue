<template>
  <ion-list class="list">
    <ion-item-sliding
      class="list-item"
      v-for="unit in unitsList"
      :key="unit._id"
      ref="listItem"
    >
      <ion-item>
        <ion-label v-if="!editing">{{ unit.name }}</ion-label>
        <ion-input
          class="add-input"
          v-if="editing"
          :placeholder="unit.name"
          :value="data.name"
          @ionInput="updateName($event.target.value)"
        ></ion-input>
      </ion-item>
      <ion-item-options side="start">
        <ion-item-option color="primary" @click="handleEditing()">
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
    const editing = ref(false);
    const listItem: Ref<HTMLIonItemSlidingElement | undefined> = ref();
    const unitsList = computed(() => store.state.units.unitsList);

    store.dispatch("units/getUnits");

    const handleEditing = (): void => {
      editing.value = !editing.value;
      listItem.value?.close();
    };

    const deleteUnit = (id: string): void => {
      store.dispatch("units/deleteUnit", id);
    };

    return {
      data,
      editing,
      listItem,
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
