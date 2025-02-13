import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";

export const newArrivalsData: Product[] = [
  {
    id: 1,
    title: "Crossbody Hemp Round Bag",
    srcUrl: "/images/pic1.png",
    gallery: ["/images/pic1.png", "/images/pic10.png", "/images/pic11.png"],
    price: 29.55,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },
  {
    id: 2,
    title: "Crossbody Hemp Multipocketed Bag",
    srcUrl: "/images/pic2.png",
    gallery: ["/images/pic2.png"],
    price: 33.55,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 3.5,
  },
  {
    id: 3,
    title: "Crossbody Hemp Ladies purse",
    srcUrl: "/images/pic3.png",
    gallery: ["/images/pic3.png"],
    price: 40.55,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },
  {
    id: 4,
    title: "Hemp Tote Bag",
    srcUrl: "/images/pic4.png",
    gallery: ["/images/pic4.png", "/images/pic10.png", "/images/pic11.png"],
    price: 25.55,
    discount: {
      amount: 0,
      percentage: 30,
    },
    rating: 4.5,
  },
  {
    id: 5,
    title: "Hemp Wallet",
    srcUrl: "/images/pic1.png",
    gallery: ["/images/pic1.png", "/images/pic10.png", "/images/pic11.png"],
    price: 15.55,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },

  {
    id: 6,
    title: "Hemp Socks",
    srcUrl: "/images/pic4.png",
    gallery: ["/images/pic4.png", "/images/pic10.png", "/images/pic11.png"],
    price: 7.55,
    discount: {
      amount: 0,
      percentage: 30,
    },
    rating: 4.5,
  }
];

export const topSellingData: Product[] = [
  {
    id: 5,
    title: "Tibetan Mandala Jacket + Trouser Set",
    srcUrl: "/images/pic5.png",
    gallery: ["/images/pic5.png", "/images/pic10.png", "/images/pic11.png"],
    price: 55.55,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 5.0,
  },
  {
    id: 6,
    title: "Patchwork Fleece Jacket",
    srcUrl: "/images/pic6.png",
    gallery: ["/images/pic6.png", "/images/pic10.png", "/images/pic11.png"],
    price: 45.55,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.0,
  }
 
];

export const relatedProductData: Product[] = [
    {
        id: 1,
        title: "Crossbody Hemp Round Bag",
        srcUrl: "/images/pic1.png",
        gallery: ["/images/pic1.png", "/images/pic10.png", "/images/pic11.png"],
        price: 29.55,
        discount: {
          amount: 0,
          percentage: 0,
        },
        rating: 4.5,
      },
      {
        id: 2,
        title: "Crossbody Hemp Multipocketed Bag",
        srcUrl: "/images/pic2.png",
        gallery: ["/images/pic2.png"],
        price: 33.55,
        discount: {
          amount: 0,
          percentage: 20,
        },
        rating: 3.5,
      },
      {
        id: 3,
        title: "Crossbody Hemp Ladies purse",
        srcUrl: "/images/pic3.png",
        gallery: ["/images/pic3.png"],
        price: 40.55,
        discount: {
          amount: 0,
          percentage: 0,
        },
        rating: 4.5,
      },
      {
        id: 4,
        title: "Hemp Tote Bag",
        srcUrl: "/images/pic4.png",
        gallery: ["/images/pic4.png", "/images/pic10.png", "/images/pic11.png"],
        price: 25.55,
        discount: {
          amount: 0,
          percentage: 30,
        },
        rating: 4.5,
      },
      {
        id: 5,
        title: "Hemp Wallet",
        srcUrl: "/images/pic1.png",
        gallery: ["/images/pic1.png", "/images/pic10.png", "/images/pic11.png"],
        price: 15.55,
        discount: {
          amount: 0,
          percentage: 0,
        },
        rating: 4.5,
      },
    
      {
        id: 6,
        title: "Hemp Socks",
        srcUrl: "/images/pic4.png",
        gallery: ["/images/pic4.png", "/images/pic10.png", "/images/pic11.png"],
        price: 7.55,
        discount: {
          amount: 0,
          percentage: 30,
        },
        rating: 4.5,
      }
];

export const reviewsData: Review[] = [
  {
    id: 1,
    user: "Alex K.",
    content:
      'Absolutely love this bag! Perfect size and so durable!',
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
    id: 1,
    user: "Alex K.",
    content:
      'Absolutely love this bag! Perfect size and so durable!',
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
    id: 1,
    user: "Alex K.",
    content:
      'Absolutely love this bag! Perfect size and so durable!',
    rating: 5,
    date: "August 14, 2024",
  },
  {
    id: 2,
    user: "Sarah M.",
    content: `Great quality, and I feel good knowing its eco-friendly.`,
    rating: 5,
    date: "September 15, 2024",
  }
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
