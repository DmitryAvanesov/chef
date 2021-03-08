<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Ингредиенты</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size-xs="2" v-for="ingredient in all" :key="ingredient.name">
            <ingredient-card />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
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
import { store } from "@/store";
import { mapState } from "vuex";

export default {
  name: "IngredientsTab",
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  computed: mapState("ingredients", ["all"]),
  beforeCreate() {
    store.dispatch("ingredients/getAllIngredients");
  },
};
</script>
