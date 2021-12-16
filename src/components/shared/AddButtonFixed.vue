<template>
  <div class="add-button-fixed">
    <add-button
      :name="$props.name"
      :modal-component="$props.modalComponent"
      :modal-component-props="$props.modalComponent"
    ></add-button>
  </div>
</template>

<script lang="ts">
import AddButton from "@/components/shared/AddButton.vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "AddButtonFixed",
  components: {
    AddButton,
  },
  props: ["name", "modalComponent", "modalComponentProps"],
});
</script>

<style lang="scss" scoped>
.add-button-fixed {
  position: fixed;
  bottom: 4px;
  right: 12px;
}
</style>
