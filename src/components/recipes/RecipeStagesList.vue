<template>
  <ion-grid>
    <ion-row>
      <ion-col :size-md="8" :offset-md="2">
        <h2>Этапы приготовления</h2>
        <ion-list class="list">
          <ion-item
            class="list-item"
            v-for="stage in $props.recipe.stages"
            :key="stage._id"
            lines="none"
          >
            <div class="number-block">
              <ion-text class="number">{{ stage.number }}.</ion-text>
              <div class="actions-block">
                <ion-button
                  class="action-button"
                  shape="round"
                  size="small"
                  color="primary"
                  title="Редактировать этап"
                  @click="openModal(stage)"
                >
                  <ion-icon :icon="create"></ion-icon>
                </ion-button>
                <ion-button
                  class="action-button"
                  shape="round"
                  size="small"
                  color="danger"
                  title="Удалить этап"
                  @click="deleteRecipeStage(stage)"
                >
                  <ion-icon :icon="close"></ion-icon>
                </ion-button>
              </div>
            </div>
            <ion-text class="description">{{ stage.description }}</ion-text>
            <ion-item class="minutes-item" slot="end" lines="none">
              <ion-text class="minutes-label">{{ stage.minutes }}</ion-text>
              <ion-icon class="time-icon" :icon="time"></ion-icon>
            </ion-item>
          </ion-item>
          <add-button
            name="этап"
            :modal-component="RecipeStageModal"
            :modal-component-props="{
              recipe: $props.recipe,
              callback: postRecipeStage,
            }"
          ></add-button>
        </ion-list>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import RecipeStageModal from "@/components/recipes/RecipeStageModal.vue";
import AddButton from "@/components/shared/AddButton.vue";
import { useRootStore } from "@/store";
import type { RecipeStage } from "@/types/recipe-stages";
import {
  IonCol,
  IonIcon,
  IonRow,
  IonText,
  isPlatform,
  modalController,
} from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";
import { time, create, close } from "ionicons/icons";

export default defineComponent({
  name: "RecipeStagesList",
  props: ["recipe"],
  components: {
    AddButton,
    IonRow,
    IonCol,
    IonText,
    IonIcon,
  },
  setup(props) {
    const store = useRootStore();

    const postRecipeStage = (recipeStage: RecipeStage) => {
      store.dispatch("recipeStages/postRecipeStage", {
        recipe: props.recipe,
        recipeStage,
      });
    };

    const openModal = async (recipeStage: RecipeStage) => {
      const modal = await modalController.create({
        component: RecipeStageModal,
        componentProps: {
          recipeStage,
          recipe: props.recipe,
          callback: patchRecipeStage,
        },
        ...(isPlatform("desktop") ? { cssClass: "modal-desktop" } : {}),
      });

      return modal.present();
    };

    const patchRecipeStage = (recipeStage: RecipeStage) => {
      store.dispatch("recipeStages/patchRecipeStage", {
        recipe: props.recipe,
        recipeStage,
      });
    };

    const deleteRecipeStage = (recipeStage: RecipeStage) => {
      store.dispatch("recipeStages/deleteRecipeStage", {
        recipe: props.recipe,
        recipeStage,
      });
    };

    return {
      RecipeStageModal,
      postRecipeStage,
      openModal,
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

.list {
  padding-bottom: 96px;

  .list-item {
    --min-height: $name-line-height;
    padding: 8px 0;

    .number-block {
      display: flex;
      flex-direction: column;
      height: 100%;

      & > * {
        min-width: 48px;
        margin-right: 12px;
      }

      .number {
        line-height: $name-line-height;
        color: var(--ion-color-medium);
      }

      .actions-block {
        display: none;

        .action-button {
          --padding-start: 4px;
          --padding-end: 4px;
          margin-left: 0;
          width: 22px;
          height: 22px;
        }
      }
    }

    .description {
      margin-bottom: auto;
      text-align: justify;
      line-height: $name-line-height;
    }

    .minutes-item {
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
      .number-block {
        .number {
          display: none;
        }

        .actions-block {
          display: initial;
        }
      }

      .minutes-item {
        .time-icon {
          color: initial;
        }

        .minutes-label {
          color: initial;
        }
      }
    }
  }
}
</style>
