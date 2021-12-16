<template>
  <ion-grid class="recipe-filters">
    <ion-row>
      <ion-col :size-md="8" :offset-md="2">
        <ion-card>
          <ion-card-content>
            <ion-item>
              <ion-label class="minutes-label" position="stacked">
                Продолжительность, мин.
              </ion-label>
              <ion-range
                :min="minMinutes"
                :max="maxMinutes"
                color="primary"
                :dual-knobs="true"
                :pin="true"
                :value="{
                  lower: data.minutesFrom || minMinutes,
                  upper: data.minutesTo || maxMinutes,
                }"
                @ionChange="
                  filterByMinutes({
                    minutesFrom: $event.target.value.lower,
                    minutesTo: $event.target.value.upper,
                  })
                "
              >
                <ion-label slot="start">{{ minMinutes }}</ion-label>
                <ion-label slot="end">{{ maxMinutes }}</ion-label>
              </ion-range>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Ингредиенты</ion-label>
              <ion-select
                multiple
                placeholder="Выберите ингредиенты"
                :value="data.ingredients"
                @ionChange="filterByIngredients($event.target.value)"
              >
                <ion-select-option
                  v-for="ingredient in ingredientsList"
                  :key="ingredient?._id"
                  :value="ingredient?._id"
                >
                  {{ ingredient.name }}
                </ion-select-option>
              </ion-select>
            </ion-item>
          </ion-card-content>
        </ion-card></ion-col
      ></ion-row
    ></ion-grid
  >
</template>

<script lang="ts">
import { useRootStore } from "@/store";
import type { RecipesFilterMinutes, RecipesFilters } from "@/types/recipes";
import {
  IonCardContent,
  IonCol,
  IonRange,
  IonRow,
  IonSelect,
  IonSelectOption,
  onIonViewDidEnter,
} from "@ionic/vue";
import { computed, defineComponent } from "@vue/runtime-core";
import type { Ref } from "vue";
import { ref, watch } from "vue";

export default defineComponent({
  name: "RecipesFilters",
  components: {
    IonCardContent,
    IonSelect,
    IonSelectOption,
    IonRow,
    IonCol,
    IonRange,
  },
  setup() {
    const store = useRootStore();
    const data: Ref<RecipesFilters> = ref({});
    const recipesList = computed(() => [
      ...(store.state.recipes.recipesList || []),
    ]);
    const ingredientsList = computed(() => [
      ...(store.state.ingredients.ingredientsList || []),
    ]);
    const minMinutes = ref();
    const maxMinutes = ref();

    watch(recipesList, (newRecipesList, oldRecipeList) => {
      if (!oldRecipeList.length) {
        const recipeMinutes = newRecipesList.map(
          (recipe) => recipe.minutes || 0
        );

        minMinutes.value = Math.min(...recipeMinutes);
        maxMinutes.value = Math.max(...recipeMinutes);
        console.log(minMinutes.value, maxMinutes.value);
      }
    });

    onIonViewDidEnter(() => {
      console.log(recipesList);
    });

    const filterByIngredients = (ingredients: string[]) => {
      data.value.ingredients = ingredients;
      store.dispatch("recipes/getRecipes", data.value);
    };

    const filterByMinutes = (recipesFilterMinutes: RecipesFilterMinutes) => {
      if (
        recipesFilterMinutes.minutesFrom !== data.value.minutesFrom ||
        recipesFilterMinutes.minutesTo !== data.value.minutesTo
      ) {
        data.value = { ...data.value, ...recipesFilterMinutes };
        store.dispatch("recipes/getRecipes", data.value);
      }
    };

    return {
      data,
      recipesList,
      ingredientsList,
      minMinutes,
      maxMinutes,
      filterByIngredients,
      filterByMinutes,
    };
  },
});
</script>

<style lang="scss" scoped>
.recipe-filters {
  .minutes-label {
    line-height: 14px;
  }
}
</style>
