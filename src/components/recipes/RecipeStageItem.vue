<template>
  <ion-item class="list-item" lines="none">
    <ion-text class="number" slot="start">{{ $props.stage.number }}.</ion-text>
    <ion-text class="description">{{ $props.stage.description }}</ion-text>
    <ion-item class="actions-item" slot="end" lines="none">
      <div>
        <ion-text class="minutes-label">{{ $props.stage.minutes }}</ion-text>
        <ion-icon class="time-icon" :icon="time"></ion-icon>
      </div>
      <div>
        <action-button
          v-for="(actionButton, index) in actionButtons"
          class="action-button"
          :color="actionButton.color"
          :icon="actionButton.icon"
          :title="actionButton.title"
          :callback="actionButton.callback"
          :key="index"
          :style="{ marginRight: `${index * 48}px` }"
        ></action-button>
      </div>
    </ion-item>
  </ion-item>
</template>

<script lang="ts">
import RecipeStageModal from "@/components/recipes/RecipeStageModal.vue";
import ActionButton from "@/components/shared/ActionButton.vue";
import { useRootStore } from "@/store";
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

    const patchRecipeStage = () => {
      store.dispatch("recipeStages/patchRecipeStage", {
        recipe: props.recipe,
        recipeStage: props.stage,
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
  padding: 8px 0;

  .number {
    line-height: $name-line-height;
    color: var(--ion-color-medium);
    margin: 0 8px auto 0;
  }

  //.actions-block {
  //  display: none;
  //
  //  .action-button {
  //    --padding-start: 4px;
  //    --padding-end: 4px;
  //    margin-left: 0;
  //    width: 22px;
  //    height: 22px;
  //  }
  //}

  .description {
    margin-bottom: auto;
    text-align: justify;
    line-height: $name-line-height;
  }

  .actions-item {
    --min-height: $name-line-height;
    --inner-padding-end: 0;
    margin: 0 0 auto 16px;
    width: 100px;

    .time-icon {
      width: $name-line-height;
      height: $name-line-height;
      color: var(--ion-color-medium);
      pointer-events: none;
    }

    .minutes-label {
      margin-right: 4px;
      margin-left: auto;
      color: var(--ion-color-medium);
    }
  }

  &:hover {
    .number {
      color: initial;
    }

    .actions-item {
      .time-icon {
        color: initial;
      }

      .minutes-label {
        color: initial;
      }
    }
  }
}
</style>
