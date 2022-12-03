<template>
  <div class="">
    <h1 class="uppercase text-2xl">Products ({{ noOfProducts }})</h1>
    <div
      v-if="computedProduct.length != 0"
      class="pt-3 space-y-3 p-3 w-full border-2 border-black"
    >
      <ProductListItem
        v-for="(product, index) in computedProduct"
        :key="index"
        :product="product"
      />
    </div>
    <div
      v-else
      class="pt-3 space-y-3 w-full text-red-500 text-lg font-bold uppercase"
    >
      This shop has no products
    </div>
  </div>
</template>

<script>
import {
  collection,
  doc,
  onSnapshot,
  where,
  query,
  getCountFromServer,
} from "@firebase/firestore";
import db from "../firebase/init";
import ProductListItem from "./ProductListItem.vue";

export default {
  name: "ProductListComponent",
  components: { ProductListItem },
  data() {
    return {
      products: [],
      noOfProducts: 0,
    };
  },
  computed: {
    computedProduct() {
      return this.products ? this.products : [];
    },
  },
  created() {
    this.getProducts();
    this.$watch(
      () => this.$route.params.shopId,
      () => {
        this.getProducts();
      }
    );
  },
  methods: {
    getProducts() {
      const products = query(
        collection(db, "products"),
        where("owner", "==", doc(db, "shops", this.$route.params.shopId))
      );
      onSnapshot(products, async ({ docs }) => {
        this.noOfProducts = (await getCountFromServer(products)).data().count;
        this.products = [];
        docs.forEach((doc) => {
          this.products.push({ id: doc.id, ...doc.data() });
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
