<template>
  <ion-item class="add-item">
    <span class="add-label">Добавить</span>
    <ion-input
      class="add-input"
      placeholder="единицу измерения"
      :value="data.name"
      @ionInput="updateName($event.target.value)"
    ></ion-input>
    <confirm-button :data="data" :callback="postUnit"></confirm-button>
  </ion-item>
</template>

<script lang="ts">
import ConfirmButton from "@/components/units/ConfirmButton.vue";
import { useRootStore } from "@/store";
import type { Unit } from "@/types/units";
import { defineComponent } from "@vue/runtime-core";
import type { Ref } from "vue";
import { ref } from "vue";

export default defineComponent({
  name: "AddUnitItem",
  components: { ConfirmButton },
  setup() {
    const store = useRootStore();
    const data: Ref<Unit> = ref({
      _id: "",
      name: "",
    });

    const updateName = (name: string): void => {
      data.value.name = name;
    };

    const postUnit = (): void => {
      store.dispatch("units/postUnit", data.value);
      data.value.name = "";
    };

    return { data, updateName, postUnit };
  },
});
</script>

<style lang="scss" scoped>
.add-item {
  .add-label {
    margin-right: 5px;
  }

  .add-input {
    color: var(--ion-color-medium);
    text-overflow: ellipsis;
    text-align: left;
    text-align-last: auto;
  }
}
</style>
