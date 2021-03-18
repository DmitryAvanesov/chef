<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar>
        <ion-tab-button tab="IngredientsTab" href="/ingredients">
          <ion-icon :icon="ellipse" />
          <ion-label>Ингредиенты</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="UnitsTab" href="/units">
          <ion-icon :icon="triangle" />
          <ion-label>Единицы измерения</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
} from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";
import { ellipse, square, triangle } from "ionicons/icons";

export default defineComponent({
  name: "Tabs",
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      ellipse,
      square,
      triangle,
    };
  },
});
</script>
