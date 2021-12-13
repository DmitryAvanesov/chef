<template>
  <ion-item class="list-item" lines="none">
    <ion-text class="number" slot="start">{{ $props.stage.number }}.</ion-text>
    <ion-text class="description">{{ $props.stage.description }}</ion-text>
  </ion-item>
  <ion-item class="actions-item" lines="none">
    <div class="minutes-block">
      <ion-icon class="time-icon" :icon="time"></ion-icon>
      <ion-text class="minutes-label">
        {{ $props.stage.minutes }}
      </ion-text>
      <ion-text>
        {{
          $props.stage.minutes % 10 === 1 && $props.stage.minutes % 100 !== 11
            ? "минута"
            : [2, 3, 4].includes($props.stage.minutes % 10) &&
              ![12, 13, 14].includes($props.stage.minutes % 100)
            ? "минуты"
            : "минут"
        }}
      </ion-text>
    </div>
    <div class="actions-block">
      <action-button
        v-for="(actionButton, index) in actionButtons"
        class="action-button"
        :key="index"
        :color="actionButton.color"
        :icon="actionButton.icon"
        :title="actionButton.title"
        :callback="actionButton.callback"
        :index="index"
        :size="32"
      ></action-button>
    </div>
  </ion-item>
</template>

<script lang="ts">
import RecipeStageModal from "@/components/recipes/RecipeStageModal.vue";
import ActionButton from "@/components/shared/ActionButton.vue";
import { useRootStore } from "@/store";
import type { RecipeStage } from "@/types/recipe-stages";
import type { ActionButtonData } from "@/types/shared";
import {
  IonIcon,
  IonText,
  IonItem,
  modalController,
  isPlatform,
} from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";
import { time, create, close } from "ionicons/icons";

export default defineComponent({
  name: "RecipeStageItem",
  props: ["recipe", "stage"],
  components: {
    ActionButton,
    IonText,
    IonIcon,
    IonItem,
  },
  setup(props) {
    const store = useRootStore();
    const isDesktop = isPlatform("desktop");

    const openModal = async () => {
      const modal = await modalController.create({
        component: RecipeStageModal,
        componentProps: {
          recipeStage: props.stage,
          recipe: props.recipe,
          callback: patchRecipeStage,
        },
        ...(isDesktop ? { cssClass: "modal-desktop" } : {}),
      });

      return modal.present();
    };

    const patchRecipeStage = (recipeStage: RecipeStage) => {
      store.dispatch("recipeStages/patchRecipeStage", {
        recipe: props.recipe,
        recipeStage,
      });
    };

    const deleteRecipeStage = () => {
      store.dispatch("recipeStages/deleteRecipeStage", {
        recipe: props.recipe,
        recipeStage: props.stage,
      });
    };

    const actionButtons: ActionButtonData[] = [
      {
        color: "danger",
        icon: close,
        title: "Удалить",
        callback: deleteRecipeStage,
      },
      {
        color: "primary",
        icon: create,
        title: "Редактировать",
        callback: openModal,
      },
    ];

    return {
      RecipeStageModal,
      actionButtons,
      patchRecipeStage,
      deleteRecipeStage,
      time,
      create,
      close,
    };
  },
});
</script>

<style lang="scss" scoped>
$name-line-height: 30px;

.list-item {
  --min-height: $name-line-height;
  padding-top: 12px;

  .number {
    line-height: $name-line-height;
    margin: 0 8px auto 0;
  }

  .description {
    margin-bottom: auto;
    text-align: justify;
    line-height: $name-line-height;
  }
}

.actions-item {
  --inner-padding-end: 0;
  --min-height: 56px;

  .minutes-block {
    display: flex;
    align-items: center;

    .time-icon {
      pointer-events: none;
      margin-right: 8px;
      font-size: $name-line-height * 0.75;
    }

    .minutes-label {
      margin-right: 4px;
    }
  }
}
</style>
