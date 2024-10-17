import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { isAuthenticated } from "@/utils/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: HomeView,
  },
  /*{
    path: "/register",
    name: "register",
    component: () => import("@/views/users/UserRegister.vue"),
  },*/
  {
    path: "/recipes",
    name: "recipes",
    component: () => import("@/views/recipes/RecipeList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/recipes/add",
    name: "add-recipe",
    component: () => import("@/views/recipes/RecipeForm.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/recipes/edit/:id",
    name: "edit-recipe",
    component: () => import("@/views/recipes/RecipeForm.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Add a global navigation guard
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // This route requires authentication, check if logged in
    if (!isAuthenticated()) {
      // Not authenticated, redirect to login page
      next({ name: "login" });
    } else {
      // Authenticated, proceed to the route
      next();
    }
  } else {
    // No authentication required, proceed to the route
    next();
  }
});

export default router;
