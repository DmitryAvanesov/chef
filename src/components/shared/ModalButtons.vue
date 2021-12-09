<template>
  <div class="actions">
    <ion-button @click="confirm()" :disabled="$props.disabled">
      Сохранить
    </ion-button>
    <ion-button color="light" @click="dismiss()">Отмена</ion-button>
  </div>
</template>

<script lang="ts">
import { modalController } from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "ModalButtons",
  props: ["data", "callback", "disabled"],
  setup(props) {
    const dismiss = () => {
      modalController.dismiss();
    };

    const confirm = (): void => {
      props.callback(props.data);
      dismiss();
    };

    return { confirm, dismiss };
  },
});
</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;

  ion-button {
    margin-left: 10px;
  }
}
</style>
