<template>
  <ion-card class="card">
    <ion-card-content
      class="content"
      :style="{
        backgroundImage:
          'url(https://sup-kartoshka.ru/wp-content/uploads/2019/01/svarit-kurinoe-file-6.jpg)',
      }"
    >
    </ion-card-content>
    <ion-card-header class="header">
      <ion-card-subtitle>
        <span v-for="unit in ingredient.units" :key="unit">{{ unit }}</span>
      </ion-card-subtitle>
      <ion-card-title>{{ ingredient.name }}</ion-card-title>
    </ion-card-header>
  </ion-card>
</template>

<script lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from "@ionic/vue";
import { useRootStore } from "@/store";
import { computed } from "@vue/runtime-core";

export default {
  name: "IngredientCard",
  components: {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
  },
  props: ["index"],
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
  flex-direction: column;
  height: 200px;

  .content {
    padding: 0;
    flex-grow: 10;
    background-size: cover;
    background-position: center;
    height: 100%;
  }

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
  }
}
</style>
