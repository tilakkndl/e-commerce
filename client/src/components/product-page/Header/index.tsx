import React, { useEffect, useState } from "react";
import PhotoSection from "./PhotoSection";
import Product, { Variant } from "@/types/product.types";
import { integralCF } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import Rating from "@/components/ui/Rating";
import ColorSelection from "./ColorSelection";
import SizeSelection from "./SizeSelection";
import AddToCardSection from "./AddToCardSection";
import { Color } from "@/lib/features/products/productsSlice";

const Header = ({ data }: { data: Product }) => {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    data.variants[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    selectedVariant.size[0]
  );
  useEffect(() => {
    setSelectedSize(selectedVariant.size[0]);
  }, [selectedVariant]);
  const colorsData: Color[] = [];

  data.variants.map((variant) => {
    colorsData.push({
      name: `${variant.color}`,
      code: `bg-[${variant.hexColor}]`,
    });
  });
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <PhotoSection data={selectedVariant} />
        </div>
        <div>
          <h1
            className={cn([
              integralCF.className,
              "text-2xl md:text-[40px] md:leading-[40px] mb-3 md:mb-3.5 capitalize",
            ])}
          >
            {data.name}
          </h1>
          <div className="flex items-center mb-3 sm:mb-3.5">
            <Rating
              initialValue={data.avgRating}
              allowFraction
              SVGclassName="inline-block"
              emptyClassName="fill-gray-50"
              size={25}
              readonly
            />
            <span className="text-black text-xs sm:text-sm ml-[11px] sm:ml-[13px] pb-0.5 sm:pb-0">
              {data.avgRating.toFixed(1)}
              <span className="text-black/60">/5</span>
            </span>
          </div>
          <div className="flex items-center space-x-2.5 sm:space-x-3 mb-5">
            {data.discount > 0 ? (
              <span className="font-bold text-black text-2xl sm:text-[32px]">
                {`$${Math.round(
                  data.price - (data.price * data.discount) / 100
                )}`}
              </span>
            ) : data.discount > 0 ? (
              <span className="font-bold text-black text-2xl sm:text-[32px]">
                {`$${
                  data.price - (data.price - (data.price * data.discount) / 100)
                }`}
              </span>
            ) : (
              <span className="font-bold text-black text-2xl sm:text-[32px]">
                ${data.price}
              </span>
            )}
            {data.discount > 0 && (
              <span className="font-bold text-black/40 line-through text-2xl sm:text-[32px]">
                ${data.price}
              </span>
            )}

            {data.discount > 0 ? (
              <span className="font-medium text-[10px] sm:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                {`-${data.discount}%`}
              </span>
            ) : (
              data.discount > 0 && (
                <span className="font-medium text-[10px] sm:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                  {`-$${data.price - (data.price * data.discount) / 100}`}
                </span>
              )
            )}
          </div>
          <p className="text-sm sm:text-base text-black/60 mb-5">
            {data.description}
          </p>
          <hr className="h-[1px] border-t-black/10 mb-5" />
          <ColorSelection
            variants={data.variants}
            setSelectedVariant={setSelectedVariant}
            selectedVariant={selectedVariant}
          />
          <hr className="h-[1px] border-t-black/10 my-5" />
          <SizeSelection
            availableSizes={selectedVariant.size}
            setSelectedSize={setSelectedSize}
            selectedSize={selectedSize}
          />
          <hr className="hidden md:block h-[1px] border-t-black/10 my-5" />
          <AddToCardSection
            data={data}
            selectedVariant={selectedVariant}
            selectedSize={selectedSize}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
