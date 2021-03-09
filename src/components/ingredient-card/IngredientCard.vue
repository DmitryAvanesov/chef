<template>
  <ion-card>
    <ion-card-content class="content">
      <ion-img
        src="http://cdn.iz.ru/sites/default/files/styles/900x506/public/news-2018-11/Depositphotos_131270798_xl-2015.jpg?itok=85lnFA2R"
      ></ion-img>
    </ion-card-content>
    <ion-card-header>
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

<style scoped>
.content {
  padding: 0;
}
</style>
