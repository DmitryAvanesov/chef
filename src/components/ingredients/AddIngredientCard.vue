<template>
  <ion-card class="card">
    <ion-card-content class="content">
      +
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { IonCard, IonCardContent } from "@ionic/vue";
import { useRootStore } from "@/store";
import { computed } from "@vue/runtime-core";

export default {
  name: "AddIngredientCard",
  components: {
    IonCard,
    IonCardContent,
  },
  setup(props: any) {
    const store = useRootStore();
    const ingredient = computed(() =>
      store.getters["ingredients/ingredientByIndex"](props.index)
    );

    return { ingredient };
  },
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  align-items: center;
  height: 200px;

  .content {
    font-size: 64px;
    text-align: center;
    width: 100%;
  }
}
</style>
