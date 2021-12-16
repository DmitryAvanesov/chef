<template>
  <ion-grid>
    <ion-row>
      <ion-col :size-md="8" :offset-md="2">
        <h2>Этапы приготовления</h2>
        <ion-list class="list">
          <div v-if="$props.recipe.stages">
            <div v-if="$props.recipe.stages.length">
              <recipe-stage-item
                v-for="stage in $props.recipe.stages"
                :key="stage._id"
                :recipe="$props.recipe"
                :stage="stage"
              ></recipe-stage-item>
            </div>
            <empty-data v-else name="Этапы приготовления"></empty-data>
          </div>
          <div v-else>
            <ion-skeleton-text
              class="skeleton"
              v-for="index in 5"
              :key="index"
            ></ion-skeleton-text>
          </div>
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
import RecipeStageItem from "@/components/recipes/RecipeStageItem.vue";
import RecipeStageModal from "@/components/recipes/RecipeStageModal.vue";
import AddButton from "@/components/shared/AddButton.vue";
import EmptyData from "@/components/shared/EmptyData.vue";
import { useRootStore } from "@/store";
import type { RecipeStage } from "@/types/recipe-stages";
import { IonCol, IonRow, IonGrid, IonList } from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";
import { time, create, close } from "ionicons/icons";

export default defineComponent({
  name: "RecipeStagesList",
  props: ["recipe"],
  components: {
    EmptyData,
    RecipeStageItem,
    AddButton,
    IonRow,
    IonCol,
    IonGrid,
    IonList,
  },
  setup(props) {
    const store = useRootStore();

    const postRecipeStage = (recipeStage: RecipeStage) => {
      store.dispatch("recipeStages/postRecipeStage", {
        recipe: props.recipe,
        recipeStage,
      });
    };

    return {
      RecipeStageModal,
      postRecipeStage,
      time,
      create,
      close,
    };
  },
});
</script>

<style lang="scss" scoped>
.list {
  padding-bottom: 96px;

  .skeleton {
    height: 86px;
    margin-top: 12px;
  }
}
</style>
