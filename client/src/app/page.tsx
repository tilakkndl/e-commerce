"use client";
import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { fetchAllProducts } from "@/lib/features/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import Product from "@/types/product.types";
import { Review } from "@/types/review.types";
import { useEffect, useState } from "react";
import { setRelatedProductData } from "@/lib/features/products/productsSlice";

import About from "@/components/homepage/About/About";
export const topSellingData: Product[] = [
  {
    _id: "67bcd3cfe01f59980a9eff51",
    name: "dfa",
    brand: {
      _id: "67b85febc0ad5eb6786982d5",
      brand: "Nike",
      __v: 0,
    },
    category: {
      _id: "67bc8c6910042b46ed451b3d",
      category: "bag",
      __v: 0,
    },
    price: 500,
    style: "casual",
    age: "adult",
    sex: "male",
    status: "active",
    discount: 10,
    description: "adfadf",
    avgRating: 0,
    reviews: [],
    variants: [
      {
        color: "red",
        hexColor: "#e85e5e",
        size: ["small"],
        gallery: [
          {
            public_id: "uploads/products/dfa/fqikmkt7tgidub1nug5u",
            url: "https://res.cloudinary.com/dgmf8dtub/image/upload/v1740428239/uploads/products/dfa/fqikmkt7tgidub1nug5u.jpg",
            _id: "67bcd3cfe01f59980a9eff53",
          },
          {
            public_id: "uploads/products/dfa/lorrkdakl0crz5qdon03",
            url: "https://res.cloudinary.com/dgmf8dtub/image/upload/v1740428239/uploads/products/dfa/lorrkdakl0crz5qdon03.png",
            _id: "67bcd3cfe01f59980a9eff54",
          },
        ],
        stock: 1,
        _id: "67bcd3cfe01f59980a9eff52",
      },
    ],
    createdAt: "2025-02-24T20:17:19.589Z",
    updatedAt: "2025-02-24T20:17:19.589Z",
    __v: 0,
  },
  {
    _id: "67bd4579fae9a48f5c1e559d",
    name: "Sante MUg",
    brand: {
      _id: "67b85febc0ad5eb6786982d5",
      brand: "Nike",
      __v: 0,
    },
    category: {
      _id: "67bc8c6910042b46ed451b3d",
      category: "bag",
      __v: 0,
    },
    price: 200,
    style: "casual",
    age: "adult",
    sex: "male",
    status: "active",
    discount: 10,
    description: "Chakka sante",
    avgRating: 0,
    reviews: [],
    variants: [
      {
        color: "Pink",
        hexColor: "#da16c0",
        size: ["small"],
        gallery: [
          {
            public_id: "uploads/products/Sante MUg/pkiwiseuyquyn0lfzaa5",
            url: "https://res.cloudinary.com/dgmf8dtub/image/upload/v1740457336/uploads/products/Sante%20MUg/pkiwiseuyquyn0lfzaa5.jpg",
            _id: "67bd4579fae9a48f5c1e559f",
          },
        ],
        stock: 1,
        _id: "67bd4579fae9a48f5c1e559e",
      },
    ],
    createdAt: "2025-02-25T04:22:17.585Z",
    updatedAt: "2025-02-25T04:22:17.585Z",
    __v: 0,
  },
  {
    _id: "67bd64defae9a48f5c1e6fc6",
    name: "shoes",
    brand: {
      _id: "67b85febc0ad5eb6786982d5",
      brand: "Nike",
      __v: 0,
    },
    category: {
      _id: "67bc8c6910042b46ed451b3d",
      category: "bag",
      __v: 0,
    },
    price: 5000,
    style: "casual",
    age: "adult",
    sex: "male",
    status: "active",
    discount: 0,
    description: "dlfja",
    avgRating: 0,
    reviews: [],
    variants: [
      {
        color: "black",
        hexColor: "#0a0a0a",
        size: ["small"],
        gallery: [
          {
            public_id: "uploads/products/shoes/fdula1afpsoezucjxyzw",
            url: "https://res.cloudinary.com/dgmf8dtub/image/upload/v1740465373/uploads/products/shoes/fdula1afpsoezucjxyzw.jpg",
            _id: "67bd64defae9a48f5c1e6fc8",
          },
        ],
        stock: 1,
        _id: "67bd64defae9a48f5c1e6fc7",
      },
    ],
    createdAt: "2025-02-25T06:36:14.210Z",
    updatedAt: "2025-02-25T06:36:14.210Z",
    __v: 0,
  },
  {
    _id: "67bd65e6fae9a48f5c1e6fcd",
    name: "kale",
    brand: {
      _id: "67b85febc0ad5eb6786982d5",
      brand: "Nike",
      __v: 0,
    },
    category: {
      _id: "67bc8c6910042b46ed451b3d",
      category: "bag",
      __v: 0,
    },
    price: 100,
    style: "casual",
    age: "adult",
    sex: "male",
    status: "active",
    discount: 0,
    description: "he is black",
    avgRating: 0,
    reviews: [],
    variants: [
      {
        color: "Black",
        hexColor: "#000000",
        size: ["small"],
        gallery: [
          {
            public_id: "uploads/products/kale/utfixe3pvestz2cxic9n",
            url: "https://res.cloudinary.com/dgmf8dtub/image/upload/v1740465637/uploads/products/kale/utfixe3pvestz2cxic9n.jpg",
            _id: "67bd65e6fae9a48f5c1e6fcf",
          },
        ],
        stock: 1,
        _id: "67bd65e6fae9a48f5c1e6fce",
      },
    ],
    createdAt: "2025-02-25T06:40:38.418Z",
    updatedAt: "2025-02-25T06:40:38.418Z",
    __v: 0,
  },
];

export const relatedProductData: Product[] = [
  {
    _id: "67bcd3cfe01f59980a9eff51",
    name: "dfa",
    brand: {
      _id: "67b85febc0ad5eb6786982d5",
      brand: "Nike",
      __v: 0,
    },
    category: {
      _id: "67bc8c6910042b46ed451b3d",
      category: "bag",
      __v: 0,
    },
    price: 500,
    style: "casual",
    age: "adult",
    sex: "male",
    status: "active",
    discount: 10,
    description: "adfadf",
    avgRating: 0,
    reviews: [],
    variants: [
      {
        color: "red",
        hexColor: "#e85e5e",
        size: ["small"],
        gallery: [
          {
            public_id: "uploads/products/dfa/fqikmkt7tgidub1nug5u",
            url: "https://res.cloudinary.com/dgmf8dtub/image/upload/v1740428239/uploads/products/dfa/fqikmkt7tgidub1nug5u.jpg",
            _id: "67bcd3cfe01f59980a9eff53",
          },
          {
            public_id: "uploads/products/dfa/lorrkdakl0crz5qdon03",
            url: "https://res.cloudinary.com/dgmf8dtub/image/upload/v1740428239/uploads/products/dfa/lorrkdakl0crz5qdon03.png",
            _id: "67bcd3cfe01f59980a9eff54",
          },
        ],
        stock: 1,
        _id: "67bcd3cfe01f59980a9eff52",
      },
    ],
    createdAt: "2025-02-24T20:17:19.589Z",
    updatedAt: "2025-02-24T20:17:19.589Z",
    __v: 0,
  },
  {
    _id: "67bd4579fae9a48f5c1e559d",
    name: "Sante MUg",
    brand: {
      _id: "67b85febc0ad5eb6786982d5",
      brand: "Nike",
      __v: 0,
    },
    category: {
      _id: "67bc8c6910042b46ed451b3d",
      category: "bag",
      __v: 0,
    },
    price: 200,
    style: "casual",
    age: "adult",
    sex: "male",
    status: "active",
    discount: 10,
    description: "Chakka sante",
    avgRating: 0,
    reviews: [],
    variants: [
      {
        color: "Pink",
        hexColor: "#da16c0",
        size: ["small"],
        gallery: [
          {
            public_id: "uploads/products/Sante MUg/pkiwiseuyquyn0lfzaa5",
            url: "https://res.cloudinary.com/dgmf8dtub/image/upload/v1740457336/uploads/products/Sante%20MUg/pkiwiseuyquyn0lfzaa5.jpg",
            _id: "67bd4579fae9a48f5c1e559f",
          },
        ],
        stock: 1,
        _id: "67bd4579fae9a48f5c1e559e",
      },
    ],
    createdAt: "2025-02-25T04:22:17.585Z",
    updatedAt: "2025-02-25T04:22:17.585Z",
    __v: 0,
  },
  {
    _id: "67bd64defae9a48f5c1e6fc6",
    name: "shoes",
    brand: {
      _id: "67b85febc0ad5eb6786982d5",
      brand: "Nike",
      __v: 0,
    },
    category: {
      _id: "67bc8c6910042b46ed451b3d",
      category: "bag",
      __v: 0,
    },
    price: 5000,
    style: "casual",
    age: "adult",
    sex: "male",
    status: "active",
    discount: 0,
    description: "dlfja",
    avgRating: 0,
    reviews: [],
    variants: [
      {
        color: "black",
        hexColor: "#0a0a0a",
        size: ["small"],
        gallery: [
          {
            public_id: "uploads/products/shoes/fdula1afpsoezucjxyzw",
            url: "https://res.cloudinary.com/dgmf8dtub/image/upload/v1740465373/uploads/products/shoes/fdula1afpsoezucjxyzw.jpg",
            _id: "67bd64defae9a48f5c1e6fc8",
          },
        ],
        stock: 1,
        _id: "67bd64defae9a48f5c1e6fc7",
      },
    ],
    createdAt: "2025-02-25T06:36:14.210Z",
    updatedAt: "2025-02-25T06:36:14.210Z",
    __v: 0,
  },
  {
    _id: "67bd65e6fae9a48f5c1e6fcd",
    name: "kale",
    brand: {
      _id: "67b85febc0ad5eb6786982d5",
      brand: "Nike",
      __v: 0,
    },
    category: {
      _id: "67bc8c6910042b46ed451b3d",
      category: "bag",
      __v: 0,
    },
    price: 100,
    style: "casual",
    age: "adult",
    sex: "male",
    status: "active",
    discount: 0,
    description: "he is black",
    avgRating: 0,
    reviews: [],
    variants: [
      {
        color: "Black",
        hexColor: "#000000",
        size: ["small"],
        gallery: [
          {
            public_id: "uploads/products/kale/utfixe3pvestz2cxic9n",
            url: "https://res.cloudinary.com/dgmf8dtub/image/upload/v1740465637/uploads/products/kale/utfixe3pvestz2cxic9n.jpg",
            _id: "67bd65e6fae9a48f5c1e6fcf",
          },
        ],
        stock: 1,
        _id: "67bd65e6fae9a48f5c1e6fce",
      },
    ],
    createdAt: "2025-02-25T06:40:38.418Z",
    updatedAt: "2025-02-25T06:40:38.418Z",
    __v: 0,
  },
];

export const reviewsData: Review[] = [
  {
    id: 1,
    user: "Alex K.",
    content: "Absolutely love this bag! Perfect size and so durable!",
    rating: 5,
    date: "August 14, 2024",
  },
  {
    id: 2,
    user: "Sarah M.",
    content: `Great quality, and I feel good knowing its eco-friendly.`,
    rating: 5,
    date: "September 15, 2024",
  },
  {
    id: 3,
    user: "Alex K.",
    content: "Absolutely love this bag! Perfect size and so durable!",
    rating: 5,
    date: "August 14, 2024",
  },
  {
    id: 4,
    user: "Sarah M.",
    content: `Great quality, and I feel good knowing its eco-friendly.`,
    rating: 5,
    date: "September 15, 2024",
  },
  {
    id: 5,
    user: "Alex K.",
    content: "Absolutely love this bag! Perfect size and so durable!",
    rating: 5,
    date: "August 14, 2024",
  },
  {
    id: 6,
    user: "Sarah M.",
    content: `Great quality, and I feel good knowing its eco-friendly.`,
    rating: 5,
    date: "September 15, 2024",
  },
];

export default function Home() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.admin.products);
  const [newArrivalsData, setNewArrivalsData] = useState<Product[]>([]);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(setRelatedProductData([...products]));
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      // Sort products by `created_at` in descending order and take the top 4
      const sortedProducts = [...products]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 4);
      setNewArrivalsData(sortedProducts);
    }
  }, [products]);

  return (
    <>
      <Header />
      {/* <Brands /> */}
      <main className="my-[50px] sm:my-[72px]">
        <ProductListSec
          title="NEW ARRIVALS"
          data={newArrivalsData}
          viewAllLink="/shop#new-arrivals"
        />
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        {/* <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="top selling"
            data={topSellingData}
            viewAllLink="/shop#top-selling"
          />
        </div> */}
        <About />
        <div className="mb-[50px] sm:mb-20">
          <DressStyle />
        </div>
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}
