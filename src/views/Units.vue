<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Единицы измерения</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content"> </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import { useRootStore } from "@/store";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Ingredients",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
  },
  setup() {
    const store = useRootStore();
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
