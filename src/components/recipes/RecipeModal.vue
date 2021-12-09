<template>
  <ion-content>
    <div class="form">
      <ion-item>
        <ion-label>Название</ion-label>
        <ion-input
          type="text"
          placeholder="Введите название"
          :value="data.name"
          @ionInput="updateName($event.target.value)"
        ></ion-input>
      </ion-item>
      <modal-buttons
        :data="data"
        :callback="$props.callback"
        :disabled="!data.name"
      ></modal-buttons>
    </div>
  </ion-content>
</template>

<script lang="ts">
import ModalButtons from "@/components/shared/ModalButtons.vue";
import type { Recipe } from "@/types/recipes";
import { defineComponent } from "@vue/runtime-core";
import type { Ref } from "vue";
import { ref } from "vue";

export default defineComponent({
  name: "RecipeModal",
  components: { ModalButtons },
  props: ["recipe", "callback"],
  setup(props) {
    const data: Ref<Recipe> = ref({
      ...(props.recipe || {
        _id: "",
        name: "",
        ingredients: [],
        stages: [],
        image: "",
      }),
    });

    const updateName = (name: string): void => {
      data.value.name = name;
    };

    return {
      data,
      updateName,
    };
  },
});
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 25px;

  .units-block {
    display: flex;
    flex-direction: column;

    .units-radio-group {
      margin-bottom: 32px;

      .units-label {
        font-size: 16px;
      }
    }
  }
}
</style>
