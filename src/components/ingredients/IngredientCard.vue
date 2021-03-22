<template>
  <ion-card class="card">
    <ion-fab vertical="top" horizontal="end">
      <ion-fab-button
        class="delete-button"
        color="danger"
        @click="deleteIngredient()"
      >
        <ion-icon class="delete-icon" :icon="close"></ion-icon>
      </ion-fab-button>
    </ion-fab>
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
import { useRootStore } from "@/store";
import type { Ingredient } from "@/types/ingredients";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from "@ionic/vue";
import type { ComputedRef} from "@vue/runtime-core";
import { computed, defineComponent } from "@vue/runtime-core";
import { close } from "ionicons/icons";

export default defineComponent({
  name: "IngredientCard",
  components: {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
  },
  props: ["id"],
  setup(props: any) {
    const store = useRootStore();

    const ingredient: ComputedRef<Ingredient> = computed(() =>
      store.getters["ingredients/ingredientById"](props.id)
    );

    const deleteIngredient = (): void => {
      store.dispatch("ingredients/deleteIngredient", ingredient.value._id);
    };

    return { ingredient, deleteIngredient, close };
  },
});
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  height: 200px;

  .delete-button {
    display: none;
    width: 20px;
    height: 20px;

    .delete-icon {
      font-size: 16px;
      pointer-events: none;
    }
  }

  &:hover {
    .delete-button {
      display: block;
    }
  }

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
