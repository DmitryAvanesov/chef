<template>
  <ion-item class="list-item">
    <div>
      <action-button
        v-for="(actionButton, index) in actionButtons"
        class="action-button"
        :color="actionButton.color"
        :icon="actionButton.icon"
        :title="actionButton.title"
        :callback="actionButton.callback"
        :key="index"
        :style="{ marginRight: `${index * 36}px` }"
      ></action-button>
    </div>
    <div class="recipe-info">
      <div class="recipe-title">
        <h2 class="name">
          {{ $props.recipe.name }}
        </h2>
        <ion-item class="minutes-block" lines="none">
          <ion-text class="minutes-label">
            {{
              $props.recipe.stages.reduce(
                (previousValue, currentValue) =>
                  previousValue + currentValue.minutes,
                0
              )
            }}
          </ion-text>
          <ion-icon class="time-icon" :icon="time"></ion-icon>
        </ion-item>
      </div>
      <ul class="ingredients-list">
        <li
          class="ingredients-list-item"
          v-for="recipeIngredient in $props.recipe.ingredients.slice(
            0,
            ingredientsLimit
          )"
          :key="recipeIngredient._id"
        >
          {{ recipeIngredient.ingredient.name }}
        </li>
        <li v-if="$props.recipe.ingredients.length > ingredientsLimit">
          и ещё
          {{ $props.recipe.ingredients.length - ingredientsLimit }}
        </li>
      </ul>
    </div>
    <div
      class="recipe-image"
      :style="{
        background: `linear-gradient(to left, rgba(255,255,255,0) 20%, rgba(255,255,255,1)), url(${
          $props.recipe.image
        }), url(${require('../../../resources/fallback.jpg')})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }"
    ></div>
  </ion-item>
</template>

<script lang="ts">
import RecipeModal from "@/components/recipes/RecipeModal.vue";
import ActionButton from "@/components/shared/ActionButton.vue";
import { useRootStore } from "@/store";
import type { Recipe } from "@/types/recipes";
import type { ActionButtonData } from "@/types/shared";
import { IonIcon, IonText, toastController } from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";
import { refresh, time } from "ionicons/icons";

export default defineComponent({
  name: "RecipeItem",
  components: {
    ActionButton,
    IonIcon,
    IonText,
  },
  props: ["recipe"],
  setup(props) {
    const store = useRootStore();
    const ingredientsLimit = 3;

    const patchRecipe = (recipe: Recipe) => {
      store.dispatch("recipes/patchRecipe", recipe);
    };

    const refreshImage = async () => {
      const options: RequestInit = {
        method: "GET",
      };

      const result = await fetch(
        `${process.env.VUE_APP_GOOGLE_API}?key=${
          process.env.VUE_APP_GOOGLE_KEY
        }&cx=${process.env.VUE_APP_GOOGLE_SEARCH_ENGINE}&q=${
          props.recipe.name
        }&searchType=image&num=1&start=${Math.floor(Math.random() * 98 + 1)}`,
        options
      );

      if (result.ok) {
        const imageData = await result.json();

        patchRecipe({
          ...props.recipe,
          image: imageData.items[0].link,
        });
      } else {
        await openToast(result.status);
      }
    };

    const openToast = async (status: number) => {
      const toast = await toastController.create({
        message:
          status === 429
            ? "Квота для запроса изображений исчерпана, попробуйте позже"
            : "Не удалось обновить изображение",
        duration: 2000,
        color: "danger",
        position: "top",
      });
      return toast.present();
    };

    const actionButtons: ActionButtonData[] = [
      {
        color: "warning",
        icon: refresh,
        title: "Обновить изображение",
        callback: refreshImage,
      },
    ];

    return {
      RecipeModal,
      ingredientsLimit,
      actionButtons,
      time,
    };
  },
});
</script>

<style lang="scss" scoped>
.list {
  padding: 5% 0 96px;

  .link {
    text-decoration: none;

    .list-item {
      --inner-padding-end: 0;
      cursor: pointer;

      .action-button {
        display: none;
      }

      &:hover {
        .action-button {
          display: block;
        }
      }

      .recipe-info {
        display: flex;
        flex-direction: column;
        min-width: 284px;

        .recipe-title {
          display: flex;
          align-items: baseline;

          .name {
            font-size: 20px;
            margin: 8px 0;
          }

          .minutes-block {
            .minutes-label {
              margin-right: 4px;
            }

            .time-icon {
              color: initial;
            }
          }
        }

        .ingredients-list {
          margin: 8px 0;
          padding-left: 16px;
          list-style: none;

          & > * {
            color: var(--ion-color-medium);
          }

          .ingredients-list-item {
            margin: 2px 0;
          }
        }
      }

      .recipe-image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
