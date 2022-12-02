<template>
  <div class="">
    <div class="flex justify-between">
      <p class="text-xl font-bold">Write an review!</p>
      <div
        class="px-2 py-1 bg-white font-light text-sm grid place-items-center border border-blue-600 text-blue-600 hover:bg-blue-600 hover:border-none hover:text-white duration-150"
        @click="submitNewReview"
      >
        Review!
      </div>
    </div>
    <div class="pt-3 flex justify-between">
      <div class="pl-3">
        <label for="name">Name : </label>
        <input
          class="border-b border-black text-blue-600"
          v-model="name"
          type="text"
          id="name"
        />
      </div>
      <div class="pr-8">
        <label for="star">Rate : </label>
        <input
          class="border-b border-black text-blue-600"
          v-model="star"
          type="number"
          id="star"
          min="1"
          max="5"
        />
      </div>
    </div>
    <div class="pl-3 pt-3 flex justify-start">
      <label for="review">What do you think? : </label>
      <input
        class="border-b border-black w-44 text-blue-600"
        v-model="review"
        type="text"
        id="name"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "NewReviewComponent",
  data() {
    return {
      name: "",
      review: "",
      star: 1,
    };
  },
  methods: {
    submitNewReview() {
      this.$emit("submitNewReview", {
        name: this.name ? this.name : "Anonymous",
        review: this.review ? this.review : "-",
        star: this.star,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
