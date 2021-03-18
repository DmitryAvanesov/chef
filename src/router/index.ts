import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Tabs from "../views/Tabs.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Tabs,
    children: [
      {
        path: "",
        redirect: "/ingredients",
      },
      {
        path: "ingredients",
        component: () => import("@/views/Ingredients.vue"),
      },
      {
        path: "units",
        component: () => import("@/views/Units.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
