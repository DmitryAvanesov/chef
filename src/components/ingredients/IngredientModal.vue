<template>
  <ion-content>
    <div class="form">
      <ion-item>
        <ion-label>Название</ion-label>
        <ion-input
          class="name-input"
          :value="data.name"
          placeholder="Филе куриное"
          @ionInput="updateName($event.target.value)"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Единицы измерения</ion-label>
        <ion-select
          multiple
          placeholder="Выберите"
          cancel-text="Отмена"
          ok-text="ОК"
          :value="data.units.map((unit) => unit._id)"
          @ionChange="updateUnits($event.target.value)"
        >
          <ion-select-option
            v-for="unit in unitsList"
            :key="unit._id"
            :value="unit._id"
          >
            {{ unit.name }}
          </ion-select-option>
        </ion-select>
      </ion-item>
      <modal-buttons
        :data="data"
        :callback="$props.callback"
        :disabled="!data.name || !data.units"
      ></modal-buttons>
    </div>
  </ion-content>
</template>

<script lang="ts">
import ModalButtons from "@/components/shared/ModalButtons.vue";
import { useRootStore } from "@/store";
import type { Ingredient } from "@/types/ingredients";
import { IonSelect, IonSelectOption } from "@ionic/vue";
import type { Ref } from "@vue/runtime-core";
import { computed, defineComponent, ref } from "@vue/runtime-core";

export default defineComponent({
  name: "IngredientModal",
  components: { ModalButtons, IonSelect, IonSelectOption },
  props: ["ingredient", "callback"],
  setup(props) {
    const store = useRootStore();
    const stubIngredient: Ingredient = {
      _id: "",
      name: "",
      units: [],
      image: "",
    };
    const data: Ref<Ingredient> = ref({
      ...(props.ingredient?.value || stubIngredient),
    });
    const unitsList = computed(() => store.state.units.unitsList);

    const updateName = (name: string): void => {
      data.value.name = name;
    };

    const updateUnits = (units: string[]): void => {
      if (
        JSON.stringify(units) !==
        JSON.stringify(data.value.units.map((unit) => unit._id))
      ) {
        data.value.units =
          unitsList.value?.filter((unit) => units.includes(unit._id)) || [];
      }
    };

    return {
      store,
      data,
      unitsList,
      updateName,
      updateUnits,
    };
  },
});
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 25px;
}
</style>
