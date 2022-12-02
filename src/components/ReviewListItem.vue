<template>
  <div
    class="h-32 p-3 bg-white font-light text-sm place-items-center border border-blue-600 text-blue-600"
  >
    <div class="">
      <div class="flex justify-between">
        <p class="text-xl font-bold">{{ name }}</p>
        <div class="flex">
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
      <div>
        <div class="flex justify-between">
          <div>Says : {{ review }}</div>
          <div class="text-xs">
            {{ getDate() }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="mt-3 px-2 py-1 pt- bg-white font-light text-sm grid place-items-center border border-red-600 text-red-600 hover:bg-red-600 hover:border-none hover:text-white duration-150 w-fit"
      @click="del()"
    >
      Delete!
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "ReviewListItem",
  props: {
    name: {
      tpye: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    star: {
      type: Number,
      required: true,
    },
    created: {
      type: Date,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    computedRating() {
      return Math.floor(this.star);
    },
  },
  methods: {
    getDate() {
      return dayjs(this.created).format("YYYY/MM/DD");
    },
    del() {
      this.$emit("del", { id: this.id });
    },
  },
};
</script>

<style lang="scss" scoped></style>
