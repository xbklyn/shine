import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/shop/:shopId",
      name: "ShopInfo",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/ShopView.vue"),
    },
    {
      path: "/shop/:shopId/:productId",
      name: "ProductInfo",
      component: () => import("../views/ShopView.vue"),
    },
  ],
});

export default router;
