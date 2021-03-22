<template>
  <ion-item class="add-item">
    <span class="add-label">Добавить</span>
    <ion-input
      class="add-input"
      placeholder="единицу измерения"
      :value="data.name"
      @ionInput="updateName($event.target.value)"
    ></ion-input>
    <ion-button :disabled="!data.name" @click="postUnit()">
      <ion-icon :icon="checkmark"></ion-icon>
    </ion-button>
  </ion-item>
</template>

<script lang="ts">
import { useRootStore } from "@/store";
import type { Unit } from "@/types/units";
import { defineComponent } from "@vue/runtime-core";
import { checkmark } from "ionicons/icons";
import type { Ref} from "vue";
import { ref } from "vue";

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

    const postUnit = (): void => {
      store.dispatch("units/postUnit", data.value);
      data.value.name = "";
    };

    return { data, updateName, postUnit, checkmark };
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
