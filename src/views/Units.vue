<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Единицы измерения</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content">
      <units-list></units-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import UnitsList from "@/components/units/UnitsList.vue";
import { IonPage } from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Units",
  components: {
    UnitsList,
    IonPage,
  },
});
</script>

<style lang="scss" scoped></style>
