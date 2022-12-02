<template>
  <div class="mt-52 mb-8 grid mx-40 grid-cols-2 gap-x-3 justify-center h-full">
    <ShopList />
    <!-- <ProductList /> -->
    <router-view></router-view>
  </div>
  <div
    v-if="this.$route.params.shopId && this.$route.params.productId"
    class="grid grid-cols-1 mx-40 justify-self-center"
  >
    <ReviewList />
  </div>
</template>

<script>
import ShopList from "./components/ShopList.vue";
import ReviewList from "./components/ReviewList.vue";
export default {
  name: "HomeView",
  title: "Home - 63130500026",
  components: { ShopList, ReviewList },
};
</script>

<style lang="scss" scoped></style>
