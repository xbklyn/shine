<template>
  <div
    class="bg-white font-light text-sm grid place-items-center border border-blue-600 text-blue-600 hover:bg-blue-600 hover:border-none hover:text-white hover:border-2 duration-150"
    @click="go(shop.id)"
  >
    <div class="w-full grid grid-flow-row">
      <div class="p-3 flex justify-between">
        <div class="text-xl font-bold">
          {{ shop.name }}
          <span class="pl-2 text-xs font-normal">{{ getLocation() }}</span>
        </div>
        <div class="text-sm">Since : {{ getDate() }}</div>
      </div>
      <div class="px-3 pb-3 flex justify-between">
        <p>Description : {{ shop.desc }}</p>
        <div class="flex items-center">
          <p class="pr-1 font-semibold">Overall Ratings</p>
          <img
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
import dayjs from "dayjs";
export default {
  name: "ShopListItemComponent",
  props: {
    shop: {
      type: Object,
      required: true,
    },
  },
  computed: {
    computedRating() {
      return Math.floor(this.shop.overall_rating);
    },
  },
  methods: {
    go(id) {
      this.$router.push(`/shop/${id}`);
    },
    getDate() {
      const date = this.shop.created_at.toDate();
      return dayjs(date).format("YYYY, MMM d , hh:mm");
    },
    getLocation() {
      return `${this.shop.address.state}, ${this.shop.address.country} ${this.shop.address.postal_code}`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
