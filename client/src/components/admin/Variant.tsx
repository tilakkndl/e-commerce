import React, { useState } from "react";
import { Variant } from "@/types/product.types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type VariantCardProps = {
  variant: Variant;
};

const VariantCard: React.FC<VariantCardProps> = ({ variant }) => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>(variant.size);

  const handleSizeChange = (size: string) => {
    setSelectedSizes(
      (prevSizes) =>
        prevSizes.includes(size)
          ? prevSizes.filter((s) => s !== size) // Remove size if already selected
          : [...prevSizes, size] // Add size if not selected
    );
  };

  return (
    <div className="p-4  rounded-lg border-2 border-black w-fit">
      <div className="flex space-x-2 ">
        <Carousel className="w-40 max-w-xs h-40 ">
          <CarouselContent>
            {variant.gallery.map((image, index) => (
              <CarouselItem key={index}>
                <img
                  src={image}
                  alt={`Variant Image ${index + 1}`}
                  className="w-40 h-40 object-contain bg-blue-500"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {variant.gallery.length > 1 && (
            <>
              <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full w-fit h-fit p-2">
                <FaArrowLeft size={14} />
              </CarouselPrevious>
              <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full w-fit h-fit p-2">
                <FaArrowRight size={14} />
              </CarouselNext>
            </>
          )}
        </Carousel>
        <div className=" w-fit">
          <div className="text-lg font-bold flex items-center space-x-2 w-fit ">
            <div
              className="w-5 h-5 rounded-full "
              style={{ backgroundColor: variant.hexColor }}
            ></div>
            <div>{variant.color.toUpperCase()}</div>
          </div>

          <div className="flex items-center w-fit mt-2 space-x-2">
            <div className="h-fit font-semibold">Stock:</div>
            <input
              value={variant.stock}
              placeholder="Enter Available Stock"
              className=" border rounded-md px-2 overflow-hidden  w-20 h-15"
            />
          </div>
          <div className="w-auto bg-blue-700">
            <div className="font-semibold mr-3">Sizes:</div>

            <div className="flex items-center justify-start bg-red-500 space-x-3 w-[50%] max-h-[100px] flex-wrap">
              {["XS", "SM", "MD", "LG", "XL", "2XL", "3XL"].map((size) => (
                <div key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    id={size}
                    value={size}
                    checked={selectedSizes.includes(size.toLowerCase())} // Ensure case-insensitive check
                    onChange={() => handleSizeChange(size.toLowerCase())} // Update state on toggle with lowercase size
                    className="mr-2"
                  />
                  <label htmlFor={size}>{size}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center mt-2 bg-orange-600 w-fit">
            <div className="h-fit font-semibold mr-3 ">Selected Sizes:</div>
            <div>{selectedSizes.join(", ").toUpperCase()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariantCard;
