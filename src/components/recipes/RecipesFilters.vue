<template>
  <ion-grid class="recipe-filters">
    <ion-row>
      <ion-col :size-md="8" :offset-md="2">
        <ion-card>
          <ion-card-content>
            <ion-item>
              <ion-label class="minutes-label" position="stacked"
                >Продолжительность, мин.</ion-label
              >
              <ion-range
                :min="minMinutes"
                :max="maxMinutes"
                color="primary"
                :dual-knobs="true"
                :pin="true"
                :value="data.minutes"
                @ionChange="filterByMinutes($event.target.value)"
              >
                <ion-label slot="start">{{ minMinutes }}</ion-label>
                <ion-label slot="end">{{ maxMinutes }}</ion-label>
              </ion-range>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Ингредиенты</ion-label>
              <ion-select
                multiple
                :value="data.ingredients"
                @ionChange="filterByIngredients($event.target.value)"
              >
                <ion-select-option
                  v-for="ingredient in ingredientsList"
                  :key="ingredient._id"
                  :value="ingredient._id"
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
import type { ApiQuery } from "@/types/api";
import {
  IonCardContent,
  IonCol,
  IonRange,
  IonRow,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import { computed, defineComponent } from "@vue/runtime-core";
import type { Ref } from "vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

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
    const router = useRouter();
    const data: Ref<ApiQuery> = ref({
      ingredients: [],
      minutes: {},
    });
    const recipesList = computed(() => [
      ...(store.state.recipes.recipesList || []),
    ]);
    const ingredientsList = computed(() => [
      ...(store.state.ingredients.ingredientsList || []),
    ]);
    const recipeStagesMinutesList = computed(() =>
      recipesList.value.map(
        (recipe) =>
          recipe.stages?.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.minutes,
            0
          ) || 0
      )
    );
    const minMinutes = computed(() =>
      recipeStagesMinutesList.value.length
        ? Math.min(...recipeStagesMinutesList.value)
        : 0
    );
    const maxMinutes = computed(() =>
      recipeStagesMinutesList.value.length
        ? Math.max(...recipeStagesMinutesList.value)
        : 0
    );

    const filterByIngredients = (ingredients: string[]) => {
      data.value = { ingredients };
      store.dispatch("recipes/getRecipes", { ingredients });
    };

    const filterByMinutes = (minutes: string[]) => {
      // data.value = { minutes };
      // store.dispatch("recipes/getRecipes", { minutes });
      console.log(minutes);
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
