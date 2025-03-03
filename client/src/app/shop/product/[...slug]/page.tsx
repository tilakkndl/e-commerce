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

export default function ProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.admin.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const productData = products.find(
    (product) => product._id === params.slug[0]
  );

  console.log("productdata:", productData);

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
