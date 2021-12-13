<template>
  <ion-card class="card">
    <div v-if="showActionButtons">
      <action-button
        v-for="(actionButton, index) in actionButtons"
        class="action-button"
        :key="index"
        :color="actionButton.color"
        :icon="actionButton.icon"
        :title="actionButton.title"
        :callback="actionButton.callback"
        :index="index"
        :size="44"
      ></action-button>
    </div>
    <ion-card-content
      class="content"
      :style="{
        backgroundImage: `url(${
          ingredient.image
        }), url(${require('../../../resources/fallback.jpg')})`,
      }"
    >
    </ion-card-content>
    <ion-card-header class="header">
      <ion-card-subtitle>
        <span v-for="(unit, index) in ingredient.units" :key="unit">
          <span v-if="index > 0"> &middot; </span>
          <span>{{ unit.name }}</span>
        </span>
      </ion-card-subtitle>
      <ion-card-title>{{ ingredient.name }}</ion-card-title>
    </ion-card-header>
  </ion-card>
</template>

<script lang="ts">
import IngredientModal from "@/components/ingredients/IngredientModal.vue";
import ActionButton from "@/components/shared/ActionButton.vue";
import { useRootStore } from "@/store";
import type { Ingredient } from "@/types/ingredients";
import type { ActionButtonData } from "@/types/shared";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  isPlatform,
  modalController,
  toastController,
} from "@ionic/vue";
import type { ComputedRef } from "@vue/runtime-core";
import { computed, defineComponent } from "@vue/runtime-core";
import { refresh, create, close } from "ionicons/icons";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "IngredientCard",
  components: {
    ActionButton,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
  },
  props: ["id"],
  setup(props) {
    const store = useRootStore();
    const route = useRoute();
    const showActionButtons = route.path === "/ingredients";
    const ingredient: ComputedRef<Ingredient> = computed(() =>
      store.getters["ingredients/ingredientById"](props.id)
    );

    onMounted(() => {
      if (!ingredient.value.image) {
        refreshImage();
      }
    });

    watch(ingredient, (newIngredient, oldIngredient) => {
      if (newIngredient.name !== oldIngredient.name) {
        refreshImage();
      }
    });

    const patchIngredient = (newIngredient: Ingredient): void => {
      store.dispatch("ingredients/patchIngredient", newIngredient);
    };

    const deleteIngredient = (): void => {
      store.dispatch("ingredients/deleteIngredient", ingredient.value._id);
    };

    const editIngredient = async (): Promise<void> => {
      const modal = await modalController.create({
        component: IngredientModal,
        componentProps: { ingredient, callback: patchIngredient },
        ...(isPlatform("desktop") ? { cssClass: "modal-desktop" } : {}),
      });

      return modal.present();
    };

    const refreshImage = async () => {
      const options: RequestInit = {
        method: "GET",
      };

      const result = await fetch(
        `${process.env.VUE_APP_GOOGLE_API}?key=${
          process.env.VUE_APP_GOOGLE_KEY
        }&cx=${process.env.VUE_APP_GOOGLE_SEARCH_ENGINE}&q=${
          ingredient.value.name
        }&searchType=image&num=1&start=${Math.floor(Math.random() * 98 + 1)}`,
        options
      );

      if (result.ok) {
        const imageData = await result.json();

        patchIngredient({
          ...ingredient.value,
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
        color: "danger",
        icon: close,
        title: "Удалить",
        callback: deleteIngredient,
      },
      {
        color: "primary",
        icon: create,
        title: "Редактировать",
        callback: editIngredient,
      },
      {
        color: "tertiary",
        icon: refresh,
        title: "Обновить изображение",
        callback: refreshImage,
      },
    ];

    return {
      editIngredient,
      deleteIngredient,
      showActionButtons,
      ingredient,
      actionButtons,
      create,
      close,
    };
  },
});
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  height: 200px;
  margin: 0;

  .action-button {
    display: none;
  }

  &:hover {
    .action-button {
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
