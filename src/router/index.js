import { createRouter, createWebHistory } from "vue-router";
import RestaurantsList from "../views/RestaurentsList.vue";
import RestaurantCreate from "../views/RestaurantCreate.vue";
import RestaurantEdit from "../views/RestaurantEdit.vue";
import Login from "../views/Login.vue";
import { isAuthenticated, isAdmin } from "../models/userModel";

const routes = [
  { path: "/login", name: "login", component: Login },
  {
    path: "/",
    name: "list",
    component: RestaurantsList,
    meta: { requiresAuth: true },
  },
  {
    path: "/new",
    name: "create",
    component: RestaurantCreate,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: RestaurantEdit,
    props: true,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.name === "login") return true;
  if (to.meta?.requiresAuth && !isAuthenticated.value) {
    return { name: "login", query: { redirect: to.fullPath } };
  }
  if (to.meta?.requiresAdmin && !isAdmin.value) {
    return { name: "list" };
  }
  return true;
});
