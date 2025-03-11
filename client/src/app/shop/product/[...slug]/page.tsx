"use client";

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
  const { products, loading, error } = useAppSelector((state) => state.admin);
  const [productData, setProductData] = useState<Product | null>(null);

  useEffect(() => {
    // Fetch products only if they haven't been fetched yet
    if (!products.length) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    const product = products.find((p) => p._id === params.slug[0]);
    if (products.length && !product) {
      notFound();
    }
    setProductData(product || null);
  }, [products, params.slug]);

  if (loading || !productData) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData.name ?? "Product"} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
        <Tabs productId={productData._id} />
      </div>
      <div className="mb-[50px] sm:mb-20">
        {/* <ProductListSec title="You might also like" data={relatedProductData} /> */}
      </div>
    </main>
  );
}
