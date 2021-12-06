<template>
  <ion-grid>
    <ion-row>
      <ion-col :size-md="8" :offset-md="2">
        <h2>Ингредиенты</h2>
        <ion-list class="list">
          <ion-item
            class="list-item"
            v-for="recipeIngredient in $props.recipe.ingredients"
            :key="recipeIngredient._id"
            lines="full"
          >
            <div>
              {{ recipeIngredient.ingredient.name }}
            </div>
            <div slot="end">
              <span class="quantity">
                {{ recipeIngredient.quantity }}
              </span>
              <span>
                {{ recipeIngredient.unit.name }}
              </span>
            </div>
          </ion-item>
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
});
</script>

<style lang="scss" scoped>
.list {
  padding-bottom: 96px;

  .list-item {
    .quantity {
      margin-right: 4px;
    }
  }
}
</style>
