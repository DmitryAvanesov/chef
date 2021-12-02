<template>
  <ion-grid>
    <ion-row>
      <ion-col :size-md="8" :offset-md="2">
        <ion-list>
          <add-recipe-ingredient></add-recipe-ingredient>
        </ion-list>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import AddRecipeIngredient from "@/components/recipes/AddRecipeIngredient.vue";
import { useRootStore } from "@/store";
import { IonCol, IonRow } from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "RecipeIngredientsList",
  props: ["recipe"],
  components: {
    AddRecipeIngredient,
    IonRow,
    IonCol,
  },
  setup() {
    const store = useRootStore();
  },
});
</script>

<style lang="scss" scoped></style>
