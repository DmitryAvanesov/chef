<template>
  <ion-grid>
    <ion-row>
      <ion-col :size-md="8" :offset-md="2">
        <ion-list class="list">
          <router-link
            class="link"
            v-for="recipe in recipesList"
            :key="recipe._id"
            :to="`${$route.path}/${recipe._id}`"
          >
            <recipe-item :recipe="recipe"></recipe-item>
          </router-link>
          <add-button
            name="рецепт"
            :modal-component="RecipeModal"
            :modal-component-props="{ callback: postRecipe }"
          ></add-button>
        </ion-list>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import RecipeItem from "@/components/recipes/RecipeItem.vue";
import RecipeModal from "@/components/recipes/RecipeModal.vue";
import AddButton from "@/components/shared/AddButton.vue";
import { useRootStore } from "@/store";
import type { Recipe } from "@/types/recipes";
import { IonCol, IonRow } from "@ionic/vue";
import type { ComputedRef } from "@vue/runtime-core";
import { defineComponent } from "@vue/runtime-core";
import { time } from "ionicons/icons";
import { computed } from "vue";

export default defineComponent({
  name: "RecipesList",
  components: {
    RecipeItem,
    AddButton,
    IonRow,
    IonCol,
  },
  setup() {
    const store = useRootStore();
    const recipesList: ComputedRef<Recipe[]> = computed(
      () => store.state.recipes.recipesList
    );

    const postRecipe = (recipe: Recipe) => {
      store.dispatch("recipes/postRecipe", recipe);
    };

    return {
      RecipeModal,
      recipesList,
      postRecipe,
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
