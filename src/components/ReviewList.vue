<template>
  <div>
    <p class="flex text-2xl uppercase justify-center">
      Reviews! ({{ noOfReviews }})
    </p>
    <div
      class="grid grid-cols-3 gap-y-3 gap-x-3 grid-flow-row border-2 border-black p-3"
    >
      <NewReview
        class="h-32 p-3 bg-white font-light text-sm place-items-center border-2 border-black"
        @submitNewReview="submitNewReview"
      />
      <ReviewListItem
        v-for="(review, index) in computedReviews"
        :key="index"
        :name="review.name"
        :review="review.review"
        :star="review.star"
        :created="review.created_at.toDate()"
        :id="review.id"
        @del="deleteRe"
      />
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
  addDoc,
  updateDoc,
  deleteDoc,
getDocs,
} from "@firebase/firestore";
import db from "../firebase/init";
import ReviewListItem from "./ReviewListItem.vue";
import NewReview from "./NewReview.vue";
export default {
  name: "ReviewList",
  components: { ReviewListItem, NewReview },
  data() {
    return {
      reviews: [],
      noOfReviews: 0,
      allStar: 0,
    };
  },
  computed: {
    computedReviews() {
      return this.reviews ? this.reviews : [];
    },
  },
  created() {
    this.getReviews();
    this.$watch(
      () => this.$route.params.productId,
      () => {
        this.getReviews();
      }
    );
  },
  methods: {
    getReviews() {
      const review = query(
        collection(db, "reviews"),
        where(
          "product",
          "==",
          doc(db, "products", this.$route.params.productId)
        )
      );
      onSnapshot(review, async ({ docs }) => {
        console.log("in snap shot");
        this.reviews = [];
        this.allStar = 0;

        docs.forEach((doc) => {
          this.reviews.push({ id: doc.id, ...doc.data() });
          this.allStar += doc.data().star;
        });
        this.noOfReviews = (await getCountFromServer(review)).data().count;
      });
    },
    async submitNewReview(data) {
      let newReview = {
        ...data,
        created_at: new Date(),
        product: doc(db, "products", this.$route.params.productId),
      };
      const overall = (this.allStar + data.star) / (this.reviews.length + 1);
      await updateDoc(doc(db, "products", this.$route.params.productId), {
        overall_rating: overall,
      });
      await addDoc(collection(db, "reviews"), newReview);
      await this.updateShopOverall()
    },
    async deleteRe(id) {
      await deleteDoc(doc(db, "reviews", id.id));
      const overall =
        this.reviews.length == 0 ? 0 : this.allStar / this.reviews.length;
      await updateDoc(doc(db, "products", this.$route.params.productId), {
        overall_rating: overall,
      });
      await this.updateShopOverall()
    },
    async updateShopOverall() { 
      let shopAllStar = [];
      const q = query(
        collection(db, "products"),
        where(
          "owner",
          "==",
          doc(db, "shops", this.$route.params.shopId)
        )
      )
      const querysnap = await getDocs(q);
  
      querysnap.forEach((doc) => {
        shopAllStar.push(doc.data().overall_rating);
      })
      console.log("all star prod => " + shopAllStar);

      const overall = shopAllStar.length == 0 ? 0 : (shopAllStar.reduce((a, b) => a + b, 0) / shopAllStar.length)
      console.log("new shop overall => " + overall);
      await updateDoc(doc(db, "shops", this.$route.params.shopId), {overall_rating: overall})
      console.log("shop updated");
    }
  },
};
</script>

<style lang="scss" scoped></style>
