"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { integralCF } from "@/styles/fonts";
import { useDispatch } from "react-redux";
import { removeAll } from "@/lib/features/carts/cartsSlice";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

// Import the OrderResponse type
import {
  OrderResponse,
  OrderItem,
  OrderData,
  OrderRequest,
} from "@/types/order.types";

export default function CheckoutPage() {
  // State for payment confirmation
  const [confirmed, setConfirmed] = useState(false);
  const [confirmedChecked, setConfirmedChecked] = useState(false);
  const token = Cookies.get("authToken") as string | undefined;

  const searchParams = useSearchParams();
  const orderId = searchParams.get("order") || undefined;
  const router = useRouter();

  const interacEmail = "sangampoudelb@gmail.com";

  const dispatch = useDispatch();

  useEffect(() => {
    if (!orderId) {
      console.warn("No order ID found in URL. Using default behavior.");
    }
  }, [orderId]);

  const handlePaymentConfirmation = async () => {
    if (!confirmedChecked) return;

    try {
      const response: AxiosResponse<OrderResponse> = await axios.patch(
        `${process.env.NEXT_PUBLIC_ROOT_API}/orders/status/${orderId}`,
        { status: "confirmed" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response;
      if (data.success) {
        setConfirmed(true);
        setConfirmedChecked(false);
        dispatch(removeAll());
        router.push(`checkout/orderComplete/${orderId}`);
      } else {
        throw new Error(data.message || "Payment confirmation failed.");
      }
    } catch (error) {
      console.error("Payment confirmation error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "An error occurred during payment confirmation. Please try again."
      );
    }

    console.log(`Payment confirmed for order ${orderId}`);
    alert("Thank you! Please allow 24-48 hours for payment verification.");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2
        className={`text-4xl font-bold mb-4 text-center ${integralCF.className}`}
      >
        Complete Your Order
      </h2>
      <p className="text-gray-600 mb-4 p-4">
        Please send your payment via Interac e-Transfer to complete your
        purchase for order {orderId || "N/A"}.
      </p>

      {/* Payment Instructions */}
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <h3 className="text-lg font-semibold mb-2">Payment Instructions:</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>
            Send the payment to: <strong>{interacEmail}</strong>
          </li>
          <li>Use your banking app to initiate an Interac e-Transfer.</li>
          <li>
            Include the order number <strong>{orderId || "N/A"}</strong> in the
            message field.
          </li>
          <li>
            Once sent, confirm below to notify us. We’ll verify your payment
            within 24-48 hours.
          </li>
        </ul>
      </div>

      {/* Confirmation Checkbox and Button */}
      {!confirmed && (
        <div className="flex items-center space-x-3 mb-4">
          <input
            type="checkbox"
            id="paymentConfirmed"
            onChange={(e) => setConfirmedChecked(e.target.checked)}
            className="h-4 w-4 text-black focus:ring-black"
          />
          <label htmlFor="paymentConfirmed" className="text-gray-700">
            I have sent the Interac e-Transfer payment.
          </label>
        </div>
      )}

      <Button
        onClick={handlePaymentConfirmation}
        disabled={!confirmedChecked}
        className={cn(
          "w-full bg-black text-white py-2 rounded-md hover:bg-gray-800",
          !confirmedChecked && "opacity-50 cursor-not-allowed"
        )}
      >
        Confirm Payment
      </Button>
    </div>
  );
}
