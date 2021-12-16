<template>
  <ion-item-sliding class="list-sliding-item" ref="listSlidingItemRef">
    <ion-item class="list-item" :href="`${$route.path}/${$props.recipe._id}`">
      <div class="recipe-info">
        <div class="recipe-title">
          <h2 class="name">
            {{ $props.recipe.name }}
          </h2>
          <ion-item class="minutes-block" lines="none">
            <ion-text class="minutes-label">
              {{ $props.recipe.minutes || 0 }}
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
            и ещё {{ $props.recipe.ingredients.length - ingredientsLimit }}
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
    <ion-item-options class="item-options" side="start">
      <ion-item-option color="tertiary" @click="refreshImage()">
        Обновить изображение
      </ion-item-option>
      <ion-item-option color="primary" @click="openModal()">
        Редактировать
      </ion-item-option>
      <ion-item-option color="danger" @click="deleteRecipe()">
        Удалить
      </ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>

<script lang="ts">
import RecipeModal from "@/components/recipes/RecipeModal.vue";
import { useRootStore } from "@/store";
import type { Recipe } from "@/types/recipes";
import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonText,
  isPlatform,
  modalController,
  toastController,
} from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";
import { time } from "ionicons/icons";
import { onMounted, ref, watch } from "vue";

export default defineComponent({
  name: "RecipeItem",
  components: {
    IonIcon,
    IonText,
    IonItemOptions,
    IonItemOption,
    IonItemSliding,
    IonItem,
  },
  props: ["recipe"],
  setup(props) {
    const store = useRootStore();
    const listSlidingItemRef = ref();
    const ingredientsLimit = 3;

    onMounted(() => {
      if (!props.recipe.image) {
        refreshImage();
      }
    });

    watch(
      () => props.recipe,
      (newRecipe, oldRecipe) => {
        if (newRecipe.name !== oldRecipe.name) {
          refreshImage();
        }
      }
    );

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

      await listSlidingItemRef.value.$el.close();
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

    const openModal = async () => {
      const modal = await modalController.create({
        component: RecipeModal,
        componentProps: {
          recipe: props.recipe,
          callback: patchRecipe,
        },
        ...(isPlatform("desktop") ? { cssClass: "modal-desktop" } : {}),
      });
      await listSlidingItemRef.value.$el.close();

      return modal.present();
    };

    const deleteRecipe = () => {
      store.dispatch("recipes/deleteRecipe", props.recipe._id);
    };

    return {
      RecipeModal,
      listSlidingItemRef,
      ingredientsLimit,
      openModal,
      refreshImage,
      deleteRecipe,
      time,
    };
  },
});
</script>

<style lang="scss" scoped>
.list-sliding-item {
  .list-item {
    --inner-padding-end: 0;
    --padding-start: 0;
    --background-hover: transparent;
    --min-height: 120px;
    cursor: pointer;

    .recipe-info {
      display: flex;
      flex-direction: column;
      min-width: 265px;

      .recipe-title {
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        .name {
          font-size: 20px;
          margin: 8px 0;
        }

        .minutes-block {
          min-width: 70px;
          z-index: 0;

          .minutes-label {
            margin-right: 4px;
          }

          .time-icon {
            color: initial;
          }
        }
      }

      .ingredients-list {
        margin: 0 0 8px;
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

  .item-options {
    display: flex;
    flex-direction: column;
    z-index: 0;
    width: auto;

    & > * {
      flex-basis: 50%;
    }
  }
}
</style>
