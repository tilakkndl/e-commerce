"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { integralCF } from "@/styles/fonts";

const OrderComplete = () => {
  const params = useParams();
  const orderId = (params.orderId as string) || "N/A";

  useEffect(() => {
    if (orderId === "N/A") {
      console.warn(
        "No order ID found in URL params. Displaying default message."
      );
    }
  }, [orderId]);

  return (
    <div className="max-w-[50vw] mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
      <h1
        className={`text-3xl font-bold mb-4 text-gray-900 ${integralCF.className}`}
      >
        Order Completed
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you! We’ve been notified for order <strong>{orderId}</strong>.
        Please allow 24-48 hours for payment verification and order processing.
      </p>
      <Button asChild className="bg-black/90 hover:bg-black/80 text-white">
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
};

export default OrderComplete;
