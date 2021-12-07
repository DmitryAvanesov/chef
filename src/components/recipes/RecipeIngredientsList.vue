<template>
  <ion-grid class="grid">
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
              <ion-text
                class="name"
                color="dark"
                @click="openPopover($event, recipeIngredient.ingredient._id)"
              >
                {{ recipeIngredient.ingredient.name }}
              </ion-text>
              <div class="dots">{{ ".".repeat(225) }}</div>
              <div class="unit-block" slot="end">
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
                @click="deleteRecipeIngredient(recipeIngredient)"
              >
                Удалить
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
          <add-button
            name="ингредиент"
            :modal-component="RecipeIngredientModal"
            :modal-component-props="{ recipe, callback: postRecipeIngredient }"
          ></add-button>
        </ion-list>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import IngredientCard from "@/components/ingredients/IngredientCard.vue";
import RecipeIngredientModal from "@/components/recipes/RecipeIngredientModal.vue";
import AddButton from "@/components/shared/AddButton.vue";
import { useRootStore } from "@/store";
import type { RecipeIngredient } from "@/types/recipe-ingredients";
import type { Recipe } from "@/types/recipes";
import {
  IonCol,
  IonItemOption,
  IonItemOptions,
  IonRow,
  IonText,
  isPlatform,
  modalController,
  popoverController,
} from "@ionic/vue";
import type { ComputedRef } from "@vue/runtime-core";
import { computed, defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "RecipeIngredientsList",
  props: ["recipe"],
  components: {
    AddButton,
    IonRow,
    IonCol,
    IonItemOptions,
    IonItemOption,
    IonText,
  },
  setup(props) {
    const store = useRootStore();

    const postRecipeIngredient = async (recipeIngredient: RecipeIngredient) => {
      await store.dispatch("recipeIngredients/postRecipeIngredient", {
        recipe: props.recipe,
        recipeIngredient,
      });
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

    const openPopover = async (event: Event, id: string) => {
      const popover = await popoverController.create({
        event,
        component: IngredientCard,
        componentProps: {
          id,
        },
      });
      await popover.present();
    };

    const patchRecipeIngredient = async (
      recipeIngredient: RecipeIngredient
    ) => {
      await store.dispatch("recipeIngredients/patchRecipeIngredient", {
        recipe: props.recipe,
        recipeIngredient,
      });
    };

    const deleteRecipeIngredient = (recipeIngredient: RecipeIngredient) => {
      store.dispatch("recipeIngredients/deleteRecipeIngredient", {
        recipe: props.recipe,
        recipeIngredient,
      });
    };

    return {
      RecipeIngredientModal,
      openModal,
      postRecipeIngredient,
      openPopover,
      deleteRecipeIngredient,
    };
  },
});
</script>

<style lang="scss" scoped>
.grid {
  padding-top: 16px;

  .list {
    padding-bottom: 96px;

    .list-item {
      cursor: pointer;

      .name {
        white-space: nowrap;
        margin-right: 12px;
        font-weight: 600;

        &:hover {
          color: var(--ion-color-primary);
        }
      }

      .dots {
        white-space: nowrap;
      }

      .unit-block {
        width: 75px;
        text-align: right;
        margin-left: 8px;

        .quantity {
          margin-right: 4px;
        }
      }
    }
  }
}
</style>
