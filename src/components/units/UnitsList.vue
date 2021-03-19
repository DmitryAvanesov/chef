<template>
  <ion-list class="list">
    <ion-item-sliding
      class="list-item"
      v-for="unit in unitsList"
      :key="unit._id"
    >
      <ion-item>
        <ion-label>{{ unit.name }}</ion-label>
      </ion-item>
      <ion-item-options side="start">
        <ion-item-option color="primary">Редактировать</ion-item-option>
        <ion-item-option color="danger" @click="deleteUnit(unit._id)"
          >Удалить</ion-item-option
        >
      </ion-item-options>
    </ion-item-sliding>
    <add-unit-item></add-unit-item>
  </ion-list>
</template>

<script lang="ts">
import { useRootStore } from "@/store";
import { defineComponent } from "@vue/runtime-core";
import { computed } from "vue";
import { IonList } from "@ionic/vue";
import AddUnitItem from "@/components/units/AddUnitItem.vue";

export default defineComponent({
  name: "UnitsList",
  components: { AddUnitItem },
  setup() {
    const store = useRootStore();
    const unitsList = computed(() => store.state.units.unitsList);
    store.dispatch("units/getUnits");

    const deleteUnit = (id: string): void => {
      store.dispatch("units/deleteUnit", id);
    };

    console.log("hello");

    return { unitsList, deleteUnit, IonList };
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
