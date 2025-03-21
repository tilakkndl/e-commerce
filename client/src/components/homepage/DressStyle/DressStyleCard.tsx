import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ArrowRight } from "lucide-react";

type DressStyleCardProps = {
  title: string;
  url: string;
  className?: string;
  imageUrl: string;
  description?: string;
};

const DressStyleCard = ({
  title,
  url,
  className,
  imageUrl,
  description = "Explore our collection",
}: DressStyleCardProps) => {
  return (
    <Link
      href={url}
      className={cn([
        "w-full md:h-full rounded-[30px] bg-white relative overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500",
        className,
      ])}
    >
      <div className="absolute inset-0 bg-black/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <Image
        src={imageUrl}
        alt={title}
        fill
        priority
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-end">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">
            {title}
          </h3>
          <p className="text-white/90 text-sm md:text-base font-medium mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {description}
          </p>
          <div className="flex items-center gap-2 text-white text-sm md:text-base font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
            <span>Shop Now</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DressStyleCard;
