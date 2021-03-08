<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>IngredientsTab</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <ExploreContainer name="IngredientsTab" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import {store} from "@/store"

export default  {
  name: 'IngredientsTab',
  store,
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  created() {
    store.dispatch("ingredients/getAllIngredients")
  }
}
</script>
