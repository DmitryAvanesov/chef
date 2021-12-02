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
              <h2 class="name">
                {{ recipe.name }}
              </h2>
            </ion-item>
          </router-link>
        </ion-list>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { useRootStore } from "@/store";
import type { Recipe } from "@/types/recipes";
import { IonCol, IonRow } from "@ionic/vue";
import type { ComputedRef } from "@vue/runtime-core";
import { defineComponent } from "@vue/runtime-core";
import { computed } from "vue";

export default defineComponent({
  name: "RecipesList",
  components: {
    IonRow,
    IonCol,
  },
  setup() {
    const store = useRootStore();
    const recipesList: ComputedRef<Recipe[]> = computed(
      () => store.state.recipes.recipesList
    );

    return {
      recipesList,
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
      cursor: pointer;

      .name {
        font-size: 20px;
      }
    }
  }
}
</style>
