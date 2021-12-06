<template>
  <ion-fab
    class="add-recipe-ingredient-button"
    vertical="bottom"
    horizontal="end"
    title="Добавить ингредиент"
    @click="openModal()"
  >
    <ion-fab-button>
      <ion-icon class="add-icon" :icon="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script lang="ts">
import RecipeIngredientModal from "@/components/recipes/RecipeIngredientModal.vue";
import { useRootStore } from "@/store";
import type { RecipeIngredient } from "@/types/recipe-ingredients";
import type { Recipe } from "@/types/recipes";
import {
  IonFab,
  IonFabButton,
  IonIcon,
  modalController,
  isPlatform,
} from "@ionic/vue";
import type { ComputedRef } from "@vue/runtime-core";
import { computed, defineComponent } from "@vue/runtime-core";
import { add } from "ionicons/icons";

export default defineComponent({
  name: "AddRecipeIngredientButton",
  components: {
    IonFab,
    IonFabButton,
    IonIcon,
  },
  props: ["recipe"],
  setup(props) {
    const store = useRootStore();
    const recipeIngredientsList: ComputedRef<RecipeIngredient[]> = computed(
      () => store.state.recipeIngredients.recipeIngredientsList
    );

    const postRecipeIngredient = async (recipeIngredient: RecipeIngredient) => {
      await store.dispatch(
        "recipeIngredients/postRecipeIngredient",
        recipeIngredient
      );

      patchRecipe({
        ...props.recipe,
        ingredients: [
          ...props.recipe.ingredients,
          [...recipeIngredientsList.value].pop(),
        ],
      });
    };

    const patchRecipe = (recipe: Recipe) => {
      store.dispatch("recipes/patchRecipe", recipe);
    };

    const openModal = async (): Promise<void> => {
      const modal = await modalController.create({
        component: RecipeIngredientModal,
        componentProps: {
          recipe: props.recipe,
          callback: postRecipeIngredient,
        },
        ...(isPlatform("desktop") ? { cssClass: "modal-desktop" } : {}),
      });

      return modal.present();
    };

    return { openModal, add };
  },
});
</script>

<style lang="scss" scoped>
.add-recipe-ingredient-button {
  bottom: 16px;

  .add-icon {
    --ionicon-stroke-width: 48px;
    font-size: 30px;
    pointer-events: none;
  }
}
</style>
