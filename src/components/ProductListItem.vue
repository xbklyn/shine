<template>
  <div
    class="w-full bg-white font-light text-sm grid place-items-center border border-blue-600 text-blue-600 hover:bg-blue-600 hover:border-none hover:text-white hover:border-2 duration-150"
    @click="go(product.id)"
  >
    <div class="w-full grid grid-flow-row">
      <div class="p-3 flex justify-between">
        <div class="text-xl font-bold">{{ product.name }}</div>
        <div class="text-lg">Price : {{ product.price }}</div>
      </div>
      <div class="px-3 pb-3 flex justify-between">
        <p class="">Description : {{ product.desc }}</p>
        <div class="flex items-center">
          <p class="pr-1 font-semibold">Ratings</p>
          <div v-if="computedRating > 4" class="flex">
            <img class="w-4 h-4 pr-1" src="/images/star.png" alt="star" />
            x{{ computedRating }}
          </div>
          <img
            v-else
            v-for="index in computedRating"
            :key="index"
            class="w-4 h-4"
            src="/images/star.png"
            alt="star"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductListItem",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    computedRating() {
      return Math.floor(this.product.overall_rating);
    },
  },
  methods: {
    go(id) {
      this.$router.push(`/shop/${this.$route.params.shopId}/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
