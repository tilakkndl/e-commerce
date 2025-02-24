import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";
import { useEffect } from "react";

export const newArrivalsData: Product[] = [
  {
    product_id: 1,
    name: "Crossbody Hemp Round Bag",
    description: "A stylish round hemp bag perfect for daily use.",
    gallery: ["/images/pic1.png", "/images/pic10.png", "/images/pic11.png"],
    price: 29.55,
    status: "active",
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
    brand: "HempWear",
    sex: "unisex",
    age: "adult",
    stock: [
      { size: "M", quantity: "15" },
      { size: "L", quantity: "10" },
    ],
    category: "accessories",
    available_colors: ["natural", "brown"],
    style: "casual",
    created_at: "2025-02-16;10:00:00",
  },
  {
    product_id: 2,
    name: "Crossbody Hemp Multipocketed Bag",
    description:
      "Multipocketed hemp bag with ample storage for your essentials.",
    gallery: ["/images/pic2.png"],
    price: 33.55,
    status: "active",
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 3.5,
    brand: "HempWear",
    sex: "unisex",
    age: "adult",
    stock: [{ size: "M", quantity: "20" }],
    category: "accessories",
    available_colors: ["green", "beige"],
    style: "casual",
    created_at: "2025-02-16;10:15:00",
  },
  {
    product_id: 3,
    name: "Crossbody Hemp Ladies Purse",
    description: "Chic and eco-friendly purse made from hemp material.",
    gallery: ["/images/pic3.png"],
    price: 40.55,
    status: "active",
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
    brand: "HempWear",
    sex: "female",
    age: "adult",
    stock: [{ size: "S", quantity: "30" }],
    category: "accessories",
    available_colors: ["black", "brown"],
    style: "casual",
    created_at: "2025-02-16;10:30:00",
  },
  {
    product_id: 4,
    name: "Hemp Tote Bag",
    description:
      "Eco-friendly tote bag made from hemp fabric for everyday use.",
    gallery: ["/images/pic4.png", "/images/pic10.png", "/images/pic11.png"],
    price: 25.55,
    status: "active",
    discount: {
      amount: 0,
      percentage: 30,
    },
    rating: 4.5,
    brand: "HempWear",
    sex: "unisex",
    age: "adult",
    stock: [{ size: "L", quantity: "25" }],
    category: "accessories",
    available_colors: ["gray", "beige"],
    style: "casual",
    created_at: "2025-02-16;10:45:00",
  },
  {
    product_id: 5,
    name: "Hemp Wallet",
    description: "Compact and durable hemp wallet for daily use.",
    gallery: ["/images/pic1.png", "/images/pic10.png", "/images/pic11.png"],
    price: 15.55,
    status: "active",
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
    brand: "HempWear",
    sex: "unisex",
    age: "adult",
    stock: [{ size: "One Size", quantity: "50" }],
    category: "accessories",
    available_colors: ["black", "brown"],
    style: "casual",
    created_at: "2025-02-16;11:00:00",
  },
  {
    product_id: 6,
    name: "Hemp Socks",
    description: "Comfortable hemp socks with a soft texture.",
    gallery: ["/images/pic4.png", "/images/pic10.png", "/images/pic11.png"],
    price: 7.55,
    status: "active",
    discount: {
      amount: 0,
      percentage: 30,
    },
    rating: 4.5,
    brand: "HempWear",
    sex: "unisex",
    age: "adult",
    stock: [
      { size: "M", quantity: "40" },
      { size: "L", quantity: "30" },
    ],
    category: "accessories",
    available_colors: ["gray", "beige"],
    style: "casual",
    created_at: "2025-02-16;11:15:00",
  },
];

export const topSellingData: Product[] = [
  {
    product_id: 5,
    name: "Tibetan Mandala Jacket + Trouser Set",
    description: "Beautiful Tibetan mandala jacket and trouser set.",
    gallery: ["/images/pic5.png", "/images/pic10.png", "/images/pic11.png"],
    price: 55.55,
    status: "active",
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 5.0,
    brand: "TibetWear",
    sex: "unisex",
    age: "adult",
    stock: [
      { size: "M", quantity: "20" },
      { size: "L", quantity: "15" },
    ],
    category: "clothing",
    available_colors: ["blue", "red"],
    style: "ethnic",
    created_at: "2024-02-06;09:50:15",
  },
  {
    product_id: 6,
    name: "Patchwork Fleece Jacket",
    description: "Warm and stylish patchwork fleece jacket.",
    gallery: ["/images/pic6.png", "/images/pic10.png", "/images/pic11.png"],
    price: 45.55,
    status: "active",
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.0,
    brand: "TibetWear",
    sex: "unisex",
    age: "adult",
    stock: [
      { size: "S", quantity: "25" },
      { size: "XL", quantity: "10" },
    ],
    category: "clothing",
    available_colors: ["gray", "brown"],
    style: "casual",
    created_at: "2024-02-06;09:50:15",
  },
];

export const relatedProductData: Product[] = [
  {
    product_id: 1,
    name: "Crossbody Hemp Round Bag",
    description: "A stylish round hemp bag perfect for daily use.",
    gallery: ["/images/pic1.png", "/images/pic10.png", "/images/pic11.png"],
    price: 29.55,
    status: "active",
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
    brand: "HempWear",
    sex: "unisex",
    age: "adult",
    stock: [
      { size: "M", quantity: "15" },
      { size: "L", quantity: "10" },
    ],
    category: "accessories",
    available_colors: ["natural", "brown"],
    style: "casual",
    created_at: "2025-02-16;10:00:00",
  },
  {
    product_id: 2,
    name: "Crossbody Hemp Multipocketed Bag",
    description:
      "Multipocketed hemp bag with ample storage for your essentials.",
    gallery: ["/images/pic2.png"],
    price: 33.55,
    status: "active",
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 3.5,
    brand: "HempWear",
    sex: "unisex",
    age: "adult",
    stock: [{ size: "M", quantity: "20" }],
    category: "accessories",
    available_colors: ["green", "beige"],
    style: "casual",
    created_at: "2025-02-16;10:15:00",
  },
  {
    product_id: 3,
    name: "Crossbody Hemp Ladies Purse",
    description: "Chic and eco-friendly purse made from hemp material.",
    gallery: ["/images/pic3.png"],
    price: 40.55,
    status: "active",
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
    brand: "HempWear",
    sex: "female",
    age: "adult",
    stock: [{ size: "S", quantity: "30" }],
    category: "accessories",
    available_colors: ["black", "brown"],
    style: "casual",
    created_at: "2025-02-16;10:30:00",
  },
  {
    product_id: 4,
    name: "Hemp Tote Bag",
    description:
      "Eco-friendly tote bag made from hemp fabric for everyday use.",
    gallery: ["/images/pic4.png", "/images/pic10.png", "/images/pic11.png"],
    price: 25.55,
    status: "active",
    discount: {
      amount: 0,
      percentage: 30,
    },
    rating: 4.5,
    brand: "HempWear",
    sex: "unisex",
    age: "adult",
    stock: [{ size: "L", quantity: "25" }],
    category: "accessories",
    available_colors: ["gray", "beige"],
    style: "casual",
    created_at: "2025-02-16;10:45:00",
  },
  {
    product_id: 5,
    name: "Hemp Wallet",
    description: "Compact and durable hemp wallet for daily use.",
    gallery: ["/images/pic1.png", "/images/pic10.png", "/images/pic11.png"],
    price: 15.55,
    status: "active",
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
    brand: "HempWear",
    sex: "unisex",
    age: "adult",
    stock: [{ size: "One Size", quantity: "50" }],
    category: "accessories",
    available_colors: ["black", "brown"],
    style: "casual",
    created_at: "2025-02-16;11:00:00",
  },
  {
    product_id: 6,
    name: "Hemp Socks",
    description: "Comfortable hemp socks with a soft texture.",
    gallery: ["/images/pic4.png", "/images/pic10.png", "/images/pic11.png"],
    price: 7.55,
    status: "active",
    discount: {
      amount: 0,
      percentage: 30,
    },
    rating: 4.5,
    brand: "HempWear",
    sex: "unisex",
    age: "adult",
    stock: [
      { size: "M", quantity: "40" },
      { size: "L", quantity: "30" },
    ],
    category: "accessories",
    available_colors: ["gray", "beige"],
    style: "casual",
    created_at: "2025-02-16;11:15:00",
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
  return (
    <>
      <Header />
      <Brands />
      <main className="my-[50px] sm:my-[72px]">
        <ProductListSec
          title="NEW ARRIVALS"
          data={newArrivalsData}
          viewAllLink="/shop#new-arrivals"
        />
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="top selling"
            data={topSellingData}
            viewAllLink="/shop#top-selling"
          />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <DressStyle />
        </div>
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}
