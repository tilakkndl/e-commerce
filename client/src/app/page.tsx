"use client";
import ProductListSec from "@/components/common/ProductListSec";

import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { fetchAllProducts } from "@/lib/features/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import Product from "@/types/product.types";
import { useEffect, useState } from "react";
import { setRelatedProductData } from "@/lib/features/products/productsSlice";

import About from "@/components/homepage/About/About";
import { reviewsData } from "@/data/reviews";

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
       
        <About />
        <div className="mb-[50px] sm:mb-20">
          <DressStyle />
        </div>
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}
