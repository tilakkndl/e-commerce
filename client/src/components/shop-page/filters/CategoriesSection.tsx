import { fetchCategories } from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type Category = {
  title: string;
  slug: string;
};

const categoriesData: Category[] = [
  {
    title: "T-shirts",
    slug: "/shop?category=t-shirt",
  },
  {
    title: "Shorts",
    slug: "/shop?category=shorts",
  },
  {
    title: "Shirts",
    slug: "/shop?category=shirts",
  },
  {
    title: "Hoodie",
    slug: "/shop?category=hoodie",
  },
  {
    title: "Jeans",
    slug: "/shop?category=jeans",
  },
];

const CategoriesSection = () => {
  const dispatch = useAppDispatch();
  const [showAll, setShowAll] = useState(false);
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoriesData = useAppSelector((state) => state.products.categories);

  // Show only first 4 categories if showAll is false
  const displayedCategories = showAll
    ? categoriesData
    : categoriesData?.slice(0, 4);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col space-y-0.5 text-black/60">
        {displayedCategories?.map((category, idx) => (
          <Link
            key={idx}
            href={`/shop?category=${category._id}`}
            className={cn(
              "flex items-center justify-between py-2 capitalize hover:text-black transition-colors",
              selectedCategory === category._id && "font-bold text-black"
            )}
          >
            {category.category} <MdKeyboardArrowRight />
          </Link>
        ))}
      </div>

      {categoriesData?.length > 4 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center justify-center gap-1 mt-2 text-sm text-black/60 hover:text-black transition-colors py-2"
        >
          {showAll ? (
            <>
              Show Less <IoIosArrowUp className="text-lg" />
            </>
          ) : (
            <>
              Show All Categories <IoIosArrowDown className="text-lg" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default CategoriesSection;
