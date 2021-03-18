<template>
  <ion-item class="add-item">
    <span class="add-label">Добавить</span>
    <ion-input
      class="add-input"
      placeholder="единицу измерения"
      :value="data.name"
      @ionInput="updateName($event.target.value)"
    ></ion-input>
    <ion-button :disabled="!data.name" @click="addUnit()">
      <ion-icon :icon="checkmark"></ion-icon>
    </ion-button>
  </ion-item>
</template>

<script lang="ts">
import { useRootStore } from "@/store";
import { Unit } from "@/types/units";
import { defineComponent } from "@vue/runtime-core";
import { checkmark } from "ionicons/icons";
import { Ref, ref } from "vue";

export default defineComponent({
  name: "AddUnitItem",
  setup() {
    const store = useRootStore();
    const data: Ref<Unit> = ref({
      name: "",
    });

    const updateName = (name: string): void => {
      data.value.name = name;
    };

    const addUnit = (): void => {
      store.dispatch("units/postUnit", data.value);
      data.value.name = "";
    };

    return { data, updateName, addUnit, checkmark };
  },
});
</script>

<style lang="scss" scoped>
.add-item {
  cursor: pointer;

  .add-label {
    margin-right: 5px;
  }

  .add-input {
    color: var(--ion-color-medium);
  }
}
</style>
