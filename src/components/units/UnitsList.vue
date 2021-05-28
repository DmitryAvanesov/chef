<template>
  <ion-grid>
    <ion-row>
      <ion-col :size-md="8" :offset-md="2">
        <ion-list class="list">
          <ion-item-sliding
            class="list-item"
            v-for="unit in unitsList"
            :key="unit._id"
            :ref="unit._id"
          >
            <ion-item lines="full">
              <div v-if="data._id === unit._id" class="edit-unit">
                <ion-input
                  :placeholder="unit.name"
                  :value="data.name"
                  @ionInput="updateName($event.target.value)"
                ></ion-input>
                <confirm-button
                  :data="data"
                  :callback="patchUnit"
                ></confirm-button>
              </div>
              <ion-label v-else>{{ unit.name }}</ion-label>
            </ion-item>
            <ion-item-options side="start">
              <ion-item-option
                color="primary"
                @click="handleEditing($refs[unit._id], unit._id)"
              >
                {{ data._id === unit._id ? "Отменить" : "Редактировать" }}
              </ion-item-option>
              <ion-item-option color="danger" @click="deleteUnit(unit._id)">
                Удалить
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
          <add-unit-item></add-unit-item>
        </ion-list>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import AddUnitItem from "@/components/units/AddUnitItem.vue";
import ConfirmButton from "@/components/units/ConfirmButton.vue";
import { useRootStore } from "@/store";
import type { Unit } from "@/types/units";
import type { ComputedRef } from "@vue/runtime-core";
import { defineComponent, ref } from "@vue/runtime-core";
import type { Ref } from "vue";
import { computed } from "vue";

export default defineComponent({
  name: "UnitsList",
  components: { AddUnitItem, ConfirmButton },
  setup() {
    const store = useRootStore();
    const data: Ref<Unit> = ref({
      _id: "",
      name: "",
    });
    const unitsList: ComputedRef<Unit[]> = computed(
      () => store.state.units.unitsList
    );

    const updateName = (name: string): void => {
      data.value.name = name;
    };

    const handleEditing = (
      item: HTMLIonItemSlidingElement,
      unit: string
    ): void => {
      if (!data.value._id) {
        data.value._id = unit;
      } else {
        data.value._id = "";
      }

      item.close();
    };

    const patchUnit = () => {
      if (data.value._id) {
        store.dispatch("units/patchUnit", data.value);
      }

      data.value._id = "";
      data.value.name = "";
    };

    const deleteUnit = (id: string): void => {
      store.dispatch("units/deleteUnit", id);
      data.value._id = "";
    };

    return {
      data,
      unitsList,
      updateName,
      handleEditing,
      patchUnit,
      deleteUnit,
    };
  },
});
</script>

<style lang="scss" scoped>
.list {
  padding: 5% 0;

  .list-item {
    cursor: pointer;

    .edit-unit {
      display: flex;
      width: 100%;
    }
  }
}
</style>
