<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar>
        <ion-tab-button tab="Recipes" href="/recipes">
          <ion-icon :icon="pizza" />
          <ion-label>Рецепты</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="Ingredients" href="/ingredients">
          <ion-icon :icon="fish" />
          <ion-label>Ингредиенты</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="Units" href="/units">
          <ion-icon :icon="scale" />
          <ion-label>
            {{ isDesktop ? "Единицы измерения" : "Ед. изм." }}
          </ion-label>
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
  isPlatform,
} from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";
import { pizza, fish, scale } from "ionicons/icons";

export default defineComponent({
  name: "Tabs",
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    const isDesktop = isPlatform("desktop");

    return {
      isDesktop,
      pizza,
      fish,
      scale,
    };
  },
});
</script>
