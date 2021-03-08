<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ all }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ all }}</ion-title>
        </ion-toolbar>
      </ion-header>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/vue';
import {store} from "@/store"
import {mapState} from "vuex";

export default {
  name: 'IngredientsTab',
  store,
  components: {IonHeader, IonToolbar, IonTitle, IonContent, IonPage},
  computed: mapState('ingredients', ['all']),
  beforeCreate() {
    store.dispatch('ingredients/getAllIngredients')
  }
}
</script>
