<template>
  <ion-grid>
    <ion-row>
      <ion-col :size-md="8" :offset-md="2">
        <ion-list>
          <add-recipe-ingredient-button
            :recipe="$props.recipe"
          ></add-recipe-ingredient-button>
        </ion-list>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import AddRecipeIngredientButton from "@/components/recipes/AddRecipeIngredientButton.vue";
import { useRootStore } from "@/store";
import { IonCol, IonRow } from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "RecipeIngredientsList",
  props: ["recipe"],
  components: {
    AddRecipeIngredientButton,
    IonRow,
    IonCol,
  },
  setup() {
    const store = useRootStore();

    return {};
  },
});
</script>

<style lang="scss" scoped></style>
