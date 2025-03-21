import React from "react";
import Rating from "../ui/Rating";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { Button } from "../ui/button";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Review } from "@/types/review.types";
import { cn } from "@/lib/utils";

type ReviewCardProps = {
  blurChild?: React.ReactNode;
  isAction?: boolean;
  isDate?: boolean;
  data: Review;
  className?: string;
};

const ReviewCard = ({
  blurChild,
  isAction = false,
  isDate = false,
  data,
  className,
}: ReviewCardProps) => {
  const formattedDate = new Date(data.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className={cn([
        "relative bg-white flex flex-col items-start aspect-auto border border-black/10 rounded-[20px] p-5 sm:p-6 overflow-hidden min-h-[180px]",
        className,
      ])}
    >
      {blurChild && blurChild}
      {/* Header Section with Name and Rating */}
      <div className="w-full mb-5">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1.5">
            <strong className="text-black text-base sm:text-lg">
              {data.user.name}
            </strong>
            <IoIosCheckmarkCircle className="text-[#01AB31] text-lg sm:text-xl" />
          </div>
          <div className="flex items-center gap-3">
            <Rating
              initialValue={data.rating}
              allowFraction
              SVGclassName="inline-block"
              size={20}
              readonly
            />
            {isAction && (
              <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                <IoEllipsisHorizontal className="text-black/40 text-xl" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Review Text */}
      <div className="flex-grow w-full mb-4">
        <p className="text-sm sm:text-base text-black/60 leading-relaxed">
          {data.review}
        </p>
      </div>

      {/* Date at Bottom Right */}
      {isDate && (
        <div className="w-full flex justify-end">
          <p className="text-black/40 text-xs font-medium">
            Posted on {formattedDate}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
