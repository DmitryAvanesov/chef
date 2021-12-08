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
    </div>
    <div class="actions">
      <ion-button @click="confirm()" :disabled="!data.name">
        Сохранить
      </ion-button>
      <ion-button color="light" @click="dismiss()">Отмена</ion-button>
    </div>
  </ion-content>
</template>

<script lang="ts">
import type { Recipe } from "@/types/recipes";
import { modalController } from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";
import type { Ref } from "vue";
import { ref } from "vue";

export default defineComponent({
  name: "RecipeModal",
  components: {},
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

    const dismiss = () => {
      modalController.dismiss();
    };

    const confirm = (): void => {
      props.callback(data.value);
      dismiss();
    };

    return {
      data,
      updateName,
      dismiss,
      confirm,
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

    .quantity-input {
      text-align: right;
    }

    .units-radio-group {
      margin-bottom: 32px;

      .units-label {
        font-size: 16px;
      }
    }
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    margin-top: auto;

    ion-button {
      margin-left: 10px;
    }
  }
}
</style>
