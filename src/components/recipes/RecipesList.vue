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
            <ion-item class="list-item">
              <div class="recipe-info">
                <div class="recipe-title">
                  <h2 class="name">
                    {{ recipe.name }}
                  </h2>
                  <ion-item class="minutes-block" lines="none">
                    <ion-text class="minutes-label">
                      {{
                        recipe.stages.reduce(
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
                    v-for="recipeIngredient in recipe.ingredients.slice(
                      0,
                      ingredientsLimit
                    )"
                    :key="recipeIngredient._id"
                  >
                    {{ recipeIngredient.ingredient.name }}
                  </li>
                  <li v-if="recipe.ingredients.length > ingredientsLimit">
                    и ещё
                    {{ recipe.ingredients.length - ingredientsLimit }}
                  </li>
                </ul>
              </div>
              <div
                class="recipe-image"
                :style="{
                  background: `linear-gradient(to left, rgba(255,255,255,0) 20%, rgba(255,255,255,1)), url(https://static.1000.menu/res/640/img/content/33240/gulyash-iz-govyadiny-s-podlivkoi-peredelka_1552320197_10_max.jpg), url(${require('../../../resources/fallback.jpg')})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }"
              ></div>
            </ion-item>
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
import { useRootStore } from "@/store";
import type { Recipe } from "@/types/recipes";
import { IonCol, IonIcon, IonRow, IonText } from "@ionic/vue";
import type { ComputedRef } from "@vue/runtime-core";
import { defineComponent } from "@vue/runtime-core";
import { time } from "ionicons/icons";
import { computed } from "vue";
import AddButton from "@/components/shared/AddButton.vue";
import RecipeModal from "@/components/recipes/RecipeModal.vue";

export default defineComponent({
  name: "RecipesList",
  components: {
    AddButton,
    IonRow,
    IonCol,
    IonIcon,
    IonText,
  },
  setup() {
    const store = useRootStore();
    const ingredientsLimit = 3;
    const recipesList: ComputedRef<Recipe[]> = computed(
      () => store.state.recipes.recipesList
    );

    const postRecipe = (recipe: Recipe) => {
      store.dispatch("recipes/postRecipe", recipe);
    };

    return {
      RecipeModal,
      ingredientsLimit,
      recipesList,
      postRecipe,
      time,
    };
  },
});
</script>

<style lang="scss" scoped>
.list {
  padding: 5% 0;

  .link {
    text-decoration: none;

    .list-item {
      --inner-padding-end: 0;
      cursor: pointer;

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
