<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Единицы измерения</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content">
      <ion-list class="list">
        <ion-item-sliding
          class="list-item"
          v-for="unit in unitsList"
          :key="unit._id"
        >
          <ion-item>
            <ion-label>{{ unit.name }}</ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="primary">Редактировать</ion-item-option>
            <ion-item-option color="danger">Удалить</ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
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
  IonList,
} from "@ionic/vue";
import { useRootStore } from "@/store";
import { defineComponent } from "@vue/runtime-core";
import { computed } from "vue";

export default defineComponent({
  name: "Units",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonList,
  },
  setup() {
    const store = useRootStore();
    const unitsList = computed(() => store.state.units.unitsList);

    store.dispatch("units/getUnits");

    return { unitsList };
  },
});
</script>

<style lang="scss" scoped>
.list {
  padding: 5% 10%;

  .list-item {
    cursor: pointer;
  }
}
</style>
