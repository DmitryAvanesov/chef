<template>
  <ion-content>
    <div class="form">
      <ion-item>
        <ion-label>Описание</ion-label>
        <ion-textarea
          class="description-textarea"
          :spellcheck="true"
          :rows="10"
          inputmode="text"
          placeholder="Введите описание"
          :value="data.description"
          @ionInput="updateDescription($event.target.value)"
        ></ion-textarea>
      </ion-item>
      <ion-item class="minutes-item">
        <ion-label>Продолжительность</ion-label>
        <ion-input
          class="minutes-input"
          type="number"
          placeholder="Введите число минут"
          :min="minutesMin"
          :max="minutesMax"
          :value="data.minutes || ''"
          @ionInput="updateMinutes($event.target.value)"
        ></ion-input>
        <ion-text class="minutes-label" slot="end">мин</ion-text>
      </ion-item>
      <div class="actions">
        <ion-button
          :disabled="
            !data.description ||
            !data.minutes ||
            data.minutes < minutesMin ||
            data.minutes > minutesMax
          "
          @click="confirm()"
        >
          Сохранить
        </ion-button>
        <ion-button color="light" @click="dismiss()">Отмена</ion-button>
      </div>
    </div>
  </ion-content>
</template>

<script lang="ts">
import type { RecipeStage } from "@/types/recipe-stages";
import { IonText, modalController } from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";
import type { Ref } from "vue";
import { ref } from "vue";

export default defineComponent({
  name: "RecipeStageModal",
  components: { IonText },
  props: ["recipeStage", "recipe", "callback"],
  setup(props) {
    const minutesMin = 0.5;
    const minutesMax = 1000;
    const data: Ref<RecipeStage> = ref({
      ...(props.recipeStage || {
        _id: "",
        number: 0,
        description: "",
        minutes: 0,
      }),
    });

    const updateDescription = (description: string): void => {
      data.value.description = description;
    };

    const updateMinutes = (minutes: string): void => {
      data.value.minutes = parseFloat(minutes);
    };

    const dismiss = () => {
      modalController.dismiss();
    };

    const confirm = (): void => {
      props.callback(data.value);
      dismiss();
    };

    return {
      minutesMin,
      minutesMax,
      data,
      updateDescription,
      updateMinutes,
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

  .description-textarea {
    text-align: right;
  }

  .minutes-item {
    .minutes-input {
      text-align: right;
    }

    .minutes-label {
      margin-left: 8px;
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
