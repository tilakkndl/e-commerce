"use client";
import { relatedProductData, topSellingData } from "@/app/page";
import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { fetchAllProducts } from "@/lib/features/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import Product from "@/types/product.types";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

const data: Product[] = [...topSellingData, ...relatedProductData];

export default function ProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.admin.products);
  const [newArrivalsData, setNewArrivalsData] = useState<Product[]>([]);
  useEffect(() => {
    dispatch(fetchAllProducts());
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
  const productData = data.find((product) => product._id === params.slug[0]);

  if (!productData?.name) {
    notFound();
  }

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData?.name ?? "product"} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
        <Tabs />
      </div>
      <div className="mb-[50px] sm:mb-20">
        <ProductListSec title="You might also like" data={relatedProductData} />
      </div>
    </main>
  );
}
