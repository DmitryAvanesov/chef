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
            <ion-text class="number">{{ stage.number }}.</ion-text>
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
import { IonCol, IonIcon, IonRow, IonText } from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";
import { time } from "ionicons/icons";

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

    return { RecipeStageModal, postRecipeStage, time };
  },
});
</script>

<style lang="scss" scoped>
$name-line-height: 20px;

.list {
  padding-bottom: 96px;

  .list-item {
    --min-height: $name-line-height;
    padding: 8px 0;

    .number {
      margin: 0 12px auto 0;
      color: var(--ion-color-medium);
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
      }

      .minutes-label {
        margin-right: 4px;
        margin-left: auto;
        color: var(--ion-color-medium);
      }
    }

    &:hover {
      .minutes-item {
        .time-icon {
          color: var(--ion-color-primary);
        }

        .minutes-label {
          color: var(--ion-color-primary);
        }
      }
    }
  }
}
</style>
