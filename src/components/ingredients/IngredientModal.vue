<template>
  <ion-content>
    <v-form class="form">
      <ion-item>
        <ion-label position="stacked">Название</ion-label>
        <ion-input
          :value="data.name"
          placeholder="Филе куриное"
          @ionInput="updateName($event.target.value)"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Единицы измерения</ion-label>
        <ion-select
          multiple
          placeholder="Выберите"
          cancel-text="Отмена"
          ok-text="ОК"
          :value="data.units"
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
      <div class="actions">
        <ion-button
          type="submit"
          @click="confirm()"
          :disabled="!data.name || !data.units"
        >
          Сохранить
        </ion-button>
        <ion-button color="light" @click="dismiss()">Отмена</ion-button>
      </div>
    </v-form>
  </ion-content>
</template>

<script lang="ts">
import { useRootStore } from "@/store";
import type { IngredientPayload } from "@/types/ingredients";
import type { Unit } from "@/types/units";
import { modalController, IonSelect, IonSelectOption } from "@ionic/vue";
import type { Ref } from "@vue/runtime-core";
import { computed, defineComponent, ref } from "@vue/runtime-core";

export default defineComponent({
  name: "IngredientModal",
  components: { IonSelect, IonSelectOption },
  props: ["_id", "name", "units", "callback"],
  setup(props) {
    const store = useRootStore();
    const data: Ref<IngredientPayload> = ref({
      _id: props._id,
      name: props.name,
      units: props.units.map((unit: Unit) => unit._id),
    });
    const unitsList = computed(() => store.state.units.unitsList);

    store.dispatch("units/getUnits");

    const updateName = (name: string): void => {
      data.value.name = name;
    };

    const updateUnits = (units: string[]): void => {
      data.value.units = units;
    };

    const dismiss = () => {
      modalController.dismiss();
    };

    const confirm = (): void => {
      props.callback(data.value);
      dismiss();
    };

    return {
      store,
      data,
      unitsList,
      updateName,
      updateUnits,
      dismiss,
      confirm,
    };
  },
});
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 25px;

  .actions {
    display: flex;
    justify-content: flex-end;
    margin-top: auto;

    ion-button {
      margin-left: 10px;
    }
  }
}
</style>
