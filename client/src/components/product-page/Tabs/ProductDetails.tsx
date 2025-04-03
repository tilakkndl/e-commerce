import React from "react";

export type SpecItem = {
  label: string;
  value: string;
};

const specsData: SpecItem[] = [
  {
    label: " Material composition",
    value: "100% hemp",
  },
  {
    label: "Care instructions",
    value: "Handwash/Machine wash with cold water, Air dry, Avoid bleach or harsh detergents",
  },
  {
    label: "Fit type",
    value: "Casual Fit",
  },
  {
    label: "Pattern",
    value: "Standard",
  },
];

const ProductDetails = () => {
  return (
    <>
      {specsData.map((item, i) => (
        <div className="grid grid-cols-3" key={i}>
          <div>
            <p className="text-sm py-3 w-full leading-7 lg:py-4 pr-2 text-neutral-500">
              {item.label}
            </p>
          </div>
          <div className="col-span-2 py-3 lg:py-4 border-b">
            <p className="text-sm w-full leading-7 text-neutral-800 font-medium">
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductDetails;
