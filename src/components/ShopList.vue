<template>
  <div class="">
    <h1 class="uppercase text-2xl">Shop Lists ({{ noOfShops }})</h1>
    <div class="pt-3 space-y-3 border-2 border-black p-3">
      <ShopListItem
        v-for="(shop, index) in computedShop"
        :key="index"
        :shop="shop"
      />
    </div>
  </div>
</template>

<script>
import { onSnapshot, collection, getCountFromServer } from "firebase/firestore";
import db from "../firebase/init";
import ShopListItem from "./ShopListItem.vue";
export default {
  name: "ShopListComponent",
  components: { ShopListItem },
  data() {
    return {
      shops: [],
      noOfShops: 0,
    };
  },
  computed: {
    computedShop() {
      return this.shops ? this.shops : [];
    },
  },
  created() {
    this.getShops();
  },
  methods: {
    getShops() {
      const shops = collection(db, "shops");
      onSnapshot(shops, async ({ docs }) => {
        this.noOfShops = (await getCountFromServer(shops)).data().count;
        this.shops = [];
        docs.forEach((doc) => {
          this.shops.push({ id: doc.id, ...doc.data() });
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
