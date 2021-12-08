<template>
  <ion-grid>
    <ion-row>
      <ion-col :size-md="8" :offset-md="2">
        <h2>Этапы приготовления</h2>
        <ion-list class="list">
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
import { IonCol, IonRow } from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "RecipeStagesList",
  props: ["recipe"],
  components: {
    AddButton,
    IonRow,
    IonCol,
  },
  setup(props) {
    const store = useRootStore();

    const postRecipeStage = (recipeStage: RecipeStage) => {
      store.dispatch("recipeStages/postRecipeStage", {
        recipe: props.recipe,
        recipeStage,
      });
    };

    return { RecipeStageModal, postRecipeStage };
  },
});
</script>

<style lang="scss" scoped>
.list {
  padding-bottom: 96px;
}
</style>
