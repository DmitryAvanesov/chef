import Tab1 from "@/views/Ingredients.vue";
import { mount } from "@vue/test-utils";

describe("IngredientsTab.vue", () => {
  it("renders tab 1 view", () => {
    const wrapper = mount(Tab1);
    expect(wrapper.text()).toMatch("Tab 1 page");
  });
});
