const admin = require("firebase-admin");
const { getFirestore, DocumentReference } = require("firebase-admin/firestore");
const {
  doc,
  setDoc,
  collection,
  addDoc,
  add,
  getDoc,
} = require("firebase/firestore");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

const shops = [
  {
    id: "1",
    name: "SHINE",
    address: {
      country: "Thailand",
      postal_code: "12130",
      province: "Pathum Thani",
      state: "Rangsit",
    },
    desc: "This is the best Shop",
    overall_rating: 1.5,
  },
  {
    id: "2",
    name: "SHINN",
    address: {
      country: "Thailand",
      postal_code: "12130",
      province: "Pathum Thani",
      state: "Rangsit",
    },
    desc: "SHINN SHOP",
    overall_rating: 1,
  },
  {
    id: "3",
    name: "NICE",
    address: {
      country: "Thailand",
      postal_code: "12130",
      province: "Pathum Thani",
      state: "Rangsit",
    },
    desc: "NICE SHOP",
    overall_rating: 1,
  },
  {
    id: "4",
    name: "PP",
    address: {
      country: "Thailand",
      postal_code: "12130",
      province: "Pathum Thani",
      state: "Rangsit",
    },
    desc: "PP's shops",
    overall_rating: 1.5,
  },
  {
    id: "5",
    name: "Food panda",
    address: {
      country: "Thailand",
      postal_code: "12130",
      province: "Pathum Thani",
      state: "Rangsit",
    },
    desc: "panda's shop",
    overall_rating: 1.5,
  },
  {
    id: "6",
    name: "Grabs",
    address: {
      country: "Thailand",
      postal_code: "12130",
      province: "Pathum Thani",
      state: "Rangsit",
    },
    desc: "Grab's shop",
    overall_rating: 1.5,
  },
  {
    id: "7",
    name: "Film Shop",
    address: {
      country: "Thailand",
      postal_code: "12130",
      province: "Pathum Thani",
      state: "Rangsit",
    },
    desc: "Film's shop",
    overall_rating: 1.5,
  },
  {
    id: "8",
    name: "Baby Noey",
    address: {
      country: "Thailand",
      postal_code: "12130",
      province: "Pathum Thani",
      state: "Rangsit",
    },
    desc: "babaynoey's shop",
    overall_rating: 1.5,
  },
  {
    id: "9",
    name: "BANKZA",
    address: {
      country: "Thailand",
      postal_code: "12130",
      province: "Pathum Thani",
      state: "Rangsit",
    },
    desc: "BANKZA's SHOP",
    overall_rating: 3,
  },
  {
    id: "10",
    name: "NOAH",
    address: {
      country: "Thailand",
      postal_code: "12130",
      province: "Pathum Thani",
      state: "Rangsit",
    },
    desc: "NOAAH SHOP",
    overall_rating: 1.5,
  },
];

const products = [
  {
    desc: "T-Shirt",
    name: "T-Shirt",
    overall_rating: 0,
    owner: "/shops/1",
    price: 12,
    qty: 3,
  },
  {
    desc: "Shorts",
    name: "Shorts",
    overall_rating: 0,
    owner: "/shops/1",
    price: 12,
    qty: 3,
  },
  {
    desc: "Hats",
    name: "Hat",
    overall_rating: 0,
    owner: "/shops/1",
    price: 12,
    qty: 3,
  },
  {
    desc: "Cowboy's hat",
    name: "Cowboy's Hats",
    overall_rating: 0,
    owner: "/shops/1",
    price: 12,
    qty: 3,
  },
  {
    desc: "Glasses",
    name: "Glasses",
    overall_rating: 0,
    owner: "/shops/2",
    price: 12,
    qty: 3,
  },
  {
    desc: "Jeans",
    name: "Jeans",
    overall_rating: 0,
    owner: "/shops/2",
    price: 12,
    qty: 3,
  },
  {
    desc: "Socks",
    name: "Happy socks",
    overall_rating: 0,
    owner: "/shops/3",
    price: 12,
    qty: 3,
  },
  {
    desc: "Blazer",
    name: "Blazers",
    overall_rating: 0,
    owner: "/shops/4",
    price: 12,
    qty: 3,
  },
  {
    desc: "Shirt",
    name: "Shirts",
    overall_rating: 0,
    owner: "/shops/5",
    price: 12,
    qty: 3,
  },
  {
    desc: "Tie",
    name: "Ties",
    overall_rating: 0,
    owner: "/shops/9",
    price: 12,
    qty: 3,
  },
];

const reviews = [
  {
    name: "Nut",
    product: "/products/1",
    review: "-",
    star: 2,
  },
  {
    name: "Dragon",
    product: "/products/1",
    review: "-",
    star: 1,
  },
  {
    name: "Benjamin",
    product: "/products/1",
    review: "-",
    star: 4,
  },
  {
    name: "Babynoey",
    product: "/products/1",
    review: "-",
    star: 5,
  },
  {
    name: "Tle",
    product: "/products/1",
    review: "-",
    star: 1,
  },
  {
    name: "Tle TNP",
    product: "/products/2",
    review: "-",
    star: 2,
  },
  {
    name: "Jda",
    product: "/products/2",
    review: "-",
    star: 3,
  },
  {
    name: "Pp za",
    product: "/products/2",
    review: "-",
    star: 3,
  },
  {
    name: "ggenaw",
    product: "/products/7",
    review: "-",
    star: 2,
  },
  {
    name: "Anonymous",
    product: "/products/8",
    review: "-",
    star: 1,
  },
];

console.log("Addding shops . . .");
shops.forEach(function (obj, index) {
  const shopRef = {
    name: obj.name,
    document_id: obj.id,
    address: obj.address,
    desc: obj.desc,
    overall_rating: obj.overall_rating,
    created_at: new Date(),
  };
  const id = index + 1;
  db.collection("shops")
    .doc(id.toString())
    .set(shopRef)
    .then((shop) => {
      console.log("Document added at " + shop.writeTime.toDate());
    });
});

console.log("Addding products . . .");
products.forEach(async function (obj, index) {
  const ownerRef = db.doc(obj.owner);

  const prodRef = {
    desc: obj.desc,
    name: obj.name,
    overall_rating: obj.overall_rating,
    owner: ownerRef,
    price: obj.price,
    qty: obj.qty,
  };
  const id = index + 1;
  db.collection("products")
    .doc(id.toString())
    .set(prodRef)
    .then((prod) => {
      console.log("Document added at " + prod.writeTime.toDate());
    });
});

console.log("Addding reviews . . .");
reviews.forEach(async function (obj, index) {
  const prodRef = db.doc(obj.product);

  const reviewRef = {
    name: obj.name,
    product: prodRef,
    review: "-",
    star: 3,
    created_at: new Date(),
  };
  const id = index + 1;
  db.collection("reviews")
    .doc(id.toString())
    .set(reviewRef)
    .then((review) => {
      console.log("Document added at " + review.writeTime.toDate());
    });
});
