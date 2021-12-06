<template>
  <ion-grid>
    <ion-row>
      <ion-col :size-md="8" :offset-md="2">
        <h2>Ингредиенты</h2>
        <ion-list class="list">
          <ion-item-sliding
            class="list-item"
            v-for="recipeIngredient in $props.recipe.ingredients"
            :key="recipeIngredient._id"
            :ref="recipeIngredient._id"
          >
            <ion-item lines="full">
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
            <ion-item-options side="start">
              <ion-item-option
                color="primary"
                @click="
                  openModal($refs[recipeIngredient._id], recipeIngredient)
                "
              >
                Редактировать
              </ion-item-option>
              <ion-item-option
                color="danger"
                @click="deleteRecipeIngredient(recipeIngredient._id)"
              >
                Удалить
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
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
import RecipeIngredientModal from "@/components/recipes/RecipeIngredientModal.vue";
import { useRootStore } from "@/store";
import type { RecipeIngredient } from "@/types/recipe-ingredients";
import type { Recipe } from "@/types/recipes";
import {
  IonCol,
  IonItemOption,
  IonItemOptions,
  IonRow,
  isPlatform,
  modalController,
  onIonViewDidEnter,
} from "@ionic/vue";
import type { ComputedRef} from "@vue/runtime-core";
import { computed, defineComponent } from "@vue/runtime-core";
import { watch } from "vue";

export default defineComponent({
  name: "RecipeIngredientsList",
  props: ["recipe"],
  components: {
    AddRecipeIngredientButton,
    IonRow,
    IonCol,
    IonItemOptions,
    IonItemOption,
  },
  setup(props) {
    const store = useRootStore();
    const recipeIngredientsList: ComputedRef<RecipeIngredient[]> = computed(
      () => store.state.recipeIngredients.recipeIngredientsList
    );

    watch(
      recipeIngredientsList,
      (newRecipeIngredients, oldRecipeIngredients) => {
        if (newRecipeIngredients.length > oldRecipeIngredients.length) {
          patchRecipe({
            ...props.recipe,
            ingredients: [
              ...props.recipe.ingredients,
              [...newRecipeIngredients].pop(),
            ],
          });
        } else {
          store.dispatch("recipes/getRecipes");
        }
      }
    );

    const patchRecipe = (recipe: Recipe) => {
      store.dispatch("recipes/patchRecipe", recipe);
    };

    const openModal = async (
      item: HTMLIonItemSlidingElement,
      recipeIngredient: RecipeIngredient
    ) => {
      const modal = await modalController.create({
        component: RecipeIngredientModal,
        componentProps: {
          recipeIngredient,
          recipe: props.recipe,
          callback: patchRecipeIngredient,
        },
        ...(isPlatform("desktop") ? { cssClass: "modal-desktop" } : {}),
      });
      await item.close();

      return modal.present();
    };

    const patchRecipeIngredient = (recipeIngredient: RecipeIngredient) => {
      store.dispatch(
        "recipeIngredients/patchRecipeIngredient",
        recipeIngredient
      );
    };

    const deleteRecipeIngredient = (id: string) => {
      store.dispatch("recipeIngredients/deleteRecipeIngredient", id);
    };

    return { openModal, deleteRecipeIngredient };
  },
});
</script>

<style lang="scss" scoped>
.list {
  padding-bottom: 96px;

  .list-item {
    cursor: pointer;

    .quantity {
      margin-right: 4px;
    }
  }
}
</style>
