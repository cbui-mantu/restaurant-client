import { createRouter, createWebHistory } from "vue-router";
import RestaurantsList from "../views/RestaurentsList.vue";
import RestaurantCreate from "../views/RestaurantCreate.vue";
import RestaurantEdit from "../views/RestaurantEdit.vue";

const routes = [
  { path: "/", name: "list", component: RestaurantsList },
  { path: "/new", name: "create", component: RestaurantCreate },
  { path: "/edit/:id", name: "edit", component: RestaurantEdit, props: true },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
